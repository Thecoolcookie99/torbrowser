import { connect } from 'cloudflare:sockets';
import { ArtiSocket, Log, TorClient, storage, type FetchInit } from 'tor-js/wasm-base64';
import { rewriteOnionHtml } from './route.js';

const DEFAULT_MAX_RESPONSE_BYTES = 10 * 1024 * 1024;
const DEFAULT_FETCH_TIMEOUT_MS = 120_000;

export type TorFetchEnv = {
  TOR_GATEWAY?: string;
  TOR_LOG_LEVEL?: 'trace' | 'debug' | 'info' | 'warn' | 'error';
  MAX_RESPONSE_BYTES?: string;
  FETCH_TIMEOUT_MS?: string;
};

export type TorFetchResult = {
  response: Response;
  targetUrl: string;
};

type ClientState = {
  key: string;
  client: TorClient;
};

let clientState: ClientState | null = null;

export async function fetchThroughTor(request: Request, targetUrl: URL, env: TorFetchEnv, viewerOrigin: string): Promise<TorFetchResult> {
  const client = getClient(env);
  const timeoutMs = readPositiveInteger(env.FETCH_TIMEOUT_MS, DEFAULT_FETCH_TIMEOUT_MS);
  const response = await client.fetch(targetUrl.toString(), await buildTorFetchInit(request, timeoutMs));
  const headers = buildResponseHeaders(response.headers);

  rewriteLocationHeader(headers, targetUrl.toString(), viewerOrigin);
  headers.set('x-onion-viewer-target', targetUrl.toString());

  if (request.method === 'HEAD') {
    return {
      response: new Response(null, {
        status: response.status,
        statusText: response.statusText,
        headers,
      }),
      targetUrl: targetUrl.toString(),
    };
  }

  if (isHtml(headers)) {
    const html = await readLimitedText(response, readPositiveInteger(env.MAX_RESPONSE_BYTES, DEFAULT_MAX_RESPONSE_BYTES));
    headers.set('content-type', ensureUtf8HtmlContentType(headers.get('content-type')));
    headers.delete('content-length');

    return {
      response: new Response(rewriteOnionHtml(html, targetUrl.toString(), viewerOrigin), {
        status: response.status,
        statusText: response.statusText,
        headers,
      }),
      targetUrl: targetUrl.toString(),
    };
  }

  headers.delete('content-length');
  return {
    response: new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    }),
    targetUrl: targetUrl.toString(),
  };
}

function getClient(env: TorFetchEnv): TorClient {
  const key = JSON.stringify({
    gateway: env.TOR_GATEWAY ?? '',
    logLevel: env.TOR_LOG_LEVEL ?? 'warn',
  });

  if (clientState?.key === key) {
    return clientState.client;
  }

  clientState?.client.close();
  const gateway = splitGateways(env.TOR_GATEWAY);
  const socketProvider = new CloudflareArtiSocketProvider();
  clientState = {
    key,
    client: new TorClient({
      gateway: gateway.length > 0 ? gateway : undefined,
      log: new Log(),
      logLevel: env.TOR_LOG_LEVEL ?? 'warn',
      socketProvider,
      storage: new storage.MemoryStorage(),
    }),
  };

  return clientState.client;
}

async function buildTorFetchInit(request: Request, timeoutMs: number): Promise<FetchInit> {
  const headers: Record<string, string> = {};
  for (const [name, value] of request.headers) {
    if (shouldForwardRequestHeader(name)) {
      headers[name] = value;
    }
  }

  headers['accept-encoding'] = 'identity';
  headers['user-agent'] = headers['user-agent'] ?? 'Cloudflare TOR-js Onion Viewer';

  const init: FetchInit = {
    method: request.method,
    headers,
    signal: AbortSignal.timeout(timeoutMs),
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = new Uint8Array(await request.arrayBuffer());
  }

  return init;
}

class CloudflareArtiSocketProvider {
  async connect(target: string): Promise<ArtiSocket> {
    const { hostname, port } = parseTargetAddress(target);
    const socket = connect({ hostname, port }, { allowHalfOpen: true });
    await socket.opened;

    return new ArtiSocket({
      readable: socket.readable as ReadableStream<Uint8Array>,
      writable: socket.writable as WritableStream<Uint8Array>,
      closed: socket.closed.then(
        () => ({ ok: true }),
        (error) => ({ ok: false, reason: error instanceof Error ? error.message : String(error) }),
      ),
      closeWrite: async () => {
        await socket.writable.getWriter().close();
      },
      close: () => {
        socket.close().catch(() => undefined);
      },
    });
  }

  close(): void {
    // TOR-js owns individual socket lifetimes. There is no shared Worker-side pool.
  }
}

async function readLimitedText(response: Response, maxBytes: number): Promise<string> {
  const body = response.body;
  if (!body) {
    return '';
  }

  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      if (value) {
        total += value.byteLength;
        if (total > maxBytes) {
          throw new Error(`Response body exceeds the ${maxBytes} byte limit.`);
        }
        chunks.push(value);
      }
    }
  } finally {
    reader.releaseLock();
  }

  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder().decode(merged);
}

function buildResponseHeaders(upstreamHeaders: Headers): Headers {
  const headers = new Headers();
  for (const [name, value] of upstreamHeaders) {
    if (shouldForwardResponseHeader(name)) {
      headers.set(name, value);
    }
  }

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

function readPositiveInteger(rawValue: string | undefined, fallback: number): number {
  const value = Number(rawValue);
  return Number.isInteger(value) && value > 0 ? value : fallback;
}

function splitGateways(rawValue: string | undefined): string[] {
  return rawValue
    ?.split(',')
    .map((value) => value.trim())
    .filter(Boolean) ?? [];
}

function parseTargetAddress(target: string): { hostname: string; port: number } {
  const lastColon = target.lastIndexOf(':');
  if (lastColon <= 0) {
    throw new Error(`Invalid Tor relay address: ${target}`);
  }

  const hostname = target.slice(0, lastColon);
  const port = Number(target.slice(lastColon + 1));
  if (!hostname || !Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid Tor relay address: ${target}`);
  }

  return { hostname, port };
}
