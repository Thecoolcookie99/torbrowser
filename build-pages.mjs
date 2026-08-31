#!/usr/bin/env node
import { execSync } from 'child_process';
import { existsSync } from 'fs';

try {
  // Only build tor-js if it hasn't been built yet (check for dist directory)
  if (existsSync('tor-js/dist/tor_js_bg.wasm')) {
    console.log('✅ tor-js WASM already built, skipping...');
  } else {
    try {
      console.log('🔨 Building Tor JS WASM...');
      execSync('npm run build', { cwd: 'tor-js', stdio: 'inherit' });
    } catch (err) {
      console.log('⚠️  Tor JS build skipped (requires bash/Unix environment)');
    }
  }
  
  console.log('🔨 Compiling TypeScript...');
  execSync('tsc -p tsconfig.json --outDir dist', { stdio: 'inherit' });
  
  console.log('✅ Build complete! Output in ./dist');
} catch (err) {
  console.error('❌ Build failed:', err.message);
  process.exit(1);
}
