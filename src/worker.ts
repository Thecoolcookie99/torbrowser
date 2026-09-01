import { fetchThroughTor, type TorFetchEnv } from './lib/tor.js';
import { isOnionHostname, normalizeTargetUrl, parseViewerShortcutTarget, parseViewerTarget, resolveLoadUrl } from './lib/route.js';

export type Env = TorFetchEnv & {
  ASSETS: Fetcher;
};

const INDEX_PATHS = new Set(['/', '/index.html']);
const VIEWER_METHODS = new Set(['GET', 'HEAD', 'POST']);

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/resolve') {
      return handleResolve(request, url);
    }

    const shortcutTargetUrl = parseViewerShortcutTarget(url);
    if (shortcutTargetUrl) {
      return serveIndex(request, env);
    }

    const targetUrl = parseViewerTarget(url);
    if (targetUrl) {
      return handleViewerRequest(request, targetUrl, env, url.origin);
    }

    if (INDEX_PATHS.has(url.pathname)) {
      return serveIndex(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleResolve(request: Request, url: URL): Promise<Response> {
  if (request.method !== 'GET') {
    return json({ error: 'Method not allowed.' }, 405);
  }

  try {
    const target = normalizeTargetUrl(url.searchParams.get('url') ?? '');
    if (!target) {
      return json({ error: 'Missing url parameter.' }, 400);
    }

    return json({ url: resolveLoadUrl(target, url.origin) });
  } catch (error) {
    return json({ error: getErrorMessage(error) }, 400);
  }
}

async function handleViewerRequest(request: Request, targetUrl: URL, env: Env, viewerOrigin: string): Promise<Response> {
  if (!VIEWER_METHODS.has(request.method)) {
    return json({ error: 'Method not allowed.' }, 405);
  }

  if (!isOnionHostname(targetUrl.hostname)) {
    return Response.redirect(targetUrl.toString(), 302);
  }

  try {
    const { response } = await fetchThroughTor(request, targetUrl, env, viewerOrigin);
    return response;
  } catch (error) {
    return renderGatewayError(targetUrl, getErrorMessage(error), getErrorStatus(error));
  }
}

function serveIndex(request: Request, env: Env): Promise<Response> {
  return env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request));
}

function renderGatewayError(targetUrl: URL, message: string, status = 502): Response {
  const safeTarget = escapeHtml(targetUrl.toString());
  const safeMessage = escapeHtml(message);
  return new Response(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Onion Viewer Error</title>
    <style>
      body { margin: 0; min-height: 100vh; font-family: Arial, Helvetica, sans-serif; background: #101820; color: #eef4f8; display: grid; place-items: center; padding: 24px; }
      main { width: min(760px, 100%); border: 1px solid rgba(255,255,255,.16); border-radius: 8px; padding: 24px; background: #17232d; }
      h1 { margin: 0 0 12px; font-size: 1.5rem; }
      p { margin: 0 0 14px; line-height: 1.5; color: #bed0dc; }
      code { overflow-wrap: anywhere; color: #c7f5df; }
      a { color: #8fd3ff; }
    </style>
  </head>
  <body>
    <main>
      <h1>Unable to load onion page</h1>
      <p><code>${safeTarget}</code></p>
      <p>${safeMessage}</p>
      <p>This Worker uses <code>tor-js</code> over Cloudflare outbound TCP sockets. Try again if the hidden service or Tor bootstrap is temporarily unavailable.</p>
      <p><a href="/">Return to viewer</a></p>
    </main>
  </body>
</html>`, {
    status,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function getErrorStatus(error: unknown): number {
  return error instanceof Error && error.name === 'GatewayTimeoutError' ? 504 : 502;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
