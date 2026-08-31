import test from 'node:test';
import assert from 'node:assert/strict';
import {
  makeViewerPath,
  parseViewerTarget,
  resolveLoadUrl,
  rewriteOnionHtml,
  rewriteMaybeOnionUrl,
  rewriteSrcset,
} from './lib/route.js';

test('public URLs stay direct', () => {
  assert.equal(resolveLoadUrl('https://example.com/path?x=1'), 'https://example.com/path?x=1');
  assert.equal(resolveLoadUrl('example.com/path?x=1'), 'https://example.com/path?x=1');
});

test('onion URLs are encoded into same-origin viewer paths', () => {
  const result = resolveLoadUrl('example.onion/path?x=1');

  assert.match(result, /^\/view\//);
  assert.equal(parseViewerTarget(new URL(result, 'https://viewer.example'))?.toString(), 'http://example.onion/path?x=1');
});

test('viewer URL can include an absolute origin', () => {
  const result = resolveLoadUrl('http://example.onion/', 'https://viewer.example');

  assert.match(result, /^https:\/\/viewer\.example\/view\//);
  assert.equal(parseViewerTarget(new URL(result))?.toString(), 'http://example.onion/');
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

  assert.match(result, /href="https:\/\/viewer\.example\/view\//);
  assert.match(result, /src="https:\/\/viewer\.example\/view\//);
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

  assert.match(srcset, /^\/view\/.+ 1x, \/view\/.+ 2x$/);
  assert.match(html, /background:url\("\/view\//);
});

test('encoded viewer paths are stable and parseable', () => {
  const path = makeViewerPath('http://example.onion/a b/?q=c+d');

  assert.match(path, /^\/view\/[A-Za-z0-9_-]+$/);
  assert.equal(parseViewerTarget(new URL(path, 'https://viewer.example'))?.toString(), 'http://example.onion/a%20b/?q=c+d');
});
