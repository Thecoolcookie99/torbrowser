import { DurableObject } from 'cloudflare:workers';
import { parseGatewayPath, rewriteOnionHtml } from './lib/route.js';
import { TorConnectionManager } from './lib/tor.js';

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
      await this.tor.connectToOnion(onionHost, 80);

      const upstream = await fetch(targetUrl, {
        method: request.method,
        headers: request.headers,
        body: request.method === 'GET' || request.method === 'HEAD' ? undefined : request.body,
      });

      const responseHeaders = new Headers(upstream.headers);
      responseHeaders.set('x-tor-onion-host', onionHost);
      responseHeaders.set('x-tor-gateway', 'cloudflare');

      const contentType = responseHeaders.get('content-type') ?? '';
      const body = upstream.body;
      if (contentType.includes('text/html')) {
        const html = await upstream.text();
        const rewritten = rewriteOnionHtml(html, `/onion/${onionHost}`);
        return new Response(rewritten, { status: upstream.status, headers: responseHeaders });
      }

      return new Response(body, { status: upstream.status, headers: responseHeaders });
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
