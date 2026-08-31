const ONION_HOST_RE = /^(?:[a-z0-9-]+\.)*onion$/i;
const SCHEME_RE = /^[a-z][a-z0-9+.-]*:/i;
const SKIP_URL_RE = /^(?:#|about:|blob:|data:|javascript:|mailto:|tel:)/i;
const URL_ATTRIBUTES = [
  'action',
  'background',
  'cite',
  'data',
  'formaction',
  'href',
  'longdesc',
  'manifest',
  'ping',
  'poster',
  'src',
] as const;

export function isOnionHostname(hostname: string): boolean {
  return ONION_HOST_RE.test(hostname.toLowerCase());
}

export function normalizeTargetUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    return '';
  }

  const candidate = SCHEME_RE.test(trimmed)
    ? trimmed
    : looksLikeOnionUrl(trimmed)
      ? `http://${trimmed}`
      : `https://${trimmed}`;

  const url = new URL(candidate);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('Only HTTP and HTTPS URLs are supported.');
  }

  if (url.username || url.password) {
    throw new Error('URLs with embedded credentials are not supported.');
  }

  return url.toString();
}

export function resolveLoadUrl(input: string, viewerOrigin = ''): string {
  const normalized = normalizeTargetUrl(input);
  if (!normalized) {
    return '';
  }

  const target = new URL(normalized);
  if (!isOnionHostname(target.hostname)) {
    return target.toString();
  }

  return makeViewerUrl(target.toString(), viewerOrigin);
}

export function makeViewerPath(targetUrl: string): string {
  const target = new URL(normalizeTargetUrl(targetUrl));
  const scheme = target.protocol.slice(0, -1);
  return `/view/${scheme}/${target.host}${target.pathname}${target.search}${target.hash}`;
}

export function makeViewerUrl(targetUrl: string, viewerOrigin = ''): string {
  const path = makeViewerPath(targetUrl);
  return viewerOrigin ? new URL(path, viewerOrigin).toString() : path;
}

export function parseViewerTarget(requestUrl: URL): URL | null {
  if (requestUrl.pathname === '/view' && requestUrl.searchParams.has('url')) {
    return new URL(normalizeTargetUrl(requestUrl.searchParams.get('url') ?? ''));
  }

  const mirroredTarget = parseMirroredViewerTarget(requestUrl);
  if (mirroredTarget) {
    return mirroredTarget;
  }

  if (requestUrl.pathname.startsWith('/view/')) {
    return new URL(normalizeTargetUrl(decodeTargetUrl(requestUrl.pathname.slice('/view/'.length))));
  }

  const legacyPath = decodeURIComponent(requestUrl.pathname.slice(1));
  if (/^https?:\/\//i.test(legacyPath)) {
    return new URL(normalizeTargetUrl(`${legacyPath}${requestUrl.search}`));
  }

  return null;
}

export function rewriteOnionHtml(html: string, baseTargetUrl: string, viewerOrigin = ''): string {
  let rewritten = html;
  const urlAttributePattern = new RegExp(`\\b(${URL_ATTRIBUTES.join('|')})\\s*=\\s*("([^"]*)"|'([^']*)')`, 'gi');

  rewritten = rewritten.replace(urlAttributePattern, (match, attribute: string, quotedValue: string, doubleValue?: string, singleValue?: string) => {
    const value = doubleValue ?? singleValue ?? '';
    const quote = quotedValue[0];
    const nextValue = rewriteMaybeOnionUrl(value, baseTargetUrl, viewerOrigin);
    return `${attribute}=${quote}${escapeAttribute(nextValue)}${quote}`;
  });

  rewritten = rewritten.replace(/\bsrcset\s*=\s*("([^"]*)"|'([^']*)')/gi, (match, quotedValue: string, doubleValue?: string, singleValue?: string) => {
    const value = doubleValue ?? singleValue ?? '';
    const quote = quotedValue[0];
    const nextValue = rewriteSrcset(value, baseTargetUrl, viewerOrigin);
    return `srcset=${quote}${escapeAttribute(nextValue)}${quote}`;
  });

  rewritten = rewritten.replace(/\bstyle\s*=\s*("([^"]*)"|'([^']*)')/gi, (match, quotedValue: string, doubleValue?: string, singleValue?: string) => {
    const value = doubleValue ?? singleValue ?? '';
    const quote = quotedValue[0];
    const nextValue = rewriteCssUrls(value, baseTargetUrl, viewerOrigin);
    return `style=${quote}${escapeAttribute(nextValue)}${quote}`;
  });

  rewritten = rewritten.replace(/(<style\b[^>]*>)([\s\S]*?)(<\/style>)/gi, (match, open: string, css: string, close: string) => {
    return `${open}${rewriteCssUrls(css, baseTargetUrl, viewerOrigin)}${close}`;
  });

  rewritten = rewritten.replace(/(<meta\b[^>]*http-equiv\s*=\s*["']?refresh["']?[^>]*content\s*=\s*["'])([^"']*)(["'][^>]*>)/gi, (match, open: string, content: string, close: string) => {
    const nextContent = content.replace(/;\s*url=(.+)$/i, (_part, urlPart: string) => {
      return `; url=${rewriteMaybeOnionUrl(urlPart.trim(), baseTargetUrl, viewerOrigin)}`;
    });
    return `${open}${escapeAttribute(nextContent)}${close}`;
  });

  return rewritten;
}

export function rewriteMaybeOnionUrl(rawValue: string, baseTargetUrl: string, viewerOrigin = ''): string {
  const value = rawValue.trim();
  if (!value || SKIP_URL_RE.test(value)) {
    return rawValue;
  }

  let resolved: URL;
  try {
    resolved = new URL(value, baseTargetUrl);
  } catch {
    return rawValue;
  }

  if ((resolved.protocol !== 'http:' && resolved.protocol !== 'https:') || !isOnionHostname(resolved.hostname)) {
    return rawValue;
  }

  return makeViewerUrl(resolved.toString(), viewerOrigin);
}

export function rewriteSrcset(value: string, baseTargetUrl: string, viewerOrigin = ''): string {
  return value
    .split(',')
    .map((candidate) => {
      const trimmed = candidate.trim();
      if (!trimmed) {
        return '';
      }

      const parts = trimmed.split(/\s+/);
      const url = parts.shift();
      if (!url) {
        return trimmed;
      }

      return [rewriteMaybeOnionUrl(url, baseTargetUrl, viewerOrigin), ...parts].join(' ');
    })
    .filter(Boolean)
    .join(', ');
}

export function rewriteCssUrls(css: string, baseTargetUrl: string, viewerOrigin = ''): string {
  return css.replace(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)"']*))\s*\)/gi, (match, doubleValue?: string, singleValue?: string, bareValue?: string) => {
    const value = doubleValue ?? singleValue ?? bareValue ?? '';
    const rewritten = rewriteMaybeOnionUrl(value, baseTargetUrl, viewerOrigin);
    return `url("${rewritten.replace(/"/g, '%22')}")`;
  });
}

function looksLikeOnionUrl(input: string): boolean {
  const firstSegment = input.split(/[/?#]/, 1)[0] ?? '';
  return isOnionHostname(firstSegment.split(':', 1)[0] ?? '');
}

function parseMirroredViewerTarget(requestUrl: URL): URL | null {
  const match = /^\/view\/(https?)\/([^/]+)(\/.*)?$/i.exec(requestUrl.pathname);
  if (!match) {
    return null;
  }

  const [, scheme, host, path = '/'] = match;
  return new URL(normalizeTargetUrl(`${scheme}://${host}${path}${requestUrl.search}`));
}

function encodeTargetUrl(targetUrl: string): string {
  const bytes = new TextEncoder().encode(targetUrl);
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function decodeTargetUrl(encoded: string): string {
  const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(encoded.length / 4) * 4, '=');
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new TextDecoder().decode(bytes);
}

function escapeAttribute(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}
