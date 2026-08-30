(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function e(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=e(n);fetch(n.href,s)}})();function Y(r){return r.innerHTML=`
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
  `,{root:r,status:r.querySelector("[data-status]"),gatewayLabel:r.querySelector("[data-gateway-label]"),connectionState:r.querySelector("[data-connection-state]"),connectionDetail:r.querySelector("[data-connection-detail]"),testButton:r.querySelector("[data-test-button]"),backButton:r.querySelector("[data-back-button]"),forwardButton:r.querySelector("[data-forward-button]"),reloadButton:r.querySelector("[data-reload-button]"),addressForm:r.querySelector("[data-address-form]"),addressInput:r.querySelector("[data-address-input]"),pageStatus:r.querySelector("[data-page-status]"),pageUrl:r.querySelector("[data-page-url]"),spinner:r.querySelector("[data-spinner]"),hero:r.querySelector("[data-hero]"),viewer:r.querySelector("[data-viewer]"),textView:r.querySelector("[data-text-view]"),textTitle:r.querySelector("[data-text-title]"),textMeta:r.querySelector("[data-text-meta]"),textOutput:r.querySelector("[data-text-output]"),errorCard:r.querySelector("[data-error-card]"),errorTitle:r.querySelector("[data-error-title]"),errorMessage:r.querySelector("[data-error-message]"),errorRetry:r.querySelector("[data-error-retry]"),logOutput:r.querySelector("[data-log-output]")}}class J{constructor(t){this.onPopState=t,window.addEventListener("popstate",e=>{var o;(o=this.onPopState)==null||o.call(this,e.state||null)})}replace(t){const e={...t};window.history.replaceState(e,"",e.url)}push(t){const e={...t};window.history.pushState(e,"",e.url)}current(){return window.history.state||null}}const X="https://cdn.jsdelivr.net/npm/tor-js@0.4.1/dist/entryPoints/wasm-cdn/index.js",B="".trim();let k=null,L=null,A=null;function Z(r){try{if(typeof indexedDB<"u")return new r.IndexedDBStorage("onion-browser")}catch{}return new r.MemoryStorage}async function K(){return A||(A=import(X)),A}function C(){return B.length>0}async function Q({onLog:r}={}){return L||(k||(k=(async()=>{if(!C())throw new Error("Tor gateway is not configured. Set VITE_TOR_GATEWAY to an ip:port:certhash gateway address.");const{Log:t,TorClient:e,storage:o}=await K(),n=new t({rawLog:(a,...u)=>{const l=u.map(i=>{if(typeof i=="string")return i;try{return JSON.stringify(i)}catch{return String(i)}}).join(" ");r==null||r(a,l)}}),s=new e({gateway:B,storage:Z(o),log:n,logLevel:"info"});return await s.ready(),L=s,s})()),k)}const D=".onion";function tt(r){return/^(?:\d{1,3}\.){3}\d{1,3}$/.test(r)}function f(r){return r.split(".").map(t=>Number(t)).reduce((t,e)=>(t<<8|e&255)>>>0,0)}function et(r){if(!tt(r))return!1;const t=f(r);return[[f("10.0.0.0"),f("10.255.255.255")],[f("127.0.0.0"),f("127.255.255.255")],[f("172.16.0.0"),f("172.31.255.255")],[f("192.168.0.0"),f("192.168.255.255")],[f("169.254.0.0"),f("169.254.255.255")],[f("100.64.0.0"),f("100.127.255.255")]].some(([o,n])=>t>=o&&t<=n)}function rt(r){return r==="localhost"||r==="localhost.localdomain"||r==="localtest.me"||r.endsWith(".localhost")}function P(r){return/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(r)}function F(r){return r.toLowerCase().endsWith(D)}function j(r){if(!r)return!0;const t=r.toLowerCase();return!!(rt(t)||et(t))}function R(r,t=""){const e=String(r??"").trim();if(!e)throw new Error("Enter a URL first.");return t?new URL(e,t):!P(e)&&e.includes(D)?new URL(`https://${e}`):!P(e)&&/^[^\s/]+\.[^\s/]+/.test(e)?new URL(`https://${e}`):new URL(e)}function ot(r,t=""){let e;try{e=R(r,t)}catch{throw new Error("Enter a valid HTTP or HTTPS .onion URL.")}if(e.protocol!=="http:"&&e.protocol!=="https:")throw new Error("Only HTTP and HTTPS URLs are supported.");if(!F(e.hostname))throw new Error("Only .onion hostnames are allowed.");if(j(e.hostname))throw new Error("That hostname is blocked by the browser policy.");if(e.username||e.password)throw new Error("Credentials in URLs are not supported.");return e}function b(r,t){if(!r)throw new Error("Missing URL.");const e=new URL(String(r),t);if(e.protocol!=="http:"&&e.protocol!=="https:")throw new Error("Blocked non-HTTP URL.");if(!F(e.hostname))throw new Error("Blocked non-onion URL.");if(j(e.hostname))throw new Error("Blocked local or private destination.");return e}function M(r){return new URL(r).toString()}function nt(r){if(!r)return null;const t=String(r.search||"");if(t){const s=new URLSearchParams(t),a=s.get("url")||s.get("target");if(a)try{return R(a).toString()}catch{}}const o=String(r.pathname||"/").replace(/^\/+/,"");if(!o||o==="index.html")return null;const n=decodeURIComponent(o);try{return R(n).toString()}catch{return null}}function st(r){let t="";for(let o=0;o<r.length;o+=32768)t+=String.fromCharCode(...r.subarray(o,o+32768));return btoa(t)}function q(r,t="application/octet-stream"){const e=new Uint8Array(r);return`data:${t};base64,${st(e)}`}function it(r){return/^(text\/|application\/(json|xml|javascript|xhtml\+xml))/i.test(r)}function x(r){return String(r).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}async function I(r){const t=r.headers.get("content-type")||"";return it(t)?{kind:"text",contentType:t,value:await r.text()}:{kind:"binary",contentType:t,value:await r.arrayBuffer()}}class at{constructor(t,e=null){this.client=t,this.logger=e,this.binaryCache=new Map,this.textCache=new Map}log(t,e){if(!this.logger)return;const o=this.logger[t]||this.logger.log;typeof o=="function"&&o.call(this.logger,e)}async fetchResponse(t,e={}){return this.log("debug",`fetch -> ${t}`),this.client.fetch(t,e)}async fetchText(t,e={}){const o=String(t);if(this.textCache.has(o))return this.log("debug",`text cache hit -> ${o}`),this.textCache.get(o);const n=await this.fetchResponse(o,e);if(!n.ok)throw this.log("warn",`text fetch failed ${n.status} -> ${o}`),new Error(`HTTP ${n.status} while fetching ${o}`);const s=await n.text();return this.textCache.set(o,s),this.log("debug",`text fetched (${s.length} chars) -> ${o}`),s}async fetchBinaryDataUrl(t,e={}){const o=String(t);if(this.binaryCache.has(o))return this.log("debug",`binary cache hit -> ${o}`),this.binaryCache.get(o);const n=await this.fetchResponse(o,e);if(!n.ok)throw this.log("warn",`binary fetch failed ${n.status} -> ${o}`),new Error(`HTTP ${n.status} while fetching ${o}`);const s=await I(n),a=s.kind==="text"?`data:${s.contentType||"text/plain;charset=utf-8"},${encodeURIComponent(s.value)}`:q(s.value,s.contentType||"application/octet-stream");return this.binaryCache.set(o,a),this.log("debug",`binary fetched (${s.kind==="text"?s.value.length:s.value.byteLength} units) -> ${o}`),a}async rewriteCss(t,e){let o=String(t);const n=[...o.matchAll(/@import\s+(?:url\()?\s*(['"]?)([^'")]+)\1\s*\)?([^;]*);/gi)];for(const u of n.reverse()){const l=u[2],i=(u[3]||"").trim(),y=b(l,e).toString();this.log("debug",`css @import ${l} -> ${y}`);const v=await this.fetchText(y),g=await this.rewriteCss(v,y),m=i?`${g}
/* media: ${i} */`:g;o=o.replace(u[0],m)}const s=[...o.matchAll(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi)],a=new Map;for(const u of s){const l=u[2].trim();if(l.startsWith("data:")||l.startsWith("blob:"))continue;const i=b(l,e).toString();this.log("debug",`css url() ${l} -> ${i}`),a.has(u[0])||a.set(u[0],await this.fetchBinaryDataUrl(i))}for(const[u,l]of a.entries())o=o.split(u).join(`url("${l}")`);return o}async rewriteHtml(t,e){const n=new DOMParser().parseFromString(String(t),"text/html"),s=n.documentElement,a=n.head||n.createElement("head"),u=n.body||n.createElement("body");for(const c of[...n.querySelectorAll("base")])c.remove();const l=n.createElement("base");l.href=e,a.prepend(l);const i=[...n.querySelectorAll('link[rel~="stylesheet"][href]')];for(const c of i)try{const d=b(c.getAttribute("href"),e).toString();this.log("debug",`stylesheet link -> ${d}`);const h=await this.fetchResponse(d),w=(h.headers.get("content-type")||"").toLowerCase();if(!w.includes("css"))throw new Error(`Blocked non-css stylesheet content-type: ${w||"unknown"}`);const $=await h.text(),p=await this.rewriteCss($,d),T=n.createElement("style");T.setAttribute("data-tor-source",d),T.textContent=p,c.replaceWith(T)}catch(d){this.log("warn",`stylesheet blocked -> ${String(d.message||d)}`);const h=n.createElement("style");h.textContent=`/* blocked stylesheet: ${String(d.message||d)} */`,c.replaceWith(h)}const y=[...n.querySelectorAll("style")];for(const c of y)try{c.textContent=await this.rewriteCss(c.textContent||"",e)}catch{}const v=["img[src]","audio[src]","video[src]","source[src]","track[src]","script[src]",'link[rel~="icon"][href]','link[rel~="apple-touch-icon"][href]'];for(const c of v){const d=[...n.querySelectorAll(c)];for(const h of d){const w=h.hasAttribute("src")?"src":h.hasAttribute("href")?"href":"data",$=h.getAttribute(w);if($)try{const p=b($,e).toString(),T=h.tagName.toLowerCase();if(T==="script"){this.log("debug",`script src -> ${p}`);const _=await this.fetchResponse(p),E=(_.headers.get("content-type")||"").toLowerCase();if(!E.includes("javascript")&&!E.includes("ecmascript")&&!E.includes("module"))throw new Error(`Blocked non-script content-type: ${E||"unknown"}`);const G=await _.text();h.removeAttribute("src"),h.setAttribute("data-tor-source",p),h.textContent=G;continue}this.log("debug",`${T} ${w} -> ${p}`);const z=await this.fetchBinaryDataUrl(p);h.setAttribute(w,z),h.setAttribute("data-tor-source",p)}catch(p){this.log("warn",`${h.tagName.toLowerCase()} blocked -> ${String(p.message||p)}`),h.removeAttribute(w),h.setAttribute("data-tor-blocked",String(p.message||p))}}}const g=[...n.querySelectorAll("a[href], area[href]")];for(const c of g){const d=c.getAttribute("href");try{const h=b(d,e).toString();this.log("debug",`link ${d} -> ${h}`),c.setAttribute("href",h)}catch{this.log("warn",`blocked link href -> ${d}`),c.removeAttribute("href"),c.setAttribute("data-tor-blocked","1")}}const m=[...n.querySelectorAll("form[action]")];for(const c of m){const d=c.getAttribute("action");try{const h=b(d||e,e).toString();this.log("debug",`form action ${d||"(empty)"} -> ${h}`),c.setAttribute("action",h)}catch{this.log("warn",`blocked form action -> ${d}`),c.setAttribute("action",e),c.setAttribute("data-tor-blocked","1")}}const S=[...n.querySelectorAll("[formaction]")];for(const c of S){const d=c.getAttribute("formaction");try{const h=b(d,e).toString();this.log("debug",`formaction ${d} -> ${h}`),c.setAttribute("formaction",h)}catch{this.log("warn",`blocked formaction -> ${d}`),c.removeAttribute("formaction")}}const V=[...n.querySelectorAll("iframe, object, embed")];for(const c of V){const d=n.createElement("div");d.setAttribute("data-tor-blocked-frame","1"),d.textContent=`${c.tagName.toLowerCase()} blocked by the sandboxed viewer.`,c.replaceWith(d),this.log("warn",`blocked embedded frame -> ${c.tagName.toLowerCase()}`)}if(!n.querySelector('link[rel~="icon"]')){const c=n.createElement("link");c.rel="icon",c.href="data:,",a.appendChild(c),this.log("debug","injected blank favicon to suppress browser fallback requests")}const U=n.createElement("script");return U.textContent=ct(e),u.appendChild(U),n.title||(n.title=new URL(e).hostname),this.log("debug",`html rewrite complete -> ${e}`),`<!doctype html>${s.outerHTML}`}async renderNonHtmlResponse(t,e){const o=t.headers.get("content-type")||"",n=await I(t);if(n.kind==="binary"&&o.startsWith("image/")){const a=q(n.value,o);return`
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            <base href="${x(e)}" />
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
            <img src="${a}" alt="${x(e)}" />
            <div class="meta">${x(e)}</div>
          </body>
        </html>
      `}const s=n.kind==="text"?n.value:new TextDecoder().decode(new Uint8Array(n.value));return`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <base href="${x(e)}" />
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
              <strong>HTTP ${t.status} ${t.statusText}</strong>
              <span>${x(e)}</span>
            </div>
            <pre>${x(s)}</pre>
          </div>
        </body>
      </html>
    `}}function ct(r){return`
    (() => {
      const BASE_URL = ${JSON.stringify(r)};
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
  `}const H="https://check.torproject.org/api/ip";function O(r){let t="";for(let o=0;o<r.length;o+=32768)t+=String.fromCharCode(...r.subarray(o,o+32768));return btoa(t)}function lt(r){if(!r)return new Uint8Array;const t=atob(r),e=new Uint8Array(t.length);for(let o=0;o<t.length;o+=1)e[o]=t.charCodeAt(o);return e}function N(r){return String(r).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}class dt{constructor(t){this.ui=t,this.client=null,this.fetcher=null,this.currentUrl=null,this.currentEntry=null,this.lastSuccessfulEntry=null,this.pendingNavigation=null,this.history=new J(e=>this.handlePopState(e)),this.ui.gatewayLabel.textContent=C()?B:"Set VITE_TOR_GATEWAY in your Cloudflare Pages environment",this.setConnectionState("Tor: idle","Waiting to bootstrap the Tor client.")}log(t,e){const n=`[${new Date().toISOString()}] [${t.toUpperCase()}] ${e}`;this.appendLog(n)}setConnectionState(t,e){this.ui.connectionState.textContent=t,this.ui.connectionDetail.textContent=e}async start(){this.bindEvents();const t=nt(window.location);if(t&&(this.ui.addressInput.value=t,this.log("info",`Detected launch target from page path -> ${t}`)),!C()){this.setConnectionState("Tor: gateway missing","Set VITE_TOR_GATEWAY before browsing onion sites."),this.log("warn","VITE_TOR_GATEWAY is missing."),this.appendLog("Set VITE_TOR_GATEWAY to an ip:port:certhash gateway before browsing onion sites."),this.showError("Tor gateway is not configured","Set VITE_TOR_GATEWAY to a Tor gateway address in the form ip:port:certhash, then rebuild and redeploy.");return}if(this.setConnectionState("Tor: connecting","Opening the browser client and connecting to the configured gateway."),await this.bootstrapTor(),t){this.setPageMessage("Launching onion site from the page path");try{await this.navigate(t,{replace:!0,quiet:!0})}catch{}return}const e=this.history.current();if(e!=null&&e.url){await this.navigate(e.url,{replace:!0,quiet:!0});return}this.setConnectionState("Tor: connected","The Tor client is ready for browsing."),this.setPageMessage("Ready"),this.log("info","Application ready.")}bindEvents(){this.ui.addressForm.addEventListener("submit",async t=>{t.preventDefault(),await this.navigate(this.ui.addressInput.value)}),this.ui.backButton.addEventListener("click",()=>window.history.back()),this.ui.forwardButton.addEventListener("click",()=>window.history.forward()),this.ui.reloadButton.addEventListener("click",()=>{this.currentEntry&&this.navigate(this.currentEntry.url,{replace:!0,method:this.currentEntry.method,body:this.currentEntry.body,headers:this.currentEntry.headers})}),this.ui.testButton.addEventListener("click",async()=>{await this.bootstrapTor(),await this.runTorCheck()}),this.ui.errorRetry.addEventListener("click",()=>{this.currentEntry&&this.navigate(this.currentEntry.url,{replace:!0,method:this.currentEntry.method,body:this.currentEntry.body,headers:this.currentEntry.headers})}),window.addEventListener("message",t=>{const e=t.data||{};if(e.__tor){if(t.source!==this.ui.viewer.contentWindow){this.log("warn","Ignored message from non-viewer source.");return}if(e.type==="navigate"){this.log("info",`Viewer navigation requested -> ${e.url}`),this.navigate(e.url);return}if(e.type==="submit"){this.log("info",`Viewer form submit -> ${e.method||"GET"} ${e.url}`),this.navigate(e.url,{method:e.method,headers:e.headers,body:e.body});return}e.type==="fetch"&&(this.log("debug",`Viewer fetch -> ${e.method||"GET"} ${e.url}`),this.handleIframeFetch(t,e))}})}async bootstrapTor(){return this.client?this.client:(this.setStatus("Bootstrapping Tor"),this.setPageMessage("Bootstrapping Tor client"),this.setLoading(!0),this.setConnectionState("Tor: starting","Loading the tor-js runtime and preparing bootstrap state."),this.log("info","Starting tor-js bootstrap..."),this.client=await Q({onLog:(t,e)=>{this.log(t,`tor-js: ${e}`),this.updateConnectionStateFromTorLog(e)}}),this.fetcher=new at(this.client,{debug:t=>this.log("debug",t),info:t=>this.log("info",t),warn:t=>this.log("warn",t),error:t=>this.log("error",t),log:t=>this.log("debug",t)}),this.setConnectionState("Tor: connected","Tor bootstrap completed and the client is ready."),this.setLoading(!1),this.log("info","Tor client is ready."),this.client)}updateConnectionStateFromTorLog(t){const e=String(t||"").toLowerCase();if(e.includes("fast bootstrap: fetching bootstrap.zip.zst")){this.setConnectionState("Tor: fetching directory snapshot","Downloading the fast bootstrap snapshot from the gateway.");return}if(e.includes("bootstrapping...")){this.setConnectionState("Tor: bootstrapping","Starting the Tor engine and loading bootstrap state.");return}if(e.includes("bootstrap complete")){this.setConnectionState("Tor: connected","Tor bootstrap completed and the client is ready.");return}e.includes("fetching ")&&e.includes("through tor")&&this.setConnectionState("Tor: connecting","A request is reaching the Tor network.")}async runTorCheck(){try{this.setPageMessage("Running Tor connectivity test"),this.setLoading(!0),this.log("info",`Running Tor connectivity test -> ${H}`);const t=await this.client.fetch(H),e=await t.json();this.showTextResponse("Tor connectivity test",`${t.status} ${t.statusText}`,JSON.stringify(e,null,2)),this.setStatus("Tor test completed"),this.log("info","Tor connectivity test completed successfully.")}catch(t){this.showError("Tor connectivity test failed",this.formatError(t)),this.log("error",`Tor connectivity test failed: ${this.formatError(t)}`)}finally{this.setLoading(!1)}}async navigate(t,e={}){var v;const{replace:o=!1,method:n="GET",body:s=null,headers:a={},quiet:u=!1}=e;let l;try{l=ot(t,((v=this.currentUrl)==null?void 0:v.toString())||"")}catch(g){this.log("warn",`Blocked navigation input "${t}": ${this.formatError(g)}`),this.showError("Invalid address",this.formatError(g)),this.setPageMessage("Navigation blocked");return}const i={url:l.toString(),method:n,body:s,headers:a};if(u||(this.ui.addressInput.value=i.url),this.pendingNavigation=i,this.setLoading(!0),this.setPageMessage(`Loading ${l.hostname}`),this.log("info",`Navigate -> ${i.method} ${i.url}`),this.hideError(),this.hideTextResponse(),this.showViewer(),this.currentUrl&&this.currentUrl.origin===l.origin&&this.currentUrl.pathname===l.pathname&&this.currentUrl.search===l.search&&this.currentUrl.hash!==l.hash){this.currentUrl=l,this.currentEntry=i,this.lastSuccessfulEntry=i,this.setStatus("Fragment updated"),this.setPageMessage(`Jumped to ${l.hash||"fragment"}`),this.setAddress(l.toString()),this.log("debug",`Fragment-only navigation completed -> ${l.toString()}`),o?this.history.replace(i):this.history.push(i),this.setLoading(!1),this.pendingNavigation=null;return}try{await this.bootstrapTor();const g=await this.client.fetch(i.url,{method:i.method,body:i.body,headers:i.headers}),m=g.url||i.url,S=new URL(m);if(this.log("debug",`Response received -> ${g.status} ${g.statusText} ${m}`),S.hostname&&!S.hostname.endsWith(".onion"))throw this.log("error",`Blocked redirect to non-onion destination -> ${m}`),new Error("Redirected to a non-onion destination, which is blocked.");this.currentUrl=S,this.currentEntry=i,this.lastSuccessfulEntry=i,this.setStatus(`HTTP ${g.status}`),this.setPageMessage(`Loaded ${S.hostname}`),this.setAddress(m),o?this.history.replace(i):this.history.push(i),await this.renderResponse(g,i.url)}catch(g){this.showError("Unable to load page",this.formatError(g)),this.setStatus("Load failed"),this.setPageMessage("Navigation failed"),this.log("error",`Navigation failed for ${i.url}: ${this.formatError(g)}`)}finally{this.setLoading(!1),this.pendingNavigation=null}}async renderResponse(t,e){const o=t.headers.get("content-type")||"",n=o.toLowerCase();if(n.includes("text/html")){const a=await t.text();this.log("debug",`Rendering HTML response (${a.length} chars) from ${t.url||e}`);try{const u=await this.fetcher.rewriteHtml(a,t.url||e);this.showViewerHtml(u);return}catch(u){throw this.log("error",`HTML rewrite failed for ${t.url||e}: ${this.formatError(u)}`),u}}if(n.startsWith("text/")||n.includes("json")||n.includes("xml")||n.includes("javascript")){const a=await t.text();this.log("debug",`Rendering text response (${a.length} chars) from ${t.url||e}`),this.showTextResponse(M(t.url||e),`HTTP ${t.status} ${t.statusText}`,a);return}if(n.startsWith("image/")){const a=await t.arrayBuffer().then(u=>`data:${o};base64,${O(new Uint8Array(u))}`);this.log("debug",`Rendering image response from ${t.url||e}`),this.showImageResponse(a,t.url||e);return}const s=await t.arrayBuffer();this.log("debug",`Rendering binary response (${s.byteLength} bytes, ${o||"unknown"}) from ${t.url||e}`),this.showTextResponse(M(t.url||e),`HTTP ${t.status} ${t.statusText}`,`Binary response received (${s.byteLength} bytes, ${o||"unknown type"}).`)}async handleIframeFetch(t,e){var o,n;try{this.log("debug",`Iframe bridge fetch start -> ${e.method||"GET"} ${e.url}`);const s=await this.client.fetch(e.url,{method:e.method,headers:e.headers,body:e.body?lt(e.body):void 0}),a={};s.headers.forEach((i,y)=>{a[y]=i});const u=await s.arrayBuffer(),l=O(new Uint8Array(u));this.log("debug",`Iframe bridge fetch complete -> ${s.status} ${s.statusText} ${e.url}`),(o=t.source)==null||o.postMessage({__tor:!0,type:"reply",id:e.id,ok:!0,value:{status:s.status,statusText:s.statusText,headers:a,bodyBase64:l}},"*")}catch(s){this.log("error",`Iframe bridge fetch failed -> ${e.url}: ${this.formatError(s)}`),(n=t.source)==null||n.postMessage({__tor:!0,type:"reply",id:e.id,ok:!1,error:this.formatError(s)},"*")}}handlePopState(t){t!=null&&t.url&&(this.log("info",`History popstate -> ${t.url}`),this.navigate(t.url,{replace:!0,method:t.method||"GET",body:t.body||null,headers:t.headers||{},quiet:!0}))}setStatus(t){this.ui.status.textContent=t}setPageMessage(t){this.ui.pageStatus.textContent=t}setAddress(t){this.ui.pageUrl.textContent=t,this.ui.addressInput.value=t}setLoading(t){this.ui.spinner.classList.toggle("is-visible",t)}showError(t,e){this.ui.errorTitle.textContent=t,this.ui.errorMessage.textContent=e,this.ui.errorCard.hidden=!1,this.ui.viewer.hidden=!0,this.ui.textView.hidden=!0,this.ui.hero.hidden=!0}hideError(){this.ui.errorCard.hidden=!0}hideTextResponse(){this.ui.textView.hidden=!0}showTextResponse(t,e,o){this.ui.textTitle.textContent=t,this.ui.textMeta.textContent=e,this.ui.textOutput.textContent=o,this.ui.textView.hidden=!1,this.ui.viewer.hidden=!0,this.ui.hero.hidden=!0,this.hideError()}showImageResponse(t,e){this.showViewerHtml(`
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
          <img src="${t}" alt="${N(e)}" />
          <div class="meta">${N(e)}</div>
        </body>
      </html>
    `)}showViewerHtml(t){this.ui.viewer.srcdoc=t,this.ui.viewer.hidden=!1,this.ui.textView.hidden=!0,this.ui.hero.hidden=!0,this.hideError()}showViewer(){this.ui.viewer.hidden=!1,this.ui.hero.hidden=!0,this.ui.textView.hidden=!0}appendLog(t){const e=this.ui.logOutput.textContent||"";this.ui.logOutput.textContent=e?`${e}
${t}`:t,this.ui.logOutput.scrollTop=this.ui.logOutput.scrollHeight}formatError(t){return t?typeof t=="string"?t:t.message||String(t):"Unknown error"}}const ht=document.getElementById("app"),W=Y(ht),ut=new dt(W);W.addressInput.value="http://exampleabcdef1234567890abcdef1234567890abcdef1234567890abcdef.onion/";ut.start();
