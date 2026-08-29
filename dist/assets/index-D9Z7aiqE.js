(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function e(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=e(o);fetch(o.href,n)}})();function z(r){return r.innerHTML=`
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
  `,{root:r,status:r.querySelector("[data-status]"),gatewayLabel:r.querySelector("[data-gateway-label]"),testButton:r.querySelector("[data-test-button]"),backButton:r.querySelector("[data-back-button]"),forwardButton:r.querySelector("[data-forward-button]"),reloadButton:r.querySelector("[data-reload-button]"),addressForm:r.querySelector("[data-address-form]"),addressInput:r.querySelector("[data-address-input]"),pageStatus:r.querySelector("[data-page-status]"),pageUrl:r.querySelector("[data-page-url]"),spinner:r.querySelector("[data-spinner]"),hero:r.querySelector("[data-hero]"),viewer:r.querySelector("[data-viewer]"),textView:r.querySelector("[data-text-view]"),textTitle:r.querySelector("[data-text-title]"),textMeta:r.querySelector("[data-text-meta]"),textOutput:r.querySelector("[data-text-output]"),errorCard:r.querySelector("[data-error-card]"),errorTitle:r.querySelector("[data-error-title]"),errorMessage:r.querySelector("[data-error-message]"),errorRetry:r.querySelector("[data-error-retry]"),logOutput:r.querySelector("[data-log-output]")}}class Y{constructor(t){this.onPopState=t,window.addEventListener("popstate",e=>{var s;(s=this.onPopState)==null||s.call(this,e.state||null)})}replace(t){const e={...t};window.history.replaceState(e,"",e.url)}push(t){const e={...t};window.history.pushState(e,"",e.url)}current(){return window.history.state||null}}const J="https://cdn.jsdelivr.net/npm/tor-js@0.4.1/dist/entryPoints/wasm-cdn/index.js",C="".trim();let k=null,L=null,A=null;function X(r){try{if(typeof indexedDB<"u")return new r.IndexedDBStorage("onion-browser")}catch{}return new r.MemoryStorage}async function Z(){return A||(A=import(J)),A}function R(){return C.length>0}async function K({onLog:r}={}){return L||(k||(k=(async()=>{if(!R())throw new Error("Tor gateway is not configured. Set VITE_TOR_GATEWAY to an ip:port:certhash gateway address.");const{Log:t,TorClient:e,storage:s}=await Z(),o=new t({rawLog:(c,...u)=>{const l=u.map(a=>{if(typeof a=="string")return a;try{return JSON.stringify(a)}catch{return String(a)}}).join(" ");r==null||r(c,l)}}),n=new e({gateway:C,storage:X(s),log:o,logLevel:"info"});return await n.ready(),L=n,n})()),k)}const N=".onion";function Q(r){return/^(?:\d{1,3}\.){3}\d{1,3}$/.test(r)}function f(r){return r.split(".").map(t=>Number(t)).reduce((t,e)=>(t<<8|e&255)>>>0,0)}function tt(r){if(!Q(r))return!1;const t=f(r);return[[f("10.0.0.0"),f("10.255.255.255")],[f("127.0.0.0"),f("127.255.255.255")],[f("172.16.0.0"),f("172.31.255.255")],[f("192.168.0.0"),f("192.168.255.255")],[f("169.254.0.0"),f("169.254.255.255")],[f("100.64.0.0"),f("100.127.255.255")]].some(([s,o])=>t>=s&&t<=o)}function et(r){return r==="localhost"||r==="localhost.localdomain"||r==="localtest.me"||r.endsWith(".localhost")}function _(r){return/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(r)}function j(r){return r.toLowerCase().endsWith(N)}function F(r){if(!r)return!0;const t=r.toLowerCase();return!!(et(t)||tt(t))}function rt(r,t=""){const e=String(r??"").trim();if(!e)throw new Error("Enter a URL first.");return t?new URL(e,t):!_(e)&&e.includes(N)?new URL(`https://${e}`):!_(e)&&/^[^\s/]+\.[^\s/]+/.test(e)?new URL(`https://${e}`):new URL(e)}function ot(r,t=""){let e;try{e=rt(r,t)}catch{throw new Error("Enter a valid HTTP or HTTPS .onion URL.")}if(e.protocol!=="http:"&&e.protocol!=="https:")throw new Error("Only HTTP and HTTPS URLs are supported.");if(!j(e.hostname))throw new Error("Only .onion hostnames are allowed.");if(F(e.hostname))throw new Error("That hostname is blocked by the browser policy.");if(e.username||e.password)throw new Error("Credentials in URLs are not supported.");return e}function b(r,t){if(!r)throw new Error("Missing URL.");const e=new URL(String(r),t);if(e.protocol!=="http:"&&e.protocol!=="https:")throw new Error("Blocked non-HTTP URL.");if(!j(e.hostname))throw new Error("Blocked non-onion URL.");if(F(e.hostname))throw new Error("Blocked local or private destination.");return e}function M(r){return new URL(r).toString()}function st(r){let t="";for(let s=0;s<r.length;s+=32768)t+=String.fromCharCode(...r.subarray(s,s+32768));return btoa(t)}function P(r,t="application/octet-stream"){const e=new Uint8Array(r);return`data:${t};base64,${st(e)}`}function nt(r){return/^(text\/|application\/(json|xml|javascript|xhtml\+xml))/i.test(r)}function T(r){return String(r).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}async function q(r){const t=r.headers.get("content-type")||"";return nt(t)?{kind:"text",contentType:t,value:await r.text()}:{kind:"binary",contentType:t,value:await r.arrayBuffer()}}class at{constructor(t,e=null){this.client=t,this.logger=e,this.binaryCache=new Map,this.textCache=new Map}log(t,e){if(!this.logger)return;const s=this.logger[t]||this.logger.log;typeof s=="function"&&s.call(this.logger,e)}async fetchResponse(t,e={}){return this.log("debug",`fetch -> ${t}`),this.client.fetch(t,e)}async fetchText(t,e={}){const s=String(t);if(this.textCache.has(s))return this.log("debug",`text cache hit -> ${s}`),this.textCache.get(s);const o=await this.fetchResponse(s,e);if(!o.ok)throw this.log("warn",`text fetch failed ${o.status} -> ${s}`),new Error(`HTTP ${o.status} while fetching ${s}`);const n=await o.text();return this.textCache.set(s,n),this.log("debug",`text fetched (${n.length} chars) -> ${s}`),n}async fetchBinaryDataUrl(t,e={}){const s=String(t);if(this.binaryCache.has(s))return this.log("debug",`binary cache hit -> ${s}`),this.binaryCache.get(s);const o=await this.fetchResponse(s,e);if(!o.ok)throw this.log("warn",`binary fetch failed ${o.status} -> ${s}`),new Error(`HTTP ${o.status} while fetching ${s}`);const n=await q(o),c=n.kind==="text"?`data:${n.contentType||"text/plain;charset=utf-8"},${encodeURIComponent(n.value)}`:P(n.value,n.contentType||"application/octet-stream");return this.binaryCache.set(s,c),this.log("debug",`binary fetched (${n.kind==="text"?n.value.length:n.value.byteLength} units) -> ${s}`),c}async rewriteCss(t,e){let s=String(t);const o=[...s.matchAll(/@import\s+(?:url\()?\s*(['"]?)([^'")]+)\1\s*\)?([^;]*);/gi)];for(const u of o.reverse()){const l=u[2],a=(u[3]||"").trim(),y=b(l,e).toString();this.log("debug",`css @import ${l} -> ${y}`);const v=await this.fetchText(y),g=await this.rewriteCss(v,y),m=a?`${g}
/* media: ${a} */`:g;s=s.replace(u[0],m)}const n=[...s.matchAll(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi)],c=new Map;for(const u of n){const l=u[2].trim();if(l.startsWith("data:")||l.startsWith("blob:"))continue;const a=b(l,e).toString();this.log("debug",`css url() ${l} -> ${a}`),c.has(u[0])||c.set(u[0],await this.fetchBinaryDataUrl(a))}for(const[u,l]of c.entries())s=s.split(u).join(`url("${l}")`);return s}async rewriteHtml(t,e){const o=new DOMParser().parseFromString(String(t),"text/html"),n=o.documentElement,c=o.head||o.createElement("head"),u=o.body||o.createElement("body");for(const i of[...o.querySelectorAll("base")])i.remove();const l=o.createElement("base");l.href=e,c.prepend(l);const a=[...o.querySelectorAll('link[rel~="stylesheet"][href]')];for(const i of a)try{const d=b(i.getAttribute("href"),e).toString();this.log("debug",`stylesheet link -> ${d}`);const h=await this.fetchResponse(d),w=(h.headers.get("content-type")||"").toLowerCase();if(!w.includes("css"))throw new Error(`Blocked non-css stylesheet content-type: ${w||"unknown"}`);const $=await h.text(),p=await this.rewriteCss($,d),S=o.createElement("style");S.setAttribute("data-tor-source",d),S.textContent=p,i.replaceWith(S)}catch(d){this.log("warn",`stylesheet blocked -> ${String(d.message||d)}`);const h=o.createElement("style");h.textContent=`/* blocked stylesheet: ${String(d.message||d)} */`,i.replaceWith(h)}const y=[...o.querySelectorAll("style")];for(const i of y)try{i.textContent=await this.rewriteCss(i.textContent||"",e)}catch{}const v=["img[src]","audio[src]","video[src]","source[src]","track[src]","script[src]",'link[rel~="icon"][href]','link[rel~="apple-touch-icon"][href]'];for(const i of v){const d=[...o.querySelectorAll(i)];for(const h of d){const w=h.hasAttribute("src")?"src":h.hasAttribute("href")?"href":"data",$=h.getAttribute(w);if($)try{const p=b($,e).toString(),S=h.tagName.toLowerCase();if(S==="script"){this.log("debug",`script src -> ${p}`);const U=await this.fetchResponse(p),E=(U.headers.get("content-type")||"").toLowerCase();if(!E.includes("javascript")&&!E.includes("ecmascript")&&!E.includes("module"))throw new Error(`Blocked non-script content-type: ${E||"unknown"}`);const G=await U.text();h.removeAttribute("src"),h.setAttribute("data-tor-source",p),h.textContent=G;continue}this.log("debug",`${S} ${w} -> ${p}`);const V=await this.fetchBinaryDataUrl(p);h.setAttribute(w,V),h.setAttribute("data-tor-source",p)}catch(p){this.log("warn",`${h.tagName.toLowerCase()} blocked -> ${String(p.message||p)}`),h.removeAttribute(w),h.setAttribute("data-tor-blocked",String(p.message||p))}}}const g=[...o.querySelectorAll("a[href], area[href]")];for(const i of g){const d=i.getAttribute("href");try{const h=b(d,e).toString();this.log("debug",`link ${d} -> ${h}`),i.setAttribute("href",h)}catch{this.log("warn",`blocked link href -> ${d}`),i.removeAttribute("href"),i.setAttribute("data-tor-blocked","1")}}const m=[...o.querySelectorAll("form[action]")];for(const i of m){const d=i.getAttribute("action");try{const h=b(d||e,e).toString();this.log("debug",`form action ${d||"(empty)"} -> ${h}`),i.setAttribute("action",h)}catch{this.log("warn",`blocked form action -> ${d}`),i.setAttribute("action",e),i.setAttribute("data-tor-blocked","1")}}const x=[...o.querySelectorAll("[formaction]")];for(const i of x){const d=i.getAttribute("formaction");try{const h=b(d,e).toString();this.log("debug",`formaction ${d} -> ${h}`),i.setAttribute("formaction",h)}catch{this.log("warn",`blocked formaction -> ${d}`),i.removeAttribute("formaction")}}const W=[...o.querySelectorAll("iframe, object, embed")];for(const i of W){const d=o.createElement("div");d.setAttribute("data-tor-blocked-frame","1"),d.textContent=`${i.tagName.toLowerCase()} blocked by the sandboxed viewer.`,i.replaceWith(d),this.log("warn",`blocked embedded frame -> ${i.tagName.toLowerCase()}`)}if(!o.querySelector('link[rel~="icon"]')){const i=o.createElement("link");i.rel="icon",i.href="data:,",c.appendChild(i),this.log("debug","injected blank favicon to suppress browser fallback requests")}const B=o.createElement("script");return B.textContent=it(e),u.appendChild(B),o.title||(o.title=new URL(e).hostname),this.log("debug",`html rewrite complete -> ${e}`),`<!doctype html>${n.outerHTML}`}async renderNonHtmlResponse(t,e){const s=t.headers.get("content-type")||"",o=await q(t);if(o.kind==="binary"&&s.startsWith("image/")){const c=P(o.value,s);return`
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            <base href="${T(e)}" />
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
            <img src="${c}" alt="${T(e)}" />
            <div class="meta">${T(e)}</div>
          </body>
        </html>
      `}const n=o.kind==="text"?o.value:new TextDecoder().decode(new Uint8Array(o.value));return`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <base href="${T(e)}" />
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
              <span>${T(e)}</span>
            </div>
            <pre>${T(n)}</pre>
          </div>
        </body>
      </html>
    `}}function it(r){return`
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
  `}const H="https://check.torproject.org/api/ip";function I(r){let t="";for(let s=0;s<r.length;s+=32768)t+=String.fromCharCode(...r.subarray(s,s+32768));return btoa(t)}function ct(r){if(!r)return new Uint8Array;const t=atob(r),e=new Uint8Array(t.length);for(let s=0;s<t.length;s+=1)e[s]=t.charCodeAt(s);return e}function O(r){return String(r).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}class lt{constructor(t){this.ui=t,this.client=null,this.fetcher=null,this.currentUrl=null,this.currentEntry=null,this.lastSuccessfulEntry=null,this.pendingNavigation=null,this.history=new Y(e=>this.handlePopState(e)),this.ui.gatewayLabel.textContent=R()?C:"Set VITE_TOR_GATEWAY in your Cloudflare Pages environment"}log(t,e){const o=`[${new Date().toISOString()}] [${t.toUpperCase()}] ${e}`;this.appendLog(o)}async start(){if(this.bindEvents(),!R()){this.setStatus("Gateway not configured"),this.log("warn","VITE_TOR_GATEWAY is missing."),this.appendLog("Set VITE_TOR_GATEWAY to an ip:port:certhash gateway before browsing onion sites."),this.showError("Tor gateway is not configured","Set VITE_TOR_GATEWAY to a Tor gateway address in the form ip:port:certhash, then rebuild and redeploy.");return}await this.bootstrapTor();const t=this.history.current();if(t!=null&&t.url){await this.navigate(t.url,{replace:!0,quiet:!0});return}this.setStatus("Tor connected"),this.setPageMessage("Ready"),this.log("info","Application ready.")}bindEvents(){this.ui.addressForm.addEventListener("submit",async t=>{t.preventDefault(),await this.navigate(this.ui.addressInput.value)}),this.ui.backButton.addEventListener("click",()=>window.history.back()),this.ui.forwardButton.addEventListener("click",()=>window.history.forward()),this.ui.reloadButton.addEventListener("click",()=>{this.currentEntry&&this.navigate(this.currentEntry.url,{replace:!0,method:this.currentEntry.method,body:this.currentEntry.body,headers:this.currentEntry.headers})}),this.ui.testButton.addEventListener("click",async()=>{await this.bootstrapTor(),await this.runTorCheck()}),this.ui.errorRetry.addEventListener("click",()=>{this.currentEntry&&this.navigate(this.currentEntry.url,{replace:!0,method:this.currentEntry.method,body:this.currentEntry.body,headers:this.currentEntry.headers})}),window.addEventListener("message",t=>{const e=t.data||{};if(e.__tor){if(t.source!==this.ui.viewer.contentWindow){this.log("warn","Ignored message from non-viewer source.");return}if(e.type==="navigate"){this.log("info",`Viewer navigation requested -> ${e.url}`),this.navigate(e.url);return}if(e.type==="submit"){this.log("info",`Viewer form submit -> ${e.method||"GET"} ${e.url}`),this.navigate(e.url,{method:e.method,headers:e.headers,body:e.body});return}e.type==="fetch"&&(this.log("debug",`Viewer fetch -> ${e.method||"GET"} ${e.url}`),this.handleIframeFetch(t,e))}})}async bootstrapTor(){return this.client?this.client:(this.setStatus("Bootstrapping Tor"),this.setPageMessage("Bootstrapping Tor client"),this.setLoading(!0),this.log("info","Starting tor-js bootstrap..."),this.client=await K({onLog:(t,e)=>{this.log(t,`tor-js: ${e}`)}}),this.fetcher=new at(this.client,{debug:t=>this.log("debug",t),info:t=>this.log("info",t),warn:t=>this.log("warn",t),error:t=>this.log("error",t),log:t=>this.log("debug",t)}),this.setStatus("Tor connected"),this.setLoading(!1),this.log("info","Tor client is ready."),this.client)}async runTorCheck(){try{this.setPageMessage("Running Tor connectivity test"),this.setLoading(!0),this.log("info",`Running Tor connectivity test -> ${H}`);const t=await this.client.fetch(H),e=await t.json();this.showTextResponse("Tor connectivity test",`${t.status} ${t.statusText}`,JSON.stringify(e,null,2)),this.setStatus("Tor test completed"),this.log("info","Tor connectivity test completed successfully.")}catch(t){this.showError("Tor connectivity test failed",this.formatError(t)),this.log("error",`Tor connectivity test failed: ${this.formatError(t)}`)}finally{this.setLoading(!1)}}async navigate(t,e={}){var v;const{replace:s=!1,method:o="GET",body:n=null,headers:c={},quiet:u=!1}=e;let l;try{l=ot(t,((v=this.currentUrl)==null?void 0:v.toString())||"")}catch(g){this.log("warn",`Blocked navigation input "${t}": ${this.formatError(g)}`),this.showError("Invalid address",this.formatError(g)),this.setPageMessage("Navigation blocked");return}const a={url:l.toString(),method:o,body:n,headers:c};if(u||(this.ui.addressInput.value=a.url),this.pendingNavigation=a,this.setLoading(!0),this.setPageMessage(`Loading ${l.hostname}`),this.log("info",`Navigate -> ${a.method} ${a.url}`),this.hideError(),this.hideTextResponse(),this.showViewer(),this.currentUrl&&this.currentUrl.origin===l.origin&&this.currentUrl.pathname===l.pathname&&this.currentUrl.search===l.search&&this.currentUrl.hash!==l.hash){this.currentUrl=l,this.currentEntry=a,this.lastSuccessfulEntry=a,this.setStatus("Fragment updated"),this.setPageMessage(`Jumped to ${l.hash||"fragment"}`),this.setAddress(l.toString()),this.log("debug",`Fragment-only navigation completed -> ${l.toString()}`),s?this.history.replace(a):this.history.push(a),this.setLoading(!1),this.pendingNavigation=null;return}try{await this.bootstrapTor();const g=await this.client.fetch(a.url,{method:a.method,body:a.body,headers:a.headers}),m=g.url||a.url,x=new URL(m);if(this.log("debug",`Response received -> ${g.status} ${g.statusText} ${m}`),x.hostname&&!x.hostname.endsWith(".onion"))throw this.log("error",`Blocked redirect to non-onion destination -> ${m}`),new Error("Redirected to a non-onion destination, which is blocked.");this.currentUrl=x,this.currentEntry=a,this.lastSuccessfulEntry=a,this.setStatus(`HTTP ${g.status}`),this.setPageMessage(`Loaded ${x.hostname}`),this.setAddress(m),s?this.history.replace(a):this.history.push(a),await this.renderResponse(g,a.url)}catch(g){this.showError("Unable to load page",this.formatError(g)),this.setStatus("Load failed"),this.setPageMessage("Navigation failed"),this.log("error",`Navigation failed for ${a.url}: ${this.formatError(g)}`)}finally{this.setLoading(!1),this.pendingNavigation=null}}async renderResponse(t,e){const s=t.headers.get("content-type")||"",o=s.toLowerCase();if(o.includes("text/html")){const c=await t.text();this.log("debug",`Rendering HTML response (${c.length} chars) from ${t.url||e}`);try{const u=await this.fetcher.rewriteHtml(c,t.url||e);this.showViewerHtml(u);return}catch(u){throw this.log("error",`HTML rewrite failed for ${t.url||e}: ${this.formatError(u)}`),u}}if(o.startsWith("text/")||o.includes("json")||o.includes("xml")||o.includes("javascript")){const c=await t.text();this.log("debug",`Rendering text response (${c.length} chars) from ${t.url||e}`),this.showTextResponse(M(t.url||e),`HTTP ${t.status} ${t.statusText}`,c);return}if(o.startsWith("image/")){const c=await t.arrayBuffer().then(u=>`data:${s};base64,${I(new Uint8Array(u))}`);this.log("debug",`Rendering image response from ${t.url||e}`),this.showImageResponse(c,t.url||e);return}const n=await t.arrayBuffer();this.log("debug",`Rendering binary response (${n.byteLength} bytes, ${s||"unknown"}) from ${t.url||e}`),this.showTextResponse(M(t.url||e),`HTTP ${t.status} ${t.statusText}`,`Binary response received (${n.byteLength} bytes, ${s||"unknown type"}).`)}async handleIframeFetch(t,e){var s,o;try{this.log("debug",`Iframe bridge fetch start -> ${e.method||"GET"} ${e.url}`);const n=await this.client.fetch(e.url,{method:e.method,headers:e.headers,body:e.body?ct(e.body):void 0}),c={};n.headers.forEach((a,y)=>{c[y]=a});const u=await n.arrayBuffer(),l=I(new Uint8Array(u));this.log("debug",`Iframe bridge fetch complete -> ${n.status} ${n.statusText} ${e.url}`),(s=t.source)==null||s.postMessage({__tor:!0,type:"reply",id:e.id,ok:!0,value:{status:n.status,statusText:n.statusText,headers:c,bodyBase64:l}},"*")}catch(n){this.log("error",`Iframe bridge fetch failed -> ${e.url}: ${this.formatError(n)}`),(o=t.source)==null||o.postMessage({__tor:!0,type:"reply",id:e.id,ok:!1,error:this.formatError(n)},"*")}}handlePopState(t){t!=null&&t.url&&(this.log("info",`History popstate -> ${t.url}`),this.navigate(t.url,{replace:!0,method:t.method||"GET",body:t.body||null,headers:t.headers||{},quiet:!0}))}setStatus(t){this.ui.status.textContent=t}setPageMessage(t){this.ui.pageStatus.textContent=t}setAddress(t){this.ui.pageUrl.textContent=t,this.ui.addressInput.value=t}setLoading(t){this.ui.spinner.classList.toggle("is-visible",t)}showError(t,e){this.ui.errorTitle.textContent=t,this.ui.errorMessage.textContent=e,this.ui.errorCard.hidden=!1,this.ui.viewer.hidden=!0,this.ui.textView.hidden=!0,this.ui.hero.hidden=!0}hideError(){this.ui.errorCard.hidden=!0}hideTextResponse(){this.ui.textView.hidden=!0}showTextResponse(t,e,s){this.ui.textTitle.textContent=t,this.ui.textMeta.textContent=e,this.ui.textOutput.textContent=s,this.ui.textView.hidden=!1,this.ui.viewer.hidden=!0,this.ui.hero.hidden=!0,this.hideError()}showImageResponse(t,e){this.showViewerHtml(`
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
          <img src="${t}" alt="${O(e)}" />
          <div class="meta">${O(e)}</div>
        </body>
      </html>
    `)}showViewerHtml(t){this.ui.viewer.srcdoc=t,this.ui.viewer.hidden=!1,this.ui.textView.hidden=!0,this.ui.hero.hidden=!0,this.hideError()}showViewer(){this.ui.viewer.hidden=!1,this.ui.hero.hidden=!0,this.ui.textView.hidden=!0}appendLog(t){const e=this.ui.logOutput.textContent||"";this.ui.logOutput.textContent=e?`${e}
${t}`:t,this.ui.logOutput.scrollTop=this.ui.logOutput.scrollHeight}formatError(t){return t?typeof t=="string"?t:t.message||String(t):"Unknown error"}}const dt=document.getElementById("app"),D=z(dt),ht=new lt(D);D.addressInput.value="http://exampleabcdef1234567890abcdef1234567890abcdef1234567890abcdef.onion/";ht.start();
