# Cloudflare Pages Migration Guide

This project has been converted from a Cloudflare Worker to a Cloudflare Pages deployment.

## Key Changes

### Directory Structure
- **`functions/`** - Server-side code using Pages Functions (replaces `src/worker.ts`)
  - `[[path]].ts` - Catch-all route handler for dynamic routing
- **`public/`** - Static assets served by Pages
  - `_routes.json` - Routing configuration

### Configuration Files
- **`wrangler.jsonc`** - Updated for Pages deployment (was Workers config)
- **`package.json`** - Updated scripts for Pages (`wrangler pages dev`, `wrangler pages deploy`)

## Development

### Local Development
```bash
npm install
npm run dev
```

The dev server will start at `http://localhost:8788` by default.

### Building
```bash
npm run build
npm run typecheck
```

### Testing
```bash
npm test
npm run mock:socks
```

## Deployment

### Prerequisites
- Wrangler CLI v3.101.0 or later
- Cloudflare account with Pages project

### Deploy to Cloudflare Pages

#### Option 1: Direct Deployment
```bash
wrangler pages deploy
```

#### Option 2: GitHub Integration (Recommended)
1. Push to GitHub
2. Connect your GitHub repository to Cloudflare Pages
3. Configure build settings:
   - **Build command**: `npm run build` (if needed)
   - **Build output directory**: `dist` (if you're building a static site)
   - **Root directory**: `/` (default)
4. Cloudflare will automatically deploy on every push

#### Option 3: Via Cloudflare Dashboard
1. Go to your Cloudflare Pages project
2. Click "Settings" → "Deployments"
3. Use the direct upload option

## Environment Variables

Set these in your Cloudflare Pages project settings or in `wrangler.jsonc`:

```json
"vars": {
  "FETCH_TIMEOUT_MS": "180000",
  "MAX_RESPONSE_BYTES": "10485760",
  "TOR_LOG_LEVEL": "warn"
}
```

## Routing

The `_routes.json` file controls which requests are handled by Functions vs. served as static assets:
- **Included** (`"include": ["/*"]`) - All routes go to Functions by default
- **Excluded** - Static assets are served directly from the public folder

Adjust the exclude patterns if you have additional static files.

## Pages Functions

The catch-all route `functions/[[path]].ts` handles all requests and:
1. Routes `/api/resolve` to the resolution handler
2. Routes `/view/*` to the viewer handler
3. Routes `/` and `/index.html` to the home page
4. Falls back to static asset serving

## Troubleshooting

### "ASSETS binding not found"
Ensure `public/_routes.json` exists and the assets directory is properly configured in `wrangler.jsonc`.

### Build Failures
Run `npm run typecheck` locally to catch TypeScript errors before deployment.

### Environment Variables Not Loading
1. Check Cloudflare Pages project settings
2. Verify `wrangler.jsonc` `vars` section
3. Use `wrangler pages dev` to test locally

## Migration from Workers

If you need to revert to Workers deployment:
- Use `git checkout HEAD -- src/worker.ts wrangler.jsonc package.json`
- Remove the `functions/` directory
- Update scripts: `wrangler dev` and `wrangler deploy`
