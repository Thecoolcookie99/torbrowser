import { BrowserHistory } from './history.js';
import { hasGatewayConfiguration, getTorClient, TOR_GATEWAY } from './tor.js';
import { TorResourceFetcher } from './proxy.js';
import { getLaunchTargetFromLocation, normalizeDisplayUrl, validateNavigationUrl } from './url.js';

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
    this.setConnectionState('Tor: idle', 'Waiting to bootstrap the Tor client.');
  }

  log(level, message) {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    this.appendLog(line);
  }

  setConnectionState(state, detail) {
    this.ui.connectionState.textContent = state;
    this.ui.connectionDetail.textContent = detail;
  }

  async start() {
    this.bindEvents();

    const launchTarget = getLaunchTargetFromLocation(window.location);
    if (launchTarget) {
      this.ui.addressInput.value = launchTarget;
      this.log('info', `Detected launch target from page path -> ${launchTarget}`);
    }

    if (!hasGatewayConfiguration()) {
      this.setConnectionState('Tor: gateway missing', 'Set VITE_TOR_GATEWAY before browsing onion sites.');
      this.log('warn', 'VITE_TOR_GATEWAY is missing.');
      this.appendLog(
        'Set VITE_TOR_GATEWAY to an ip:port:certhash gateway before browsing onion sites.',
      );
      this.showError(
        'Tor gateway is not configured',
        'Set VITE_TOR_GATEWAY to a Tor gateway address in the form ip:port:certhash, then rebuild and redeploy.',
      );
      return;
    }

    this.setConnectionState('Tor: connecting', 'Opening the browser client and connecting to the configured gateway.');
    await this.bootstrapTor();

    if (launchTarget) {
      this.setPageMessage('Launching onion site from the page path');
      try {
        await this.navigate(launchTarget, { replace: true, quiet: true });
      } catch {
        // navigate() handles and logs its own errors.
      }
      return;
    }

    const initial = this.history.current();
    if (initial?.url) {
      await this.navigate(initial.url, { replace: true, quiet: true });
      return;
    }

    this.setConnectionState('Tor: connected', 'The Tor client is ready for browsing.');
    this.setPageMessage('Ready');
    this.log('info', 'Application ready.');
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
        this.log('warn', 'Ignored message from non-viewer source.');
        return;
      }

      if (data.type === 'navigate') {
        this.log('info', `Viewer navigation requested -> ${data.url}`);
        void this.navigate(data.url);
        return;
      }

      if (data.type === 'submit') {
        this.log('info', `Viewer form submit -> ${data.method || 'GET'} ${data.url}`);
        void this.navigate(data.url, {
          method: data.method,
          headers: data.headers,
          body: data.body,
        });
        return;
      }

      if (data.type === 'fetch') {
        this.log('debug', `Viewer fetch -> ${data.method || 'GET'} ${data.url}`);
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
    this.setConnectionState('Tor: starting', 'Loading the tor-js runtime and preparing bootstrap state.');
    this.log('info', 'Starting tor-js bootstrap...');

    this.client = await getTorClient({
      onLog: (level, message) => {
        this.log(level, `tor-js: ${message}`);
        this.updateConnectionStateFromTorLog(message);
      },
    });
    this.fetcher = new TorResourceFetcher(this.client, {
      debug: (message) => this.log('debug', message),
      info: (message) => this.log('info', message),
      warn: (message) => this.log('warn', message),
      error: (message) => this.log('error', message),
      log: (message) => this.log('debug', message),
    });

    this.setConnectionState('Tor: connected', 'Tor bootstrap completed and the client is ready.');
    this.setLoading(false);
    this.log('info', 'Tor client is ready.');
    return this.client;
  }

  updateConnectionStateFromTorLog(message) {
    const lower = String(message || '').toLowerCase();

    if (lower.includes('fast bootstrap: fetching bootstrap.zip.zst')) {
      this.setConnectionState(
        'Tor: fetching directory snapshot',
        'Downloading the fast bootstrap snapshot from the gateway.',
      );
      return;
    }

    if (lower.includes('bootstrapping...')) {
      this.setConnectionState('Tor: bootstrapping', 'Starting the Tor engine and loading bootstrap state.');
      return;
    }

    if (lower.includes('bootstrap complete')) {
      this.setConnectionState('Tor: connected', 'Tor bootstrap completed and the client is ready.');
      return;
    }

    if (lower.includes('fetching ') && lower.includes('through tor')) {
      this.setConnectionState('Tor: connecting', 'A request is reaching the Tor network.');
    }
  }

  async runTorCheck() {
    try {
      this.setPageMessage('Running Tor connectivity test');
      this.setLoading(true);
      this.log('info', `Running Tor connectivity test -> ${DEFAULT_TEST_URL}`);
      const response = await this.client.fetch(DEFAULT_TEST_URL);
      const data = await response.json();
      this.showTextResponse(
        'Tor connectivity test',
        `${response.status} ${response.statusText}`,
        JSON.stringify(data, null, 2),
      );
      this.setStatus('Tor test completed');
      this.log('info', 'Tor connectivity test completed successfully.');
    } catch (error) {
      this.showError('Tor connectivity test failed', this.formatError(error));
      this.log('error', `Tor connectivity test failed: ${this.formatError(error)}`);
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
      this.log('warn', `Blocked navigation input "${input}": ${this.formatError(error)}`);
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
    this.log('info', `Navigate -> ${entry.method} ${entry.url}`);
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
      this.log('debug', `Fragment-only navigation completed -> ${url.toString()}`);
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
      this.log('debug', `Response received -> ${response.status} ${response.statusText} ${finalUrl}`);
      if (finalParsed.hostname && !finalParsed.hostname.endsWith('.onion')) {
        this.log('error', `Blocked redirect to non-onion destination -> ${finalUrl}`);
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
      this.log('error', `Navigation failed for ${entry.url}: ${this.formatError(error)}`);
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
      this.log('debug', `Rendering HTML response (${html.length} chars) from ${response.url || requestedUrl}`);
      try {
        const rewritten = await this.fetcher.rewriteHtml(html, response.url || requestedUrl);
        this.showViewerHtml(rewritten);
        return;
      } catch (error) {
        this.log('error', `HTML rewrite failed for ${response.url || requestedUrl}: ${this.formatError(error)}`);
        throw error;
      }
    }

    if (
      normalizedContentType.startsWith('text/') ||
      normalizedContentType.includes('json') ||
      normalizedContentType.includes('xml') ||
      normalizedContentType.includes('javascript')
    ) {
      const text = await response.text();
      this.log('debug', `Rendering text response (${text.length} chars) from ${response.url || requestedUrl}`);
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
      this.log('debug', `Rendering image response from ${response.url || requestedUrl}`);
      this.showImageResponse(dataUrl, response.url || requestedUrl);
      return;
    }

    const buffer = await response.arrayBuffer();
    this.log(
      'debug',
      `Rendering binary response (${buffer.byteLength} bytes, ${contentType || 'unknown'}) from ${
        response.url || requestedUrl
      }`,
    );
    this.showTextResponse(
      normalizeDisplayUrl(response.url || requestedUrl),
      `HTTP ${response.status} ${response.statusText}`,
      `Binary response received (${buffer.byteLength} bytes, ${contentType || 'unknown type'}).`,
    );
  }

  async handleIframeFetch(event, data) {
    try {
      this.log('debug', `Iframe bridge fetch start -> ${data.method || 'GET'} ${data.url}`);
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
      this.log(
        'debug',
        `Iframe bridge fetch complete -> ${response.status} ${response.statusText} ${data.url}`,
      );
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
      this.log('error', `Iframe bridge fetch failed -> ${data.url}: ${this.formatError(error)}`);
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

    this.log('info', `History popstate -> ${state.url}`);

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
