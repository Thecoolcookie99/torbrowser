# Cloudflare Pages Deployment

This project is configured for Cloudflare Pages with Pages Functions.

## Structure

- `frontend/` is the editable source for the static UI.
- `public/` is the Cloudflare Pages build output directory.
- `functions/` contains Pages Functions source files.
- `src/` contains shared TypeScript used by the Pages Function.
- `vendor/tor-js/` contains the prebuilt `tor-js` package and WASM used by the function bundle.

## Local Development

```bash
npm install
npm run build
npm run dev
```

`npm run build` copies `frontend/index.html` to `public/index.html` when it changes and runs TypeScript checks. Cloudflare Pages compiles `functions/**/*.ts` during `wrangler pages dev` and deployment.

## Cloudflare Pages Settings

For the Pages Git integration, use:

- Build command: `npm run build`
- Build output directory: `public`
- Root directory: `/`

The Wrangler config also defines the Pages output directory:

```jsonc
{
  "name": "tor-cloudflare-gateway",
  "pages_build_output_dir": "./public",
  "compatibility_date": "2026-08-31",
  "compatibility_flags": ["nodejs_compat"]
}
```

`pages_build_output_dir` is required for Cloudflare Pages to apply the Wrangler configuration to production and preview deployments. The Node.js compatibility setting is needed because `tor-js` imports Node built-ins while Wrangler bundles the Pages Function.

## Deploy

```bash
npm run deploy
```

The GitHub Actions workflow also installs dependencies, runs `npm run build`, and deploys `public` to the `tor-cloudflare-gateway` Pages project on pushes to `main`.

## Environment Variables

These defaults are set in `wrangler.jsonc` and `wrangler.toml`:

```json
{
  "FETCH_TIMEOUT_MS": "180000",
  "MAX_RESPONSE_BYTES": "10485760",
  "TOR_LOG_LEVEL": "warn"
}
```

Override them in the Cloudflare Pages dashboard only if the dashboard is your source of truth for project configuration.

## Routing

`public/_routes.json` sends requests through Pages Functions. The catch-all function at `functions/[[path]].ts` handles:

- `/api/resolve`
- `/view/*`
- `/` and `/index.html`
- static asset fallback through `env.ASSETS.fetch()`

## Troubleshooting

- If Cloudflare says the Wrangler config is invalid, confirm `pages_build_output_dir` is present.
- If bundling fails on Node built-ins such as `fs`, `stream`, `net`, or `crypto`, confirm the Pages deployment is reading `wrangler.jsonc` and applying the compatibility date/flags.
- If the UI looks stale, run `npm run build` so `frontend/index.html` is copied to `public/index.html`.
