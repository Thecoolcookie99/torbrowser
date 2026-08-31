export type ParsedGatewayPath = {
  onionHost: string;
  path: string;
  search: string;
  port: number;
};

export function parseGatewayPath(url: URL): ParsedGatewayPath {
  const pathname = url.pathname;
  const match = pathname.match(/^\/onion\/([^/]+)(\/.*)?$/i);
  if (!match) {
    throw new Error('Request is not on the onion gateway route');
  }

  const onionHost = match[1].toLowerCase();
  if (!/^[a-z2-7]{16,56}\.onion$/i.test(onionHost)) {
    throw new Error('Invalid .onion host');
  }

  const suffix = match[2] ?? '/';
  return {
    onionHost,
    path: suffix.startsWith('/') ? suffix : `/${suffix}`,
    search: url.search || '',
    port: 80,
  };
}

export function rewriteOnionHtml(html: string, gatewayPrefix: string): string {
  const base = gatewayPrefix.endsWith('/') ? gatewayPrefix.slice(0, -1) : gatewayPrefix;

  return html.replace(/(href|src)=(["'])(https?:\/\/[^"']+)(\2)/gi, (match, attr, quote, target) => {
    try {
      const url = new URL(target);
      if (!/\.onion(?:\.|$)/i.test(url.hostname)) {
        return match;
      }
      const rewritten = `${base}/${url.hostname}${url.pathname}${url.search}${url.hash}`;
      return `${attr}=${quote}${rewritten}${quote}`;
    } catch {
      return match;
    }
  });
}

export function gatewayUrlFor(onionHost: string, pathname: string, search = ''): string {
  return `/onion/${onionHost}${pathname}${search}`;
}
