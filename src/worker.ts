export default {
  async fetch(request: Request, env: { ASSETS: Fetcher }): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/' || url.pathname === '/index.html' || url.pathname.startsWith('/http://') || url.pathname.startsWith('/https://') || url.pathname.startsWith('/onion/')) {
      return env.ASSETS.fetch(new Request(new URL('/index.html', request.url)));
    }

    return env.ASSETS.fetch(new Request(new URL('/index.html', request.url)));
  },
};
