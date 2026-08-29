import { BrowserHistory } from './history.js';
import { hasGatewayConfiguration, getTorClient, TOR_GATEWAY } from './tor.js';
import { TorResourceFetcher } from './proxy.js';
import { validateNavigationUrl, normalizeDisplayUrl } from './url.js';

const DEFAULT_TEST_URL = 'https://check.torproject.org/api/ip';

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

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export class OnionBrowser {
  constructor(ui) {
    this.ui = ui;
    this.client = null;
    this.fetcher = null;
    this.currentUrl = null;
    this.currentEntry = null;
    this.lastSuccessfulEntry = null;
    this.pendingNavigation = null;
    this.history = new BrowserHistory((state) => this.handlePopState(state));

    this.ui.gatewayLabel.textContent = hasGatewayConfiguration()
      ? TOR_GATEWAY
      : 'Set VITE_TOR_GATEWAY in your Cloudflare Pages environment';
  }

  async start() {
    this.bindEvents();

    if (!hasGatewayConfiguration()) {
      this.setStatus('Gateway not configured');
      this.appendLog(
        'Set VITE_TOR_GATEWAY to an ip:port:certhash gateway before browsing onion sites.',
      );
      this.showError(
        'Tor gateway is not configured',
        'Set VITE_TOR_GATEWAY to a Tor gateway address in the form ip:port:certhash, then rebuild and redeploy.',
      );
      return;
    }

    await this.bootstrapTor();

    const initial = this.history.current();
    if (initial?.url) {
      await this.navigate(initial.url, { replace: true, quiet: true });
      return;
    }

    this.setStatus('Tor connected');
    this.setPageMessage('Ready');
  }

  bindEvents() {
    this.ui.addressForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      await this.navigate(this.ui.addressInput.value);
    });

    this.ui.backButton.addEventListener('click', () => window.history.back());
    this.ui.forwardButton.addEventListener('click', () => window.history.forward());
    this.ui.reloadButton.addEventListener('click', () => {
      if (this.currentEntry) {
        void this.navigate(this.currentEntry.url, {
          replace: true,
          method: this.currentEntry.method,
          body: this.currentEntry.body,
          headers: this.currentEntry.headers,
        });
      }
    });

    this.ui.testButton.addEventListener('click', async () => {
      await this.bootstrapTor();
      await this.runTorCheck();
    });

    this.ui.errorRetry.addEventListener('click', () => {
      if (this.currentEntry) {
        void this.navigate(this.currentEntry.url, {
          replace: true,
          method: this.currentEntry.method,
          body: this.currentEntry.body,
          headers: this.currentEntry.headers,
        });
      }
    });

    window.addEventListener('message', (event) => {
      const data = event.data || {};
      if (!data.__tor) {
        return;
      }

      if (event.source !== this.ui.viewer.contentWindow) {
        return;
      }

      if (data.type === 'navigate') {
        void this.navigate(data.url);
        return;
      }

      if (data.type === 'submit') {
        void this.navigate(data.url, {
          method: data.method,
          headers: data.headers,
          body: data.body,
        });
        return;
      }

      if (data.type === 'fetch') {
        void this.handleIframeFetch(event, data);
      }
    });
  }

  async bootstrapTor() {
    if (this.client) {
      return this.client;
    }

    this.setStatus('Bootstrapping Tor');
    this.setPageMessage('Bootstrapping Tor client');
    this.setLoading(true);
    this.appendLog('Starting tor-js bootstrap...');

    this.client = await getTorClient({
      onLog: (level, message) => {
        const line = `[${level}] ${message}`;
        this.appendLog(line);
      },
    });
    this.fetcher = new TorResourceFetcher(this.client);

    this.setStatus('Tor connected');
    this.setLoading(false);
    this.appendLog('Tor client is ready.');
    return this.client;
  }

  async runTorCheck() {
    try {
      this.setPageMessage('Running Tor connectivity test');
      this.setLoading(true);
      const response = await this.client.fetch(DEFAULT_TEST_URL);
      const data = await response.json();
      this.showTextResponse(
        'Tor connectivity test',
        `${response.status} ${response.statusText}`,
        JSON.stringify(data, null, 2),
      );
      this.setStatus('Tor test completed');
      this.appendLog('Tor connectivity test completed successfully.');
    } catch (error) {
      this.showError('Tor connectivity test failed', this.formatError(error));
      this.appendLog(`Tor connectivity test failed: ${this.formatError(error)}`);
    } finally {
      this.setLoading(false);
    }
  }

  async navigate(input, options = {}) {
    const { replace = false, method = 'GET', body = null, headers = {}, quiet = false } = options;
    let url;

    try {
      url = validateNavigationUrl(input, this.currentUrl?.toString() || '');
    } catch (error) {
      this.showError('Invalid address', this.formatError(error));
      this.setPageMessage('Navigation blocked');
      return;
    }

    const entry = {
      url: url.toString(),
      method,
      body,
      headers,
    };

    if (!quiet) {
      this.ui.addressInput.value = entry.url;
    }

    this.pendingNavigation = entry;
    this.setLoading(true);
    this.setPageMessage(`Loading ${url.hostname}`);
    this.hideError();
    this.hideTextResponse();
    this.showViewer();

    const isSameDocumentFragment =
      this.currentUrl &&
      this.currentUrl.origin === url.origin &&
      this.currentUrl.pathname === url.pathname &&
      this.currentUrl.search === url.search &&
      this.currentUrl.hash !== url.hash;

    if (isSameDocumentFragment) {
      this.currentUrl = url;
      this.currentEntry = entry;
      this.lastSuccessfulEntry = entry;
      this.setStatus('Fragment updated');
      this.setPageMessage(`Jumped to ${url.hash || 'fragment'}`);
      this.setAddress(url.toString());
      if (!replace) {
        this.history.push(entry);
      } else {
        this.history.replace(entry);
      }
      this.setLoading(false);
      this.pendingNavigation = null;
      return;
    }

    try {
      await this.bootstrapTor();
      const response = await this.client.fetch(entry.url, {
        method: entry.method,
        body: entry.body,
        headers: entry.headers,
      });

      const finalUrl = response.url || entry.url;
      const finalParsed = new URL(finalUrl);
      if (finalParsed.hostname && !finalParsed.hostname.endsWith('.onion')) {
        throw new Error('Redirected to a non-onion destination, which is blocked.');
      }

      this.currentUrl = finalParsed;
      this.currentEntry = entry;
      this.lastSuccessfulEntry = entry;
      this.setStatus(`HTTP ${response.status}`);
      this.setPageMessage(`Loaded ${finalParsed.hostname}`);
      this.setAddress(finalUrl);

      if (!replace) {
        this.history.push(entry);
      } else {
        this.history.replace(entry);
      }

      await this.renderResponse(response, entry.url);
    } catch (error) {
      this.showError('Unable to load page', this.formatError(error));
      this.setStatus('Load failed');
      this.setPageMessage('Navigation failed');
      this.appendLog(`Navigation failed for ${entry.url}: ${this.formatError(error)}`);
    } finally {
      this.setLoading(false);
      this.pendingNavigation = null;
    }
  }

  async renderResponse(response, requestedUrl) {
    const contentType = response.headers.get('content-type') || '';
    const normalizedContentType = contentType.toLowerCase();

    if (normalizedContentType.includes('text/html')) {
      const html = await response.text();
      const rewritten = await this.fetcher.rewriteHtml(html, response.url || requestedUrl);
      this.showViewerHtml(rewritten);
      return;
    }

    if (
      normalizedContentType.startsWith('text/') ||
      normalizedContentType.includes('json') ||
      normalizedContentType.includes('xml') ||
      normalizedContentType.includes('javascript')
    ) {
      const text = await response.text();
      this.showTextResponse(
        normalizeDisplayUrl(response.url || requestedUrl),
        `HTTP ${response.status} ${response.statusText}`,
        text,
      );
      return;
    }

    if (normalizedContentType.startsWith('image/')) {
      const dataUrl = await response
        .arrayBuffer()
        .then((buffer) => `data:${contentType};base64,${bytesToBase64(new Uint8Array(buffer))}`);
      this.showImageResponse(dataUrl, response.url || requestedUrl);
      return;
    }

    const buffer = await response.arrayBuffer();
    this.showTextResponse(
      normalizeDisplayUrl(response.url || requestedUrl),
      `HTTP ${response.status} ${response.statusText}`,
      `Binary response received (${buffer.byteLength} bytes, ${contentType || 'unknown type'}).`,
    );
  }

  async handleIframeFetch(event, data) {
    try {
      const response = await this.client.fetch(data.url, {
        method: data.method,
        headers: data.headers,
        body: data.body ? base64ToBytes(data.body) : undefined,
      });

      const headers = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });

      const arrayBuffer = await response.arrayBuffer();
      const bodyBase64 = bytesToBase64(new Uint8Array(arrayBuffer));
      event.source?.postMessage(
        {
          __tor: true,
          type: 'reply',
          id: data.id,
          ok: true,
          value: {
            status: response.status,
            statusText: response.statusText,
            headers,
            bodyBase64,
          },
        },
        '*',
      );
    } catch (error) {
      event.source?.postMessage(
        {
          __tor: true,
          type: 'reply',
          id: data.id,
          ok: false,
          error: this.formatError(error),
        },
        '*',
      );
    }
  }

  handlePopState(state) {
    if (!state?.url) {
      return;
    }

    void this.navigate(state.url, {
      replace: true,
      method: state.method || 'GET',
      body: state.body || null,
      headers: state.headers || {},
      quiet: true,
    });
  }

  setStatus(text) {
    this.ui.status.textContent = text;
  }

  setPageMessage(text) {
    this.ui.pageStatus.textContent = text;
  }

  setAddress(url) {
    this.ui.pageUrl.textContent = url;
    this.ui.addressInput.value = url;
  }

  setLoading(isLoading) {
    this.ui.spinner.classList.toggle('is-visible', isLoading);
  }

  showError(title, message) {
    this.ui.errorTitle.textContent = title;
    this.ui.errorMessage.textContent = message;
    this.ui.errorCard.hidden = false;
    this.ui.viewer.hidden = true;
    this.ui.textView.hidden = true;
    this.ui.hero.hidden = true;
  }

  hideError() {
    this.ui.errorCard.hidden = true;
  }

  hideTextResponse() {
    this.ui.textView.hidden = true;
  }

  showTextResponse(title, meta, text) {
    this.ui.textTitle.textContent = title;
    this.ui.textMeta.textContent = meta;
    this.ui.textOutput.textContent = text;
    this.ui.textView.hidden = false;
    this.ui.viewer.hidden = true;
    this.ui.hero.hidden = true;
    this.hideError();
  }

  showImageResponse(dataUrl, source) {
    this.showViewerHtml(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            :root { color-scheme: dark; }
            body {
              margin: 0;
              min-height: 100vh;
              display: grid;
              place-items: center;
              background: #0a0f18;
            }
            img {
              max-width: min(100vw - 2rem, 1200px);
              max-height: calc(100vh - 2rem);
              object-fit: contain;
            }
            .meta {
              position: fixed;
              left: 1rem;
              right: 1rem;
              bottom: 1rem;
              padding: 0.75rem 1rem;
              border-radius: 14px;
              background: rgba(12,18,29,.82);
              color: #8ca3bf;
              border: 1px solid rgba(255,255,255,.08);
              font: 12px/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
            }
          </style>
        </head>
        <body>
          <img src="${dataUrl}" alt="${escapeHtml(source)}" />
          <div class="meta">${escapeHtml(source)}</div>
        </body>
      </html>
    `);
  }

  showViewerHtml(srcdoc) {
    this.ui.viewer.srcdoc = srcdoc;
    this.ui.viewer.hidden = false;
    this.ui.textView.hidden = true;
    this.ui.hero.hidden = true;
    this.hideError();
  }

  showViewer() {
    this.ui.viewer.hidden = false;
    this.ui.hero.hidden = true;
    this.ui.textView.hidden = true;
  }

  appendLog(message) {
    const current = this.ui.logOutput.textContent || '';
    this.ui.logOutput.textContent = current ? `${current}\n${message}` : message;
    this.ui.logOutput.scrollTop = this.ui.logOutput.scrollHeight;
  }

  formatError(error) {
    if (!error) {
      return 'Unknown error';
    }

    if (typeof error === 'string') {
      return error;
    }

    return error.message || String(error);
  }
}
