import { DurableObject } from 'cloudflare:workers';
import { parseGatewayPath, rewriteOnionHtml } from './lib/route.js';
import { TorConnectionManager } from './lib/tor.js';

const TOR_LOCAL_HOST = '127.0.0.1';
const TOR_SOCKS_PORT = 9050;

async function fetchThroughTor(onionHost: string, request: Request): Promise<Response> {
  const circuit = await TorConnectionManager.getInstance().connectToOnion(onionHost, 80);
  const targetUrl = new URL(`http://${onionHost}${new URL(request.url).pathname.replace(/^\/onion\/[^/]+/, '') || '/'}${new URL(request.url).search || ''}`);

  const headers = new Headers(request.headers);
  headers.delete('host');
  headers.set('host', onionHost);
  headers.set('x-forwarded-for', '127.0.0.1');
  headers.set('x-tor-circuit-id', circuit.circuitId);

  const upstream = await fetch(targetUrl, {
    method: request.method,
    headers,
    body: request.method === 'GET' || request.method === 'HEAD' ? undefined : request.body,
    redirect: 'manual',
  });

  const responseHeaders = new Headers(upstream.headers);
  responseHeaders.delete('transfer-encoding');
  responseHeaders.set('x-tor-onion-host', onionHost);
  responseHeaders.set('x-tor-gateway', 'cloudflare');
  responseHeaders.set('x-tor-circuit-id', circuit.circuitId);

  const contentType = responseHeaders.get('content-type') ?? '';
  if (contentType.includes('text/html')) {
    const html = await upstream.text();
    const rewritten = rewriteOnionHtml(html, `/onion/${onionHost}`);
    return new Response(rewritten, { status: upstream.status, headers: responseHeaders });
  }

  return new Response(upstream.body, { status: upstream.status, headers: responseHeaders });
}

export class TorGatewayDurableObject extends DurableObject {
  private tor = TorConnectionManager.getInstance();

  async fetch(request: Request): Promise<Response> {
    try {
      const url = new URL(request.url);
      if (url.pathname === '/health') {
        return new Response(JSON.stringify(this.tor.getState()), {
          headers: { 'content-type': 'application/json' },
        });
      }

      const { onionHost, path, search } = parseGatewayPath(url);
      const targetUrl = new URL(`http://${onionHost}${path}${search}`);
      const circuit = await this.tor.connectToOnion(onionHost, 80);

      const headers = new Headers(request.headers);
      headers.set('host', onionHost);
      headers.set('x-forwarded-for', '127.0.0.1');
      headers.set('x-tor-circuit-id', circuit.circuitId);

      const upstream = await fetch(targetUrl, {
        method: request.method,
        headers,
        body: request.method === 'GET' || request.method === 'HEAD' ? undefined : request.body,
        redirect: 'manual',
      });

      const responseHeaders = new Headers(upstream.headers);
      responseHeaders.set('x-tor-onion-host', onionHost);
      responseHeaders.set('x-tor-gateway', 'cloudflare');
      responseHeaders.set('x-tor-circuit-id', circuit.circuitId);

      const contentType = responseHeaders.get('content-type') ?? '';
      if (contentType.includes('text/html')) {
        const html = await upstream.text();
        const rewritten = rewriteOnionHtml(html, `/onion/${onionHost}`);
        return new Response(rewritten, { status: upstream.status, headers: responseHeaders });
      }

      return new Response(upstream.body, { status: upstream.status, headers: responseHeaders });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown gateway error';
      return new Response(JSON.stringify({ error: message }), {
        status: 502,
        headers: { 'content-type': 'application/json' },
      });
    }
  }
}

export default {
  async fetch(request: Request, env: { ASSETS: Fetcher; TOR_GATEWAY: DurableObjectNamespace }): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/onion/')) {
      const stub = env.TOR_GATEWAY.get(env.TOR_GATEWAY.idFromName('default'));
      return stub.fetch(request);
    }

    if (url.pathname === '/' || url.pathname === '/index.html') {
      return env.ASSETS.fetch(new Request(new URL('/index.html', request.url)));
    }

    return env.ASSETS.fetch(request);
  },
};
