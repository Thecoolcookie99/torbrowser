export type ParsedGatewayPath = {
  onionHost: string;
  path: string;
  search: string;
  port: number;
};

export function parseGatewayPath(url: URL): ParsedGatewayPath {
  const pathname = decodeURIComponent(url.pathname);
  const direct = pathname.match(/^\/https?:\/\/([^/]+?\.onion)(\/.*)?$/i);
  const legacy = pathname.match(/^\/onion\/([^/]+?\.onion)(\/.*)?$/i);
  const match = direct ?? legacy;

  if (!match) {
    throw new Error('Request is not on the onion gateway route');
  }

  const onionHost = match[1].toLowerCase();
  if (!/^(?:[a-z2-7]{16,56}|[a-z0-9-]+(?:\.[a-z0-9-]+)*)\.onion$/i.test(onionHost)) {
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

  const sanitized = html.replace(/<script\b[^>]*\bsrc=(['"])(https?:)?\/\/[^'"\s>]+(?:cloudflareinsights|static\.cloudflareinsights|beacon\.min\.js)[^'"\s>]*\1[^>]*><\/script>/gi, '');

  return sanitized.replace(/(href|src)=(['"])((?:https?:)?\/\/[^'"]+)(\2)/gi, (match, attr, quote, target) => {
    try {
      const url = new URL(target);
      if (!/\.onion(?:\.|$)/i.test(url.hostname)) {
        return match;
      }
      const rewritten = `${base}${url.pathname}${url.search}${url.hash}`;
      return `${attr}=${quote}${rewritten}${quote}`;
    } catch {
      return match;
    }
  });
}

export function gatewayUrlFor(onionHost: string, pathname = '/', search = ''): string {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `/http://${onionHost}${normalized}${search}`;
}

export function resolveLoadUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    return '';
  }

  const candidate = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : /^((?:[a-z2-7]{16,56}|[a-z0-9-]+(?:\.[a-z0-9-]+)*)\.onion(?:\/.*)?)$/i.test(trimmed)
      ? `http://${trimmed}`
      : `https://${trimmed}`;

  const url = new URL(candidate);
  if (url.hostname.toLowerCase().endsWith('.onion')) {
    return gatewayUrlFor(url.hostname.toLowerCase(), url.pathname || '/', url.search || '');
  }

  return url.toString();
}
