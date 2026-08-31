import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveLoadUrl, rewriteOnionHtml } from './lib/route.js';

test('public URLs stay direct and are not forced through any gateway path', () => {
  assert.equal(resolveLoadUrl('https://example.com/path?x=1'), 'https://example.com/path?x=1');
  assert.equal(resolveLoadUrl('example.com/path?x=1'), 'https://example.com/path?x=1');
});

test('onion URLs stay direct in the textbox target and never become /http://... routes', () => {
  assert.equal(resolveLoadUrl('example.onion/path?x=1'), 'http://example.onion/path?x=1');
  assert.doesNotMatch(resolveLoadUrl('example.onion/path?x=1'), /^\/http:\/\//);
});

test('rewriteOnionHtml does not rewrite links or append any onion gateway path', () => {
  const result = rewriteOnionHtml('<a href="https://example.onion/login">Go</a><img src="http://example.onion/logo.png">');

  assert.match(result, /href="https:\/\/example\.onion\/login"/);
  assert.match(result, /src="http:\/\/example\.onion\/logo\.png"/);
  assert.doesNotMatch(result, /\/http:\/\/example\.onion/);
});

test('rewriteOnionHtml leaves the page content unchanged instead of injecting any routing logic', () => {
  const html = '<script src="https://static.cloudflareinsights.com/beacon.min.js"></script><a href="https://example.onion/login">Go</a>';
  const result = rewriteOnionHtml(html);

  assert.equal(result, html);
});
