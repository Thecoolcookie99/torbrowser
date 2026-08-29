import { safeResolveRelativeUrl } from './url.js';

function bytesToBase64(bytes) {
  let binary = '';
  const chunkSize = 0x8000;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }

  return btoa(binary);
}

export function arrayBufferToDataUrl(buffer, contentType = 'application/octet-stream') {
  const bytes = new Uint8Array(buffer);
  return `data:${contentType};base64,${bytesToBase64(bytes)}`;
}

function textContentType(contentType) {
  return /^(text\/|application\/(json|xml|javascript|xhtml\+xml))/i.test(
    contentType,
  );
}

function escapeForScript(value) {
  return JSON.stringify(String(value));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

async function readResponseBody(response) {
  const contentType = response.headers.get('content-type') || '';
  if (textContentType(contentType)) {
    return {
      kind: 'text',
      contentType,
      value: await response.text(),
    };
  }

  return {
    kind: 'binary',
    contentType,
    value: await response.arrayBuffer(),
  };
}

export class TorResourceFetcher {
  constructor(client, logger = null) {
    this.client = client;
    this.logger = logger;
    this.binaryCache = new Map();
    this.textCache = new Map();
  }

  log(level, message) {
    if (!this.logger) {
      return;
    }

    const handler = this.logger[level] || this.logger.log;
    if (typeof handler === 'function') {
      handler.call(this.logger, message);
    }
  }

  async fetchResponse(url, init = {}) {
    this.log('debug', `fetch -> ${url}`);
    return this.client.fetch(url, init);
  }

  async fetchText(url, init = {}) {
    const absoluteUrl = String(url);
    if (this.textCache.has(absoluteUrl)) {
      this.log('debug', `text cache hit -> ${absoluteUrl}`);
      return this.textCache.get(absoluteUrl);
    }

    const response = await this.fetchResponse(absoluteUrl, init);
    if (!response.ok) {
      this.log('warn', `text fetch failed ${response.status} -> ${absoluteUrl}`);
      throw new Error(`HTTP ${response.status} while fetching ${absoluteUrl}`);
    }

    const text = await response.text();
    this.textCache.set(absoluteUrl, text);
    this.log('debug', `text fetched (${text.length} chars) -> ${absoluteUrl}`);
    return text;
  }

  async fetchBinaryDataUrl(url, init = {}) {
    const absoluteUrl = String(url);
    if (this.binaryCache.has(absoluteUrl)) {
      this.log('debug', `binary cache hit -> ${absoluteUrl}`);
      return this.binaryCache.get(absoluteUrl);
    }

    const response = await this.fetchResponse(absoluteUrl, init);
    if (!response.ok) {
      this.log('warn', `binary fetch failed ${response.status} -> ${absoluteUrl}`);
      throw new Error(`HTTP ${response.status} while fetching ${absoluteUrl}`);
    }

    const body = await readResponseBody(response);
    const dataUrl =
      body.kind === 'text'
        ? `data:${body.contentType || 'text/plain;charset=utf-8'},${encodeURIComponent(
            body.value,
          )}`
        : arrayBufferToDataUrl(body.value, body.contentType || 'application/octet-stream');

    this.binaryCache.set(absoluteUrl, dataUrl);
    this.log(
      'debug',
      `binary fetched (${body.kind === 'text' ? body.value.length : body.value.byteLength} units) -> ${absoluteUrl}`,
    );
    return dataUrl;
  }

  async rewriteCss(cssText, baseUrl) {
    let output = String(cssText);
    const importMatches = [...output.matchAll(/@import\s+(?:url\()?\s*(['"]?)([^'")]+)\1\s*\)?([^;]*);/gi)];

    for (const match of importMatches.reverse()) {
      const rawUrl = match[2];
      const media = (match[3] || '').trim();
      const resolved = safeResolveRelativeUrl(rawUrl, baseUrl).toString();
      this.log('debug', `css @import ${rawUrl} -> ${resolved}`);
      const importedCss = await this.fetchText(resolved);
      const rewritten = await this.rewriteCss(importedCss, resolved);
      const replacement = media ? `${rewritten}\n/* media: ${media} */` : rewritten;
      output = output.replace(match[0], replacement);
    }

    const urlMatches = [...output.matchAll(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi)];
    const replacements = new Map();

    for (const match of urlMatches) {
      const rawUrl = match[2].trim();
      if (rawUrl.startsWith('data:') || rawUrl.startsWith('blob:')) {
        continue;
      }

      const resolved = safeResolveRelativeUrl(rawUrl, baseUrl).toString();
      this.log('debug', `css url() ${rawUrl} -> ${resolved}`);
      if (!replacements.has(match[0])) {
        replacements.set(match[0], await this.fetchBinaryDataUrl(resolved));
      }
    }

    for (const [needle, replacement] of replacements.entries()) {
      output = output.split(needle).join(`url("${replacement}")`);
    }

    return output;
  }

  async rewriteHtml(htmlText, baseUrl) {
    const parser = new DOMParser();
    const document = parser.parseFromString(String(htmlText), 'text/html');
    const root = document.documentElement;
    const head = document.head || document.createElement('head');
    const body = document.body || document.createElement('body');

    for (const base of [...document.querySelectorAll('base')]) {
      base.remove();
    }

    const baseElement = document.createElement('base');
    baseElement.href = baseUrl;
    head.prepend(baseElement);

    const stylesheetLinks = [...document.querySelectorAll('link[rel~="stylesheet"][href]')];
    for (const link of stylesheetLinks) {
      try {
        const resolved = safeResolveRelativeUrl(link.getAttribute('href'), baseUrl).toString();
        this.log('debug', `stylesheet link -> ${resolved}`);
        const response = await this.fetchResponse(resolved);
        const responseType = (response.headers.get('content-type') || '').toLowerCase();
        if (!responseType.includes('css')) {
          throw new Error(`Blocked non-css stylesheet content-type: ${responseType || 'unknown'}`);
        }
        const cssText = await response.text();
        const rewrittenCss = await this.rewriteCss(cssText, resolved);
        const style = document.createElement('style');
        style.setAttribute('data-tor-source', resolved);
        style.textContent = rewrittenCss;
        link.replaceWith(style);
      } catch (error) {
        this.log('warn', `stylesheet blocked -> ${String(error.message || error)}`);
        const note = document.createElement('style');
        note.textContent = `/* blocked stylesheet: ${String(error.message || error)} */`;
        link.replaceWith(note);
      }
    }

    const styleNodes = [...document.querySelectorAll('style')];
    for (const style of styleNodes) {
      try {
        style.textContent = await this.rewriteCss(style.textContent || '', baseUrl);
      } catch {
        // Leave the style as-is if rewriting fails.
      }
    }

    const sourceAttrs = [
      'img[src]',
      'audio[src]',
      'video[src]',
      'source[src]',
      'track[src]',
      'script[src]',
      'link[rel~="icon"][href]',
      'link[rel~="apple-touch-icon"][href]',
    ];

    for (const selector of sourceAttrs) {
      const nodes = [...document.querySelectorAll(selector)];
      for (const node of nodes) {
        const attrName = node.hasAttribute('src')
          ? 'src'
          : node.hasAttribute('href')
            ? 'href'
            : 'data';
        const rawValue = node.getAttribute(attrName);
        if (!rawValue) {
          continue;
        }

        try {
          const resolved = safeResolveRelativeUrl(rawValue, baseUrl).toString();
          const tag = node.tagName.toLowerCase();
          if (tag === 'script') {
            this.log('debug', `script src -> ${resolved}`);
            const response = await this.fetchResponse(resolved);
            const scriptType = (response.headers.get('content-type') || '').toLowerCase();
            if (
              !scriptType.includes('javascript') &&
              !scriptType.includes('ecmascript') &&
              !scriptType.includes('module')
            ) {
              throw new Error(`Blocked non-script content-type: ${scriptType || 'unknown'}`);
            }

            const scriptText = await response.text();
            node.removeAttribute('src');
            node.setAttribute('data-tor-source', resolved);
            node.textContent = scriptText;
            continue;
          }

          this.log('debug', `${tag} ${attrName} -> ${resolved}`);
          const dataUrl = await this.fetchBinaryDataUrl(resolved);
          node.setAttribute(attrName, dataUrl);
          node.setAttribute('data-tor-source', resolved);
        } catch (error) {
          this.log('warn', `${node.tagName.toLowerCase()} blocked -> ${String(error.message || error)}`);
          node.removeAttribute(attrName);
          node.setAttribute('data-tor-blocked', String(error.message || error));
        }
      }
    }

    const anchors = [...document.querySelectorAll('a[href], area[href]')];
    for (const anchor of anchors) {
      const rawHref = anchor.getAttribute('href');
      try {
        const resolved = safeResolveRelativeUrl(rawHref, baseUrl).toString();
        this.log('debug', `link ${rawHref} -> ${resolved}`);
        anchor.setAttribute('href', resolved);
      } catch {
        this.log('warn', `blocked link href -> ${rawHref}`);
        anchor.removeAttribute('href');
        anchor.setAttribute('data-tor-blocked', '1');
      }
    }

    const forms = [...document.querySelectorAll('form[action]')];
    for (const form of forms) {
      const rawAction = form.getAttribute('action');
      try {
        const resolved = safeResolveRelativeUrl(rawAction || baseUrl, baseUrl).toString();
        this.log('debug', `form action ${rawAction || '(empty)'} -> ${resolved}`);
        form.setAttribute('action', resolved);
      } catch {
        this.log('warn', `blocked form action -> ${rawAction}`);
        form.setAttribute('action', baseUrl);
        form.setAttribute('data-tor-blocked', '1');
      }
    }

    const actionNodes = [...document.querySelectorAll('[formaction]')];
    for (const node of actionNodes) {
      const rawAction = node.getAttribute('formaction');
      try {
        const resolved = safeResolveRelativeUrl(rawAction, baseUrl).toString();
        this.log('debug', `formaction ${rawAction} -> ${resolved}`);
        node.setAttribute('formaction', resolved);
      } catch {
        this.log('warn', `blocked formaction -> ${rawAction}`);
        node.removeAttribute('formaction');
      }
    }

    const blockedTags = [...document.querySelectorAll('iframe, object, embed')];
    for (const node of blockedTags) {
      const message = document.createElement('div');
      message.setAttribute('data-tor-blocked-frame', '1');
      message.textContent = `${node.tagName.toLowerCase()} blocked by the sandboxed viewer.`;
      node.replaceWith(message);
      this.log('warn', `blocked embedded frame -> ${node.tagName.toLowerCase()}`);
    }

    if (!document.querySelector('link[rel~="icon"]')) {
      const icon = document.createElement('link');
      icon.rel = 'icon';
      icon.href = 'data:,';
      head.appendChild(icon);
      this.log('debug', 'injected blank favicon to suppress browser fallback requests');
    }

    const bootstrapScript = document.createElement('script');
    bootstrapScript.textContent = getIframeBootstrapScript(baseUrl);
    body.appendChild(bootstrapScript);

    if (!document.title) {
      document.title = new URL(baseUrl).hostname;
    }

    this.log('debug', `html rewrite complete -> ${baseUrl}`);
    return `<!doctype html>${root.outerHTML}`;
  }

  async renderNonHtmlResponse(response, requestedUrl) {
    const contentType = response.headers.get('content-type') || '';
    const body = await readResponseBody(response);

    if (body.kind === 'binary' && contentType.startsWith('image/')) {
      const dataUrl = arrayBufferToDataUrl(body.value, contentType);
      return `
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            <base href="${escapeHtml(requestedUrl)}" />
            <style>
              :root { color-scheme: dark; }
              body {
                margin: 0;
                min-height: 100vh;
                display: grid;
                place-items: center;
                background: #0a0f18;
                color: #d8e1ef;
                font-family: Inter, system-ui, sans-serif;
              }
              img {
                max-width: min(100vw - 2rem, 1200px);
                max-height: calc(100vh - 2rem);
                object-fit: contain;
                border: 1px solid rgba(255,255,255,0.08);
                box-shadow: 0 20px 70px rgba(0,0,0,0.45);
                background: rgba(255,255,255,0.02);
              }
              .meta {
                position: fixed;
                inset: auto 1rem 1rem 1rem;
                padding: 0.8rem 1rem;
                border-radius: 16px;
                background: rgba(10, 15, 24, 0.72);
                border: 1px solid rgba(255,255,255,0.08);
                backdrop-filter: blur(12px);
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <img src="${dataUrl}" alt="${escapeHtml(requestedUrl)}" />
            <div class="meta">${escapeHtml(requestedUrl)}</div>
          </body>
        </html>
      `;
    }

    const text =
      body.kind === 'text'
        ? body.value
        : new TextDecoder().decode(new Uint8Array(body.value));

    return `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <base href="${escapeHtml(requestedUrl)}" />
          <style>
            :root { color-scheme: dark; }
            body {
              margin: 0;
              padding: 24px;
              background: #0a0f18;
              color: #d8e1ef;
              font-family: Inter, system-ui, sans-serif;
            }
            .panel {
              max-width: 1100px;
              margin: 0 auto;
              padding: 20px;
              border-radius: 20px;
              background: rgba(255,255,255,0.03);
              border: 1px solid rgba(255,255,255,0.08);
              box-shadow: 0 20px 70px rgba(0,0,0,0.35);
            }
            pre {
              margin: 0;
              white-space: pre-wrap;
              word-break: break-word;
              font: 13px/1.6 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
            }
            .meta {
              display: flex;
              justify-content: space-between;
              gap: 1rem;
              align-items: center;
              margin-bottom: 1rem;
              font-size: 13px;
              color: #8ca3bf;
            }
          </style>
        </head>
        <body>
          <div class="panel">
            <div class="meta">
              <strong>HTTP ${response.status} ${response.statusText}</strong>
              <span>${escapeHtml(requestedUrl)}</span>
            </div>
            <pre>${escapeHtml(text)}</pre>
          </div>
        </body>
      </html>
    `;
  }
}

function getIframeBootstrapScript(baseUrl) {
  return `
    (() => {
      const BASE_URL = ${JSON.stringify(baseUrl)};
      const pending = new Map();
      let nextId = 1;

      function bytesToBase64(bytes) {
        let binary = '';
        const chunkSize = 0x8000;
        for (let index = 0; index < bytes.length; index += chunkSize) {
          binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
        }
        return btoa(binary);
      }

      function base64ToBytes(base64) {
        if (!base64) {
          return new Uint8Array();
        }
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let index = 0; index < binary.length; index += 1) {
          bytes[index] = binary.charCodeAt(index);
        }
        return bytes;
      }

      function send(type, payload = {}) {
        return new Promise((resolve, reject) => {
          const id = nextId++;
          pending.set(id, { resolve, reject });
          window.parent.postMessage({ __tor: true, type, id, ...payload }, '*');
        });
      }

      window.addEventListener('message', (event) => {
        const data = event.data || {};
        if (!data.__tor || data.type !== 'reply') {
          return;
        }
        const entry = pending.get(data.id);
        if (!entry) {
          return;
        }
        pending.delete(data.id);
        if (data.ok) {
          entry.resolve(data.value);
        } else {
          entry.reject(new Error(data.error || 'Tor request failed'));
        }
      });

      async function torFetch(input, init = {}) {
        const request =
          input instanceof Request
            ? input
            : new Request(
                typeof input === 'string' ? new URL(input, BASE_URL).toString() : input,
                init,
              );
        const headers = {};
        request.headers.forEach((value, key) => {
          headers[key] = value;
        });

        let body = null;
        if (!['GET', 'HEAD'].includes(request.method.toUpperCase())) {
          const arrayBuffer = await request.arrayBuffer();
          body = bytesToBase64(new Uint8Array(arrayBuffer));
        }

        const response = await send('fetch', {
          url: request.url,
          method: request.method,
          headers,
          body,
        });

        const bytes = response.bodyBase64
          ? base64ToBytes(response.bodyBase64)
          : new Uint8Array();
        return new Response(bytes, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        });
      }

      window.fetch = torFetch;
      window.XMLHttpRequest = class XMLHttpRequest {
        constructor() {
          this._headers = {};
          this._method = 'GET';
          this._url = '';
          this._async = true;
          this.readyState = 0;
          this.status = 0;
          this.responseText = '';
          this.responseURL = '';
          this.onreadystatechange = null;
          this.onload = null;
          this.onerror = null;
        }

        open(method, url, async = true) {
          this._method = String(method || 'GET').toUpperCase();
          this._url = new URL(url, BASE_URL).toString();
          this._async = async !== false;
          this.readyState = 1;
          this.onreadystatechange?.();
        }

        setRequestHeader(key, value) {
          this._headers[String(key).toLowerCase()] = String(value);
        }

        async send(body = null) {
          try {
            const response = await torFetch(this._url, {
              method: this._method,
              headers: this._headers,
              body,
            });
            this.status = response.status;
            this.responseURL = this._url;
            this.responseText = await response.text();
            this.readyState = 4;
            this.onreadystatechange?.();
            this.onload?.();
          } catch (error) {
            this.readyState = 4;
            this.onreadystatechange?.();
            this.onerror?.(error);
          }
        }

        abort() {}
      };

      window.WebSocket = class WebSocket {
        constructor() {
          throw new Error('WebSocket connections are blocked in the onion viewer.');
        }
      };

      window.EventSource = class EventSource {
        constructor() {
          throw new Error('EventSource connections are blocked in the onion viewer.');
        }
      };

      navigator.sendBeacon = () => false;

      document.addEventListener(
        'click',
        (event) => {
          const link = event.target?.closest?.('a[href]');
          if (!link) {
            return;
          }

          const href = link.getAttribute('href');
          if (!href) {
            return;
          }

          event.preventDefault();
          window.parent.postMessage(
            { __tor: true, type: 'navigate', url: new URL(href, BASE_URL).toString() },
            '*',
          );
        },
        true,
      );

      document.addEventListener(
        'submit',
        async (event) => {
          const form = event.target;
          if (!form || !form.action) {
            return;
          }

          event.preventDefault();
          const method = String(form.method || 'get').toUpperCase();
          const action = new URL(form.getAttribute('action') || BASE_URL, BASE_URL).toString();
          const formData = new FormData(form);

          if (method === 'GET') {
            const url = new URL(action);
            const params = new URLSearchParams(formData);
            url.search = params.toString();
            window.parent.postMessage(
              { __tor: true, type: 'navigate', url: url.toString() },
              '*',
            );
            return;
          }

          const headers = {
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
          };
          const body = new URLSearchParams(formData).toString();
          window.parent.postMessage(
            { __tor: true, type: 'submit', url: action, method, headers, body },
            '*',
          );
        },
        true,
      );

      document.title = document.title || new URL(BASE_URL).hostname;
      window.parent.postMessage({ __tor: true, type: 'ready' }, '*');
    })();
  `;
}
