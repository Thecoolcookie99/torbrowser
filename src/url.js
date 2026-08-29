const ONION_SUFFIX = '.onion';

function isIPv4(hostname) {
  return /^(?:\d{1,3}\.){3}\d{1,3}$/.test(hostname);
}

function ipv4ToInt(hostname) {
  return hostname
    .split('.')
    .map((part) => Number(part))
    .reduce((acc, part) => ((acc << 8) | (part & 255)) >>> 0, 0);
}

function isPrivateIPv4(hostname) {
  if (!isIPv4(hostname)) {
    return false;
  }

  const ip = ipv4ToInt(hostname);
  const ranges = [
    [ipv4ToInt('10.0.0.0'), ipv4ToInt('10.255.255.255')],
    [ipv4ToInt('127.0.0.0'), ipv4ToInt('127.255.255.255')],
    [ipv4ToInt('172.16.0.0'), ipv4ToInt('172.31.255.255')],
    [ipv4ToInt('192.168.0.0'), ipv4ToInt('192.168.255.255')],
    [ipv4ToInt('169.254.0.0'), ipv4ToInt('169.254.255.255')],
    [ipv4ToInt('100.64.0.0'), ipv4ToInt('100.127.255.255')],
  ];

  return ranges.some(([start, end]) => ip >= start && ip <= end);
}

function isLocalHostname(hostname) {
  return (
    hostname === 'localhost' ||
    hostname === 'localhost.localdomain' ||
    hostname === 'localtest.me' ||
    hostname.endsWith('.localhost')
  );
}

function hasScheme(input) {
  return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(input);
}

export function isOnionHost(hostname) {
  return hostname.toLowerCase().endsWith(ONION_SUFFIX);
}

export function isBlockedHostname(hostname) {
  if (!hostname) {
    return true;
  }

  const lowered = hostname.toLowerCase();
  if (isLocalHostname(lowered)) {
    return true;
  }

  if (isPrivateIPv4(lowered)) {
    return true;
  }

  return false;
}

export function coerceToAbsoluteUrl(input, baseUrl = '') {
  const raw = String(input ?? '').trim();
  if (!raw) {
    throw new Error('Enter a URL first.');
  }

  if (baseUrl) {
    return new URL(raw, baseUrl);
  }

  if (!hasScheme(raw) && raw.includes(ONION_SUFFIX)) {
    return new URL(`https://${raw}`);
  }

  if (!hasScheme(raw) && /^[^\s/]+\.[^\s/]+/.test(raw)) {
    return new URL(`https://${raw}`);
  }

  return new URL(raw);
}

export function validateNavigationUrl(input, baseUrl = '') {
  let url;
  try {
    url = coerceToAbsoluteUrl(input, baseUrl);
  } catch (error) {
    throw new Error('Enter a valid HTTP or HTTPS .onion URL.');
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('Only HTTP and HTTPS URLs are supported.');
  }

  if (!isOnionHost(url.hostname)) {
    throw new Error('Only .onion hostnames are allowed.');
  }

  if (isBlockedHostname(url.hostname)) {
    throw new Error('That hostname is blocked by the browser policy.');
  }

  if (url.username || url.password) {
    throw new Error('Credentials in URLs are not supported.');
  }

  return url;
}

export function safeResolveRelativeUrl(rawUrl, baseUrl) {
  if (!rawUrl) {
    throw new Error('Missing URL.');
  }

  const url = new URL(String(rawUrl), baseUrl);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('Blocked non-HTTP URL.');
  }

  if (!isOnionHost(url.hostname)) {
    throw new Error('Blocked non-onion URL.');
  }

  if (isBlockedHostname(url.hostname)) {
    throw new Error('Blocked local or private destination.');
  }

  return url;
}

export function normalizeDisplayUrl(url) {
  return new URL(url).toString();
}
