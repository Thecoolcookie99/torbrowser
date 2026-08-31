#!/usr/bin/env node
import { execSync } from 'child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

try {
  if (!existsSync('vendor/tor-js/dist/tor_js_bg.wasm')) {
    throw new Error('Missing vendor/tor-js/dist/tor_js_bg.wasm. Run npm install after restoring the vendored tor-js package.');
  }

  mkdirSync('public', { recursive: true });
  copyIfChanged('frontend/index.html', 'public/index.html');

  console.log('Checking TypeScript...');
  execSync('tsc --noEmit -p tsconfig.json', { stdio: 'inherit' });

  console.log('Build complete. Cloudflare Pages output is ./public');
} catch (err) {
  console.error('Build failed:', err instanceof Error ? err.message : String(err));
  process.exit(1);
}

function copyIfChanged(sourcePath, targetPath) {
  const source = readFileSync(sourcePath);
  const target = existsSync(targetPath) ? readFileSync(targetPath) : null;

  if (!target || !source.equals(target)) {
    writeFileSync(targetPath, source);
  }
}
