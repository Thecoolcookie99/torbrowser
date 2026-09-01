import test from 'node:test';
import assert from 'node:assert/strict';
import {
  makeViewerPath,
  parseViewerTarget,
  resolveLoadUrl,
  resolveMaxResponseBytes,
  rewriteOnionHtml,
  rewriteMaybeOnionUrl,
  rewriteSrcset,
} from './lib/route.js';

test('public URLs stay direct', () => {
  assert.equal(resolveLoadUrl('https://example.com/path?x=1'), 'https://example.com/path?x=1');
  assert.equal(resolveLoadUrl('example.com/path?x=1'), 'https://example.com/path?x=1');
});

test('onion URLs are routed into same-origin mirrored viewer paths', () => {
  const result = resolveLoadUrl('example.onion/path?x=1');

  assert.equal(result, '/view/http/example.onion/path?x=1');
  assert.equal(parseViewerTarget(new URL(result, 'https://viewer.example'))?.toString(), 'http://example.onion/path?x=1');
});

test('viewer URL can include an absolute origin', () => {
  const result = resolveLoadUrl('http://example.onion/', 'https://viewer.example');

  assert.equal(result, 'https://viewer.example/view/http/example.onion/');
  assert.equal(parseViewerTarget(new URL(result))?.toString(), 'http://example.onion/');
});

test('mirrored viewer routes preserve target paths and queries', () => {
  const target = parseViewerTarget(new URL('https://viewer.example/view/http/example.onion/docs/logo.png?x=1'));

  assert.equal(target?.toString(), 'http://example.onion/docs/logo.png?x=1');
});

test('legacy /http:// routes are still parsed for compatibility', () => {
  const target = parseViewerTarget(new URL('https://viewer.example/http://example.onion/path?x=1'));

  assert.equal(target?.toString(), 'http://example.onion/path?x=1');
});

test('rewriteOnionHtml rewrites onion links and assets relative to the target page', () => {
  const result = rewriteOnionHtml(
    '<a href="/login">Go</a><img src="logo.png"><a href="https://public.example/">Public</a>',
    'http://example.onion/docs/page.html',
    'https://viewer.example',
  );

  assert.match(result, /href="https:\/\/viewer\.example\/view\/http\/example\.onion\/login"/);
  assert.match(result, /src="https:\/\/viewer\.example\/view\/http\/example\.onion\/docs\/logo\.png"/);
  assert.match(result, /href="https:\/\/public\.example\/"/);
  assert.doesNotMatch(result, /href="\/login"/);
  assert.doesNotMatch(result, /src="logo\.png"/);
});

test('rewrite helpers preserve non-fetching and public URLs', () => {
  assert.equal(rewriteMaybeOnionUrl('#top', 'http://example.onion/'), '#top');
  assert.equal(rewriteMaybeOnionUrl('mailto:test@example.com', 'http://example.onion/'), 'mailto:test@example.com');
  assert.equal(rewriteMaybeOnionUrl('https://example.com/', 'http://example.onion/'), 'https://example.com/');
});

test('srcset and css url values are rewritten through viewer paths', () => {
  const base = 'http://example.onion/assets/index.html';
  const srcset = rewriteSrcset('small.png 1x, /large.png 2x', base);
  const html = rewriteOnionHtml('<style>.hero{background:url("/hero.png")}</style>', base);

  assert.equal(srcset, '/view/http/example.onion/assets/small.png 1x, /view/http/example.onion/large.png 2x');
  assert.match(html, /background:url\("\/view\/http\/example\.onion\/hero\.png"\)/);
});

test('mirrored viewer paths are stable and parseable', () => {
  const path = makeViewerPath('http://example.onion/a b/?q=c+d');

  assert.equal(path, '/view/http/example.onion/a%20b/?q=c+d');
  assert.equal(parseViewerTarget(new URL(path, 'https://viewer.example'))?.toString(), 'http://example.onion/a%20b/?q=c+d');
});

test('legacy encoded viewer paths remain parseable', () => {
  const legacyPath = `/view/${Buffer.from('http://example.onion/legacy?x=1').toString('base64url')}`;

  assert.equal(parseViewerTarget(new URL(legacyPath, 'https://viewer.example'))?.toString(), 'http://example.onion/legacy?x=1');
});

test('response-size guard keeps HTML buffering safely below worker memory limits', () => {
  assert.equal(resolveMaxResponseBytes(undefined), 2 * 1024 * 1024);
  assert.equal(resolveMaxResponseBytes('5MB'), 2 * 1024 * 1024);
  assert.equal(resolveMaxResponseBytes('1048576'), 1048576);
});
