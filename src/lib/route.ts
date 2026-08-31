export function rewriteOnionHtml(html: string): string {
  return html;
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
  return url.toString();
}
