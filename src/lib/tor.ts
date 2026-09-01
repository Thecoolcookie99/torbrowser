import { connect } from 'cloudflare:sockets';
import torWasmModule from '../../node_modules/tor-js/dist/tor_js_bg.wasm';
import {
  ArtiSocket,
  Log,
  TorClient,
  setWasmUrl,
  storage,
  type ArtiSocketProvider,
  type FetchInit,
} from 'tor-js/wasm-cdn';
import { rewriteOnionHtml } from './route.js';

const DEFAULT_MAX_RESPONSE_BYTES = 2 * 1024 * 1024;
const DEFAULT_FETCH_TIMEOUT_MS = 90_000;
const MAX_FETCH_TIMEOUT_MS = 110_000;
const MAX_ALLOWED_RESPONSE_BYTES = 4 * 1024 * 1024;

setWasmUrl(torWasmModule as unknown as URL);

const sharedTorStorage = new storage.MemoryStorage();

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

export async function fetchThroughTor(request: Request, targetUrl: URL, env: TorFetchEnv, viewerOrigin: string): Promise<TorFetchResult> {
  const client = createClient(env);
  let closeClient = true;
  const timeoutMs = readBoundedPositiveInteger(env.FETCH_TIMEOUT_MS, DEFAULT_FETCH_TIMEOUT_MS, MAX_FETCH_TIMEOUT_MS);
  const timeoutSignal = AbortSignal.timeout(timeoutMs);
  try {
    return await withTimeout((async () => {
      const response = await client.fetch(targetUrl.toString(), await buildTorFetchInit(request, targetUrl, viewerOrigin, timeoutSignal));
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
        const maxBytes = resolveMaxResponseBytes(env.MAX_RESPONSE_BYTES);
        const html = await readLimitedText(response, maxBytes);
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
      if (!response.body) {
        return {
          response: new Response(null, {
            status: response.status,
            statusText: response.statusText,
            headers,
          }),
          targetUrl: targetUrl.toString(),
        };
      }

      closeClient = false;
      return {
        response: new Response(closeWhenStreamEnds(response.body, () => client.close()), {
          status: response.status,
          statusText: response.statusText,
          headers,
        }),
        targetUrl: targetUrl.toString(),
      };
    })(), timeoutMs, `Timed out after ${formatDuration(timeoutMs)} while loading ${targetUrl.hostname} through Tor.`);
  } finally {
    if (closeClient) {
      client.close();
    }
  }
}

function createClient(env: TorFetchEnv): TorClient {
  const gateway = splitGateways(env.TOR_GATEWAY);
  const socketProvider = new CloudflareArtiSocketProvider();
  return new TorClient({
    gateway: gateway.length > 0 ? gateway : undefined,
    log: new Log(),
    logLevel: env.TOR_LOG_LEVEL ?? 'warn',
    socketProvider: socketProvider as unknown as ArtiSocketProvider,
    storage: sharedTorStorage,
  });
}

async function buildTorFetchInit(request: Request, targetUrl: URL, viewerOrigin: string, signal: AbortSignal): Promise<FetchInit> {
  const headers: Record<string, string> = {};
  for (const [name, value] of request.headers) {
    if (shouldForwardRequestHeader(name)) {
      headers[name] = value;
    }
  }

  headers['accept-encoding'] = 'identity';
  rewriteOriginHeader(headers, targetUrl);
  rewriteRefererHeader(headers, targetUrl, viewerOrigin);
  headers['user-agent'] = headers['user-agent'] ?? 'Cloudflare TOR-js Onion Viewer';

  const init: FetchInit = {
    method: request.method,
    headers,
    signal,
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = new Uint8Array(await request.arrayBuffer());
  }

  return init;
}

class CloudflareArtiSocketProvider {
  get gateway(): null {
    return null;
  }

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

  async gatewayFetch(): Promise<never> {
    throw new Error('KPS gateway bootstrap is not available when Cloudflare direct TCP sockets are used.');
  }

  close(): void {
    // Per-request TOR-js clients own their socket lifetimes.
  }
}

function closeWhenStreamEnds(body: ReadableStream<Uint8Array>, onClose: () => void): ReadableStream<Uint8Array> {
  const reader = body.getReader();
  let closed = false;

  const closeOnce = () => {
    if (!closed) {
      closed = true;
      reader.releaseLock();
      onClose();
    }
  };

  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        const { done, value } = await reader.read();
        if (done) {
          closeOnce();
          controller.close();
          return;
        }

        if (value) {
          controller.enqueue(value);
        }
      } catch (error) {
        closeOnce();
        controller.error(error);
      }
    },
    async cancel(reason) {
      try {
        await reader.cancel(reason);
      } finally {
        closeOnce();
      }
    },
  });
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
          await reader.cancel(`Response body exceeds the ${maxBytes} byte limit.`);
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
    'sec-fetch-dest',
    'sec-fetch-mode',
    'sec-fetch-site',
    'sec-fetch-user',
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

function rewriteOriginHeader(headers: Record<string, string>, targetUrl: URL): void {
  if (headers.origin) {
    headers.origin = targetUrl.origin;
  }
}

function rewriteRefererHeader(headers: Record<string, string>, targetUrl: URL, viewerOrigin: string): void {
  const referer = headers.referer;
  if (!referer) {
    return;
  }

  try {
    const refererUrl = new URL(referer);
    if (refererUrl.origin === viewerOrigin) {
      headers.referer = targetUrl.toString();
    }
  } catch {
    delete headers.referer;
  }
}

export function resolveMaxResponseBytes(rawValue: string | undefined): number {
  const configured = readPositiveInteger(rawValue, DEFAULT_MAX_RESPONSE_BYTES);
  return Math.min(configured, MAX_ALLOWED_RESPONSE_BYTES);
}

function readPositiveInteger(rawValue: string | undefined, fallback: number): number {
  const value = Number(rawValue);
  return Number.isInteger(value) && value > 0 ? value : fallback;
}

function readBoundedPositiveInteger(rawValue: string | undefined, fallback: number, max: number): number {
  return Math.min(readPositiveInteger(rawValue, fallback), max);
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      const error = new Error(message);
      error.name = 'GatewayTimeoutError';
      reject(error);
    }, timeoutMs);
  });

  return Promise.race([promise, timeout]).finally(() => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
  });
}

function formatDuration(milliseconds: number): string {
  return `${Math.round(milliseconds / 1000)} seconds`;
}

function splitGateways(rawValue: string | undefined): string[] {
  return rawValue
    ?.split(',')
    .map((value) => value.trim())
    .filter(Boolean) ?? [];
}

function parseTargetAddress(target: string): { hostname: string; port: number } {
  if (target.startsWith('[')) {
    const endBracket = target.indexOf(']');
    if (endBracket <= 1 || target[endBracket + 1] !== ':') {
      throw new Error(`Invalid Tor relay address: ${target}`);
    }

    const hostname = target.slice(1, endBracket);
    const port = Number(target.slice(endBracket + 2));
    if (!hostname || !Number.isInteger(port) || port < 1 || port > 65535) {
      throw new Error(`Invalid Tor relay address: ${target}`);
    }

    return { hostname, port };
  }

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
