import { connect } from 'cloudflare:sockets';
import {
  buildSocks5ConnectRequest,
  buildSocks5Greeting,
  buildSocks5UsernamePasswordAuthRequest,
  parseSocks5GreetingReply,
  parseSocks5Reply,
  parseSocks5UsernamePasswordAuthReply,
  socks5StatusMessage,
} from './socks5.js';
import { rewriteOnionHtml } from './route.js';

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const DEFAULT_MAX_RESPONSE_BYTES = 10 * 1024 * 1024;
type Bytes = Uint8Array<ArrayBuffer>;

export type TorFetchEnv = {
  TOR_SOCKS_HOST?: string;
  TOR_SOCKS_PORT?: string;
  TOR_SOCKS_USERNAME?: string;
  TOR_SOCKS_PASSWORD?: string;
  MAX_RESPONSE_BYTES?: string;
};

export type TorFetchResult = {
  response: Response;
  targetUrl: string;
};

type SocketLike = {
  readable: ReadableStream<Uint8Array>;
  writable: WritableStream<Uint8Array>;
  close(): Promise<void>;
  startTls?(options?: { expectedServerHostname?: string }): SocketLike;
};

type HttpHead = {
  status: number;
  statusText: string;
  headers: Headers;
  rest: Uint8Array;
};

class BufferedReader {
  private buffered: Bytes = new Uint8Array(0);

  constructor(private readonly reader: ReadableStreamDefaultReader<Uint8Array>) {}

  async readExactly(length: number): Promise<Bytes> {
    while (this.buffered.length < length) {
      const { done, value } = await this.reader.read();
      if (done || !value) {
        throw new Error('Socket closed before enough bytes were received.');
      }
      this.buffered = concat(this.buffered, value);
    }

    const result = copyBytes(this.buffered.slice(0, length));
    this.buffered = copyBytes(this.buffered.slice(length));
    return result;
  }

  async read(): Promise<ReadableStreamReadResult<Uint8Array>> {
    if (this.buffered.length > 0) {
      const value = this.buffered;
      this.buffered = new Uint8Array(0);
      return { done: false, value };
    }

    return this.reader.read();
  }
}

export async function fetchThroughTor(request: Request, targetUrl: URL, env: TorFetchEnv, viewerOrigin: string): Promise<TorFetchResult> {
  const socksHost = env.TOR_SOCKS_HOST;
  const socksPort = Number(env.TOR_SOCKS_PORT ?? 9050);
  if (!socksHost || !Number.isInteger(socksPort) || socksPort < 1 || socksPort > 65535) {
    throw new Error('TOR_SOCKS_HOST and TOR_SOCKS_PORT must point to a reachable SOCKS5 Tor proxy.');
  }

  const targetPort = Number(targetUrl.port || (targetUrl.protocol === 'https:' ? 443 : 80));
  let socket = connect({ hostname: socksHost, port: socksPort }, { allowHalfOpen: false }) as SocketLike;
  let reader = socket.readable.getReader();
  let bufferedReader = new BufferedReader(reader);
  let writer = socket.writable.getWriter();

  try {
    const useAuth = Boolean(env.TOR_SOCKS_USERNAME || env.TOR_SOCKS_PASSWORD);
    await writer.write(buildSocks5Greeting(useAuth));
    const greeting = parseSocks5GreetingReply(await bufferedReader.readExactly(2));

    if (greeting.method === 0x02) {
      await writer.write(buildSocks5UsernamePasswordAuthRequest(env.TOR_SOCKS_USERNAME ?? '', env.TOR_SOCKS_PASSWORD ?? ''));
      parseSocks5UsernamePasswordAuthReply(await bufferedReader.readExactly(2));
    }

    await writer.write(buildSocks5ConnectRequest(targetUrl.hostname, targetPort));
    const reply = parseSocks5Reply(await readSocks5ConnectReply(bufferedReader));
    if (reply.status !== 0x00) {
      throw new Error(`SOCKS5 connection failed: ${socks5StatusMessage(reply.status)}.`);
    }

    writer.releaseLock();
    reader.releaseLock();

    if (targetUrl.protocol === 'https:') {
      if (!socket.startTls) {
        throw new Error('This runtime does not support TLS over sockets.');
      }
      socket = socket.startTls({ expectedServerHostname: targetUrl.hostname });
    }

    reader = socket.readable.getReader();
    bufferedReader = new BufferedReader(reader);
    writer = socket.writable.getWriter();

    await writer.write(await buildHttpRequestBytes(request, targetUrl));
    writer.releaseLock();

    const head = await readHttpHead(bufferedReader);
    const maxBytes = readMaxResponseBytes(env);
    const bodyBytes = await readHttpBody(bufferedReader, head.headers, head.rest, maxBytes);
    const headers = buildResponseHeaders(head.headers);

    let body: BodyInit = toArrayBuffer(bodyBytes);
    if (isHtml(headers)) {
      body = rewriteOnionHtml(decoder.decode(bodyBytes), targetUrl.toString(), viewerOrigin);
      headers.set('content-type', ensureUtf8HtmlContentType(headers.get('content-type')));
      headers.delete('content-length');
    }

    rewriteLocationHeader(headers, targetUrl.toString(), viewerOrigin);
    headers.set('x-onion-viewer-target', targetUrl.toString());

    return {
      response: new Response(body, {
        status: head.status,
        statusText: head.statusText,
        headers,
      }),
      targetUrl: targetUrl.toString(),
    };
  } finally {
    try {
      reader.releaseLock();
    } catch {
      // The lock may already be released after EOF.
    }

    try {
      writer.releaseLock();
    } catch {
      // The writer may already be closed.
    }

    await socket.close().catch(() => undefined);
  }
}

async function buildHttpRequestBytes(request: Request, targetUrl: URL): Promise<Uint8Array> {
  const body = await request.arrayBuffer();
  const headers = new Headers(request.headers);
  const outputHeaders = new Headers();

  for (const [name, value] of headers) {
    if (shouldForwardRequestHeader(name)) {
      outputHeaders.set(name, value);
    }
  }

  outputHeaders.set('host', targetUrl.host);
  outputHeaders.set('connection', 'close');
  outputHeaders.set('accept-encoding', 'identity');
  outputHeaders.set('user-agent', outputHeaders.get('user-agent') ?? 'Cloudflare Onion Viewer');

  if (body.byteLength > 0) {
    outputHeaders.set('content-length', String(body.byteLength));
  } else {
    outputHeaders.delete('content-length');
  }

  const path = `${targetUrl.pathname || '/'}${targetUrl.search}`;
  const headerLines = [`${request.method} ${path} HTTP/1.1`];
  for (const [name, value] of outputHeaders) {
    headerLines.push(`${name}: ${value}`);
  }

  const head = encoder.encode(`${headerLines.join('\r\n')}\r\n\r\n`);
  const bytes = new Uint8Array(head.byteLength + body.byteLength);
  bytes.set(head);
  bytes.set(new Uint8Array(body), head.byteLength);
  return bytes;
}

async function readSocks5ConnectReply(reader: BufferedReader): Promise<Uint8Array> {
  const head = await reader.readExactly(5);
  const addrType = head[3];
  const extraLength = addrType === 0x01 ? 3 + 2 : addrType === 0x03 ? head[4] + 2 : addrType === 0x04 ? 15 + 2 : 2;
  const rest = await reader.readExactly(extraLength);
  return concat(head, rest);
}

async function readHttpHead(reader: BufferedReader): Promise<HttpHead> {
  let bytes = new Uint8Array(0);
  while (true) {
    const splitAt = indexOfHeaderEnd(bytes);
    if (splitAt !== -1) {
      const rawHead = decoder.decode(bytes.slice(0, splitAt));
      const rest = bytes.slice(splitAt + 4);
      const lines = rawHead.split('\r\n');
      const statusLine = lines.shift() ?? '';
      const match = /^HTTP\/\d(?:\.\d)?\s+(\d{3})(?:\s+(.*))?$/.exec(statusLine);
      if (!match) {
        throw new Error(`Invalid HTTP response status line: ${statusLine}`);
      }

      const headers = new Headers();
      for (const line of lines) {
        const separator = line.indexOf(':');
        if (separator > 0) {
          headers.append(line.slice(0, separator).trim(), line.slice(separator + 1).trim());
        }
      }

      return {
        status: Number(match[1]),
        statusText: match[2] ?? '',
        headers,
        rest,
      };
    }

    const { done, value } = await reader.read();
    if (done || !value) {
      throw new Error('Socket closed before HTTP headers were received.');
    }
    bytes = concat(bytes, value);
    if (bytes.length > 128 * 1024) {
      throw new Error('HTTP response headers are too large.');
    }
  }
}

async function readHttpBody(
  reader: BufferedReader,
  headers: Headers,
  initial: Uint8Array,
  maxBytes: number,
): Promise<Uint8Array> {
  const transferEncoding = headers.get('transfer-encoding')?.toLowerCase() ?? '';
  if (transferEncoding.includes('chunked')) {
    return decodeChunkedBody(await readToEnd(reader, initial, maxBytes));
  }

  const contentLength = headers.get('content-length');
  if (contentLength) {
    const expected = Number(contentLength);
    if (!Number.isInteger(expected) || expected < 0) {
      throw new Error('Invalid response Content-Length.');
    }
    if (expected > maxBytes) {
      throw new Error(`Response body exceeds the ${maxBytes} byte limit.`);
    }
    let bytes = initial;
    while (bytes.length < expected) {
      const { done, value } = await reader.read();
      if (done || !value) {
        throw new Error('Socket closed before response body completed.');
      }
      bytes = concat(bytes, value);
    }
    return bytes.slice(0, expected);
  }

  return readToEnd(reader, initial, maxBytes);
}

async function readToEnd(reader: BufferedReader, initial: Uint8Array, maxBytes: number): Promise<Uint8Array> {
  let bytes = initial;
  while (true) {
    if (bytes.length > maxBytes) {
      throw new Error(`Response body exceeds the ${maxBytes} byte limit.`);
    }

    const { done, value } = await reader.read();
    if (done) {
      return bytes;
    }
    if (value) {
      bytes = concat(bytes, value);
    }
  }
}

function decodeChunkedBody(bytes: Uint8Array): Uint8Array {
  let offset = 0;
  let decoded = new Uint8Array(0);

  while (offset < bytes.length) {
    const lineEnd = indexOfCrlf(bytes, offset);
    if (lineEnd === -1) {
      throw new Error('Invalid chunked response: missing chunk size.');
    }

    const sizeLine = decoder.decode(bytes.slice(offset, lineEnd)).split(';', 1)[0].trim();
    const chunkSize = Number.parseInt(sizeLine, 16);
    if (!Number.isFinite(chunkSize)) {
      throw new Error('Invalid chunked response: bad chunk size.');
    }

    offset = lineEnd + 2;
    if (chunkSize === 0) {
      return decoded;
    }

    if (offset + chunkSize + 2 > bytes.length) {
      throw new Error('Invalid chunked response: truncated chunk.');
    }

    decoded = concat(decoded, bytes.slice(offset, offset + chunkSize));
    offset += chunkSize + 2;
  }

  throw new Error('Invalid chunked response: missing terminating chunk.');
}

function buildResponseHeaders(upstreamHeaders: Headers): Headers {
  const headers = new Headers();
  for (const [name, value] of upstreamHeaders) {
    if (shouldForwardResponseHeader(name)) {
      headers.set(name, value);
    }
  }

  headers.delete('transfer-encoding');
  headers.delete('content-encoding');
  headers.delete('content-length');
  headers.set('cache-control', 'no-store');
  headers.set('content-security-policy', "default-src 'self' 'unsafe-inline' data: blob:; img-src 'self' data: blob:; media-src 'self' data: blob:; form-action 'self'; frame-ancestors 'none'");
  headers.set('referrer-policy', 'no-referrer');
  headers.set('x-content-type-options', 'nosniff');
  return headers;
}

function shouldForwardRequestHeader(name: string): boolean {
  return ![
    'accept-encoding',
    'cf-connecting-ip',
    'cf-ipcountry',
    'cf-ray',
    'cf-visitor',
    'connection',
    'content-length',
    'host',
    'upgrade',
    'x-forwarded-for',
    'x-forwarded-proto',
  ].includes(name.toLowerCase());
}

function shouldForwardResponseHeader(name: string): boolean {
  return ![
    'connection',
    'content-encoding',
    'content-length',
    'keep-alive',
    'proxy-authenticate',
    'proxy-authorization',
    'te',
    'trailer',
    'transfer-encoding',
    'upgrade',
  ].includes(name.toLowerCase());
}

function rewriteLocationHeader(headers: Headers, baseTargetUrl: string, viewerOrigin: string): void {
  const location = headers.get('location');
  if (!location) {
    return;
  }

  const html = `<a href="${location.replace(/"/g, '&quot;')}"></a>`;
  const match = /href="([^"]+)"/.exec(rewriteOnionHtml(html, baseTargetUrl, viewerOrigin));
  if (match) {
    headers.set('location', match[1].replace(/&amp;/g, '&'));
  }
}

function isHtml(headers: Headers): boolean {
  return (headers.get('content-type') ?? '').toLowerCase().includes('text/html');
}

function ensureUtf8HtmlContentType(contentType: string | null): string {
  if (!contentType) {
    return 'text/html; charset=utf-8';
  }

  return /charset=/i.test(contentType) ? contentType : `${contentType}; charset=utf-8`;
}

function readMaxResponseBytes(env: TorFetchEnv): number {
  const configured = Number(env.MAX_RESPONSE_BYTES);
  return Number.isInteger(configured) && configured > 0 ? configured : DEFAULT_MAX_RESPONSE_BYTES;
}

function concat(left: Uint8Array<ArrayBufferLike>, right: Uint8Array<ArrayBufferLike>): Bytes {
  const bytes = new Uint8Array(left.length + right.length);
  bytes.set(left);
  bytes.set(right, left.length);
  return bytes;
}

function copyBytes(value: Uint8Array<ArrayBufferLike>): Bytes {
  const bytes = new Uint8Array(value.length);
  bytes.set(value);
  return bytes;
}

function toArrayBuffer(value: Uint8Array<ArrayBufferLike>): ArrayBuffer {
  const bytes = copyBytes(value);
  return bytes.buffer;
}

function indexOfHeaderEnd(bytes: Uint8Array): number {
  for (let index = 0; index <= bytes.length - 4; index += 1) {
    if (bytes[index] === 13 && bytes[index + 1] === 10 && bytes[index + 2] === 13 && bytes[index + 3] === 10) {
      return index;
    }
  }

  return -1;
}

function indexOfCrlf(bytes: Uint8Array, start: number): number {
  for (let index = start; index <= bytes.length - 2; index += 1) {
    if (bytes[index] === 13 && bytes[index + 1] === 10) {
      return index;
    }
  }

  return -1;
}
