export function createAppShell(container) {
  container.innerHTML = `
    <div class="shell">
      <header class="topbar">
        <div class="brand">
          <div class="brand-mark">ON</div>
          <div>
            <div class="brand-title">Onion Browser</div>
            <div class="brand-subtitle">Cloudflare Pages + tor-js in the browser</div>
          </div>
        </div>
        <div class="status-pill" data-status>Pretending nothing yet</div>
      </header>

      <section class="gateway-card">
        <div class="gateway-copy">
          <p class="eyebrow">Tor gateway</p>
          <p class="gateway-label" data-gateway-label>Not configured</p>
          <p class="gateway-hint">
            Tor traffic is routed through the configured gateway before reaching the Tor network.
          </p>
          <div class="connection-stack">
            <div class="connection-state" data-connection-state>Tor: idle</div>
            <div class="connection-detail" data-connection-detail>Waiting to bootstrap the Tor client.</div>
          </div>
        </div>
        <button class="ghost-button" type="button" data-test-button>Test Tor</button>
      </section>

      <section class="toolbar">
        <div class="nav-group">
          <button class="nav-button" type="button" data-back-button title="Back">Back</button>
          <button class="nav-button" type="button" data-forward-button title="Forward">Forward</button>
          <button class="nav-button" type="button" data-reload-button title="Reload">Reload</button>
        </div>
        <form class="address-form" data-address-form>
          <input
            class="address-input"
            type="text"
            spellcheck="false"
            autocomplete="off"
            autocapitalize="none"
            placeholder="http://exampleabcdef...onion/"
            data-address-input
          />
          <button class="go-button" type="submit">Go</button>
        </form>
      </section>

      <section class="content-shell">
        <div class="content-toolbar">
          <div class="page-meta">
            <span class="page-status" data-page-status>Idle</span>
            <span class="page-url" data-page-url>About to browse the onion network</span>
          </div>
          <div class="spinner" data-spinner aria-hidden="true"></div>
        </div>

        <div class="hero" data-hero>
          <h1>Browse .onion sites from a normal web browser</h1>
          <p>
            This app runs <code>tor-js</code> in the visitor's browser, bootstraps through a gateway,
            and rewrites onion resources through the Tor client instead of sending them over the normal network.
          </p>
          <div class="hero-grid">
            <div class="hero-card">
              <strong>1. Enter an onion URL</strong>
              <span>HTTP and HTTPS onion hosts only.</span>
            </div>
            <div class="hero-card">
              <strong>2. Bootstrap Tor</strong>
              <span>The client initializes once and is reused.</span>
            </div>
            <div class="hero-card">
              <strong>3. Browse carefully</strong>
              <span>HTML, CSS, scripts, images, and forms are handled best effort.</span>
            </div>
          </div>
        </div>

        <iframe
          class="viewer"
          data-viewer
          sandbox="allow-scripts allow-forms"
          referrerpolicy="no-referrer"
          title="Onion viewer"
        ></iframe>

        <div class="text-view" data-text-view hidden>
          <div class="text-view-header">
            <strong data-text-title>Response</strong>
            <span data-text-meta></span>
          </div>
          <pre data-text-output></pre>
        </div>

        <div class="error-card" data-error-card hidden>
          <strong data-error-title>Unable to load page</strong>
          <p data-error-message></p>
          <button class="ghost-button" type="button" data-error-retry>Retry</button>
        </div>
      </section>

      <section class="log-panel">
        <div class="log-header">
          <strong>Verbose debug stream</strong>
          <span>Local only, not uploaded</span>
        </div>
        <pre class="log-output" data-log-output>Waiting for Tor bootstrap...</pre>
      </section>
    </div>
  `;

  return {
    root: container,
    status: container.querySelector('[data-status]'),
    gatewayLabel: container.querySelector('[data-gateway-label]'),
    connectionState: container.querySelector('[data-connection-state]'),
    connectionDetail: container.querySelector('[data-connection-detail]'),
    testButton: container.querySelector('[data-test-button]'),
    backButton: container.querySelector('[data-back-button]'),
    forwardButton: container.querySelector('[data-forward-button]'),
    reloadButton: container.querySelector('[data-reload-button]'),
    addressForm: container.querySelector('[data-address-form]'),
    addressInput: container.querySelector('[data-address-input]'),
    pageStatus: container.querySelector('[data-page-status]'),
    pageUrl: container.querySelector('[data-page-url]'),
    spinner: container.querySelector('[data-spinner]'),
    hero: container.querySelector('[data-hero]'),
    viewer: container.querySelector('[data-viewer]'),
    textView: container.querySelector('[data-text-view]'),
    textTitle: container.querySelector('[data-text-title]'),
    textMeta: container.querySelector('[data-text-meta]'),
    textOutput: container.querySelector('[data-text-output]'),
    errorCard: container.querySelector('[data-error-card]'),
    errorTitle: container.querySelector('[data-error-title]'),
    errorMessage: container.querySelector('[data-error-message]'),
    errorRetry: container.querySelector('[data-error-retry]'),
    logOutput: container.querySelector('[data-log-output]'),
  };
}
