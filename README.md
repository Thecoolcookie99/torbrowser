# Onion Browser

A static Cloudflare Pages app that uses `tor-js` in the visitor's browser to fetch and render `.onion` sites through a Tor gateway.

## What it does

- Accepts `http://` and `https://` `.onion` URLs.
- Boots a reusable `TorClient` once and reuses it for later requests.
- Fetches pages through `client.fetch(url)`.
- Shows Tor bootstrap logs and a Tor connectivity test against `https://check.torproject.org/api/ip`.
- Rewrites common onion page resources through the Tor client instead of letting the browser load them directly.
- Keeps navigation inside the app with back, forward, reload, and an address bar.

## What this is not

- It is not Tor Browser.
- It does not claim the same privacy or anti-fingerprinting guarantees as the official Tor Browser.
- It is not a generic proxy for arbitrary internet hosts.

## Project structure

```text
onion-browser/
├── package.json
├── vite.config.js
├── index.html
├── src/
│   ├── main.js
│   ├── tor.js
│   ├── browser.js
│   ├── url.js
│   ├── proxy.js
│   ├── history.js
│   ├── styles.css
│   └── ui.js
└── README.md
```

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set the Tor gateway for the browser client.

   `tor-js` requires a gateway in browser environments. The app reads:

   ```bash
   VITE_TOR_GATEWAY=ip:port:certhash
   ```

   Use the gateway address printed by your own gateway deployment. The format is:

   ```text
   ip:port:certhash
   ```

3. Build the site:

   ```bash
   npm run build
   ```

4. Deploy the `dist/` folder to Cloudflare Pages.

## Cloudflare Pages deployment

- Build command: `npm run build`
- Output directory: `dist`
- Framework preset: `Vite`

In Cloudflare Pages, add `VITE_TOR_GATEWAY` as an environment variable for the project. The value must be your gateway's KPS address in `ip:port:certhash` form.

The app is static and does not need a backend or database.

## Gateway configuration

Browsers cannot open raw TCP sockets, so `tor-js` needs a gateway to reach the Tor network from the browser.

Set the gateway in exactly one place:

- `VITE_TOR_GATEWAY`

That keeps the code portable between local development, Cloudflare Pages preview builds, and production.

For development, point the app at the gateway you are running for `tor-js`.

For production, run and control your own gateway and put its address in the Pages environment variable.

## Architecture

```text
User Browser
  -> Cloudflare Pages static site
  -> tor-js + Arti WASM inside the browser
  -> configurable Tor gateway
  -> Tor network
  -> .onion site
```

The browser app never connects directly to arbitrary onion hosts with raw TCP. The Tor client lives in the browser, and the gateway bridges the browser to the Tor network.

## Security boundaries

The app blocks:

- non-HTTP protocols
- non-`.onion` hostnames
- localhost
- private IPv4 ranges
- obvious browser escape URLs such as `javascript:`, `data:`, and `blob:`

It also keeps the viewer inside a sandboxed iframe and intercepts navigation and forms.

## Limitations

This is a browser-friendly onion viewer, not a full Tor Browser clone.

Known limitations:

- `client.fetch()` is used as the request engine, so responses are buffered in a few paths where the app needs to inspect or rewrite them.
- HTML, CSS, images, and common asset references are handled best effort.
- JavaScript is supported for many pages, but advanced module-loading and dynamic script behaviors may not work perfectly.
- POST forms are supported for standard URL-encoded submissions. Multipart file uploads are not fully implemented.
- Redirects are validated after the fetch completes, but the underlying fetch API still follows the redirect chain.

## Files worth reading

- [src/tor.js](./src/tor.js)
- [src/browser.js](./src/browser.js)
- [src/proxy.js](./src/proxy.js)
- [src/url.js](./src/url.js)

