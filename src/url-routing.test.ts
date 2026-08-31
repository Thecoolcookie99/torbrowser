import test from 'node:test';
import assert from 'node:assert/strict';
import { parseGatewayPath, resolveLoadUrl, rewriteOnionHtml } from './lib/route.js';
import { buildSocks5ConnectRequest } from './lib/socks5.js';

test('parseGatewayPath accepts direct retube.xyz/http://example.onion routes', () => {
  const result = parseGatewayPath(new URL('https://retube.xyz/http://example.onion/path?x=1'));
  assert.deepEqual(result, {
    onionHost: 'example.onion',
    path: '/path',
    search: '?x=1',
    port: 80,
  });
});

test('parseGatewayPath accepts https onion routes as supported by the gateway', () => {
  const result = parseGatewayPath(new URL('https://retube.xyz/https://example.onion/path?x=1'));
  assert.deepEqual(result, {
    onionHost: 'example.onion',
    path: '/path',
    search: '?x=1',
    port: 80,
  });
});

test('buildSocks5ConnectRequest uses the onion host without DNS', () => {
  const request = buildSocks5ConnectRequest('example.onion', 80);
  assert.equal(request[0], 0x05);
  assert.equal(request[1], 0x01);
  assert.equal(request[2], 0x00);
  assert.equal(request[3], 0x03);
  assert.equal(request[4], 0x0d);
  assert.equal(request[5], 0x65);
  assert.equal(request[6], 0x78);
  assert.equal(request[7], 0x61);
  assert.equal(request[8], 0x6d);
  assert.equal(request[9], 0x70);
  assert.equal(request[10], 0x6c);
  assert.equal(request[11], 0x65);
  assert.equal(request[12], 0x2e);
  assert.equal(request[13], 0x6f);
  assert.equal(request[14], 0x6e);
  assert.equal(request[15], 0x69);
  assert.equal(request[16], 0x6f);
  assert.equal(request[17], 0x6e);
  assert.equal(request[18], 0x00);
  assert.equal(request[19], 0x50);
});

test('public URLs load directly instead of being forced through the onion gateway', () => {
  assert.equal(resolveLoadUrl('https://example.com/path?x=1'), 'https://example.com/path?x=1');
  assert.equal(resolveLoadUrl('example.com/path?x=1'), 'https://example.com/path?x=1');
});

test('onion URLs use the gateway path while normal pages remain direct', () => {
  assert.equal(resolveLoadUrl('example.onion/path?x=1'), '/http://example.onion/path?x=1');
});

test('rewriteOnionHtml rewrites onion links through the gateway', () => {
  const result = rewriteOnionHtml(
    '<a href="https://example.onion/login">Go</a><img src="http://example.onion/logo.png">',
    '/http://example.onion',
  );

  assert.match(result, /href="\/http:\/\/example\.onion\/login"/);
  assert.match(result, /src="\/http:\/\/example\.onion\/logo\.png"/);
});
