var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// .wrangler/tmp/bundle-DCrqMO/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init2) {
  const request = new Request(input, init2);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
var init_strip_cf_connecting_ip_header = __esm({
  ".wrangler/tmp/bundle-DCrqMO/strip-cf-connecting-ip-header.js"() {
    "use strict";
    __name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        return Reflect.apply(target, thisArg, [
          stripCfConnectingIPHeader.apply(null, argArray)
        ]);
      }
    });
  }
});

// node_modules/unenv/dist/runtime/_internal/utils.mjs
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
function notImplementedAsync(name) {
  const fn = notImplemented(name);
  fn.__promisify__ = () => notImplemented(name + ".__promisify__");
  fn.native = fn;
  return fn;
}
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
var init_utils = __esm({
  "node_modules/unenv/dist/runtime/_internal/utils.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(createNotImplementedError, "createNotImplementedError");
    __name(notImplemented, "notImplemented");
    __name(notImplementedAsync, "notImplementedAsync");
    __name(notImplementedClass, "notImplementedClass");
  }
});

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin, _performanceNow, nodeTiming, PerformanceEntry, PerformanceMark, PerformanceMeasure, PerformanceResourceTiming, PerformanceObserverEntryList, Performance, PerformanceObserver, performance;
var init_performance = __esm({
  "node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
    _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
    nodeTiming = {
      name: "node",
      entryType: "node",
      startTime: 0,
      duration: 0,
      nodeStart: 0,
      v8Start: 0,
      bootstrapComplete: 0,
      environment: 0,
      loopStart: 0,
      loopExit: 0,
      idleTime: 0,
      uvMetricsInfo: {
        loopCount: 0,
        events: 0,
        eventsWaiting: 0
      },
      detail: void 0,
      toJSON() {
        return this;
      }
    };
    PerformanceEntry = class {
      __unenv__ = true;
      detail;
      entryType = "event";
      name;
      startTime;
      constructor(name, options) {
        this.name = name;
        this.startTime = options?.startTime || _performanceNow();
        this.detail = options?.detail;
      }
      get duration() {
        return _performanceNow() - this.startTime;
      }
      toJSON() {
        return {
          name: this.name,
          entryType: this.entryType,
          startTime: this.startTime,
          duration: this.duration,
          detail: this.detail
        };
      }
    };
    __name(PerformanceEntry, "PerformanceEntry");
    PerformanceMark = /* @__PURE__ */ __name(class PerformanceMark2 extends PerformanceEntry {
      entryType = "mark";
      constructor() {
        super(...arguments);
      }
      get duration() {
        return 0;
      }
    }, "PerformanceMark");
    PerformanceMeasure = class extends PerformanceEntry {
      entryType = "measure";
    };
    __name(PerformanceMeasure, "PerformanceMeasure");
    PerformanceResourceTiming = class extends PerformanceEntry {
      entryType = "resource";
      serverTiming = [];
      connectEnd = 0;
      connectStart = 0;
      decodedBodySize = 0;
      domainLookupEnd = 0;
      domainLookupStart = 0;
      encodedBodySize = 0;
      fetchStart = 0;
      initiatorType = "";
      name = "";
      nextHopProtocol = "";
      redirectEnd = 0;
      redirectStart = 0;
      requestStart = 0;
      responseEnd = 0;
      responseStart = 0;
      secureConnectionStart = 0;
      startTime = 0;
      transferSize = 0;
      workerStart = 0;
      responseStatus = 0;
    };
    __name(PerformanceResourceTiming, "PerformanceResourceTiming");
    PerformanceObserverEntryList = class {
      __unenv__ = true;
      getEntries() {
        return [];
      }
      getEntriesByName(_name, _type) {
        return [];
      }
      getEntriesByType(type2) {
        return [];
      }
    };
    __name(PerformanceObserverEntryList, "PerformanceObserverEntryList");
    Performance = class {
      __unenv__ = true;
      timeOrigin = _timeOrigin;
      eventCounts = /* @__PURE__ */ new Map();
      _entries = [];
      _resourceTimingBufferSize = 0;
      navigation = void 0;
      timing = void 0;
      timerify(_fn, _options) {
        throw createNotImplementedError("Performance.timerify");
      }
      get nodeTiming() {
        return nodeTiming;
      }
      eventLoopUtilization() {
        return {};
      }
      markResourceTiming() {
        return new PerformanceResourceTiming("");
      }
      onresourcetimingbufferfull = null;
      now() {
        if (this.timeOrigin === _timeOrigin) {
          return _performanceNow();
        }
        return Date.now() - this.timeOrigin;
      }
      clearMarks(markName) {
        this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
      }
      clearMeasures(measureName) {
        this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
      }
      clearResourceTimings() {
        this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
      }
      getEntries() {
        return this._entries;
      }
      getEntriesByName(name, type2) {
        return this._entries.filter((e) => e.name === name && (!type2 || e.entryType === type2));
      }
      getEntriesByType(type2) {
        return this._entries.filter((e) => e.entryType === type2);
      }
      mark(name, options) {
        const entry = new PerformanceMark(name, options);
        this._entries.push(entry);
        return entry;
      }
      measure(measureName, startOrMeasureOptions, endMark) {
        let start;
        let end;
        if (typeof startOrMeasureOptions === "string") {
          start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
          end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
        } else {
          start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
          end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
        }
        const entry = new PerformanceMeasure(measureName, {
          startTime: start,
          detail: {
            start,
            end
          }
        });
        this._entries.push(entry);
        return entry;
      }
      setResourceTimingBufferSize(maxSize) {
        this._resourceTimingBufferSize = maxSize;
      }
      addEventListener(type2, listener, options) {
        throw createNotImplementedError("Performance.addEventListener");
      }
      removeEventListener(type2, listener, options) {
        throw createNotImplementedError("Performance.removeEventListener");
      }
      dispatchEvent(event) {
        throw createNotImplementedError("Performance.dispatchEvent");
      }
      toJSON() {
        return this;
      }
    };
    __name(Performance, "Performance");
    PerformanceObserver = class {
      __unenv__ = true;
      _callback = null;
      constructor(callback) {
        this._callback = callback;
      }
      takeRecords() {
        return [];
      }
      disconnect() {
        throw createNotImplementedError("PerformanceObserver.disconnect");
      }
      observe(options) {
        throw createNotImplementedError("PerformanceObserver.observe");
      }
      bind(fn) {
        return fn;
      }
      runInAsyncScope(fn, thisArg, ...args) {
        return fn.call(thisArg, ...args);
      }
      asyncId() {
        return 0;
      }
      triggerAsyncId() {
        return 0;
      }
      emitDestroy() {
        return this;
      }
    };
    __name(PerformanceObserver, "PerformanceObserver");
    __publicField(PerformanceObserver, "supportedEntryTypes", []);
    performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();
  }
});

// node_modules/unenv/dist/runtime/node/perf_hooks.mjs
var init_perf_hooks = __esm({
  "node_modules/unenv/dist/runtime/node/perf_hooks.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_performance();
  }
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
var init_performance2 = __esm({
  "node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs"() {
    init_perf_hooks();
    globalThis.performance = performance;
    globalThis.Performance = Performance;
    globalThis.PerformanceEntry = PerformanceEntry;
    globalThis.PerformanceMark = PerformanceMark;
    globalThis.PerformanceMeasure = PerformanceMeasure;
    globalThis.PerformanceObserver = PerformanceObserver;
    globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
    globalThis.PerformanceResourceTiming = PerformanceResourceTiming;
  }
});

// node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default;
var init_noop = __esm({
  "node_modules/unenv/dist/runtime/mock/noop.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    noop_default = Object.assign(() => {
    }, { __unenv__: true });
  }
});

// node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";
var _console, _ignoreErrors, _stderr, _stdout, log, info, trace, debug, table, error, warn, createTask, clear, count, countReset, dir, dirxml, group, groupEnd, groupCollapsed, profile, profileEnd, time, timeEnd, timeLog, timeStamp, Console, _times, _stdoutErrorHandler, _stderrErrorHandler;
var init_console = __esm({
  "node_modules/unenv/dist/runtime/node/console.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_noop();
    init_utils();
    _console = globalThis.console;
    _ignoreErrors = true;
    _stderr = new Writable();
    _stdout = new Writable();
    log = _console?.log ?? noop_default;
    info = _console?.info ?? log;
    trace = _console?.trace ?? info;
    debug = _console?.debug ?? log;
    table = _console?.table ?? log;
    error = _console?.error ?? log;
    warn = _console?.warn ?? error;
    createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
    clear = _console?.clear ?? noop_default;
    count = _console?.count ?? noop_default;
    countReset = _console?.countReset ?? noop_default;
    dir = _console?.dir ?? noop_default;
    dirxml = _console?.dirxml ?? noop_default;
    group = _console?.group ?? noop_default;
    groupEnd = _console?.groupEnd ?? noop_default;
    groupCollapsed = _console?.groupCollapsed ?? noop_default;
    profile = _console?.profile ?? noop_default;
    profileEnd = _console?.profileEnd ?? noop_default;
    time = _console?.time ?? noop_default;
    timeEnd = _console?.timeEnd ?? noop_default;
    timeLog = _console?.timeLog ?? noop_default;
    timeStamp = _console?.timeStamp ?? noop_default;
    Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
    _times = /* @__PURE__ */ new Map();
    _stdoutErrorHandler = noop_default;
    _stderrErrorHandler = noop_default;
  }
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole, assert, clear2, context, count2, countReset2, createTask2, debug2, dir2, dirxml2, error2, group2, groupCollapsed2, groupEnd2, info2, log2, profile2, profileEnd2, table2, time2, timeEnd2, timeLog2, timeStamp2, trace2, warn2, console_default;
var init_console2 = __esm({
  "node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_console();
    workerdConsole = globalThis["console"];
    ({
      assert,
      clear: clear2,
      context: (
        // @ts-expect-error undocumented public API
        context
      ),
      count: count2,
      countReset: countReset2,
      createTask: (
        // @ts-expect-error undocumented public API
        createTask2
      ),
      debug: debug2,
      dir: dir2,
      dirxml: dirxml2,
      error: error2,
      group: group2,
      groupCollapsed: groupCollapsed2,
      groupEnd: groupEnd2,
      info: info2,
      log: log2,
      profile: profile2,
      profileEnd: profileEnd2,
      table: table2,
      time: time2,
      timeEnd: timeEnd2,
      timeLog: timeLog2,
      timeStamp: timeStamp2,
      trace: trace2,
      warn: warn2
    } = workerdConsole);
    Object.assign(workerdConsole, {
      Console,
      _ignoreErrors,
      _stderr,
      _stderrErrorHandler,
      _stdout,
      _stdoutErrorHandler,
      _times
    });
    console_default = workerdConsole;
  }
});

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console = __esm({
  "node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console"() {
    init_console2();
    globalThis.console = console_default;
  }
});

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime;
var init_hrtime = __esm({
  "node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
      const now = Date.now();
      const seconds = Math.trunc(now / 1e3);
      const nanos = now % 1e3 * 1e6;
      if (startTime) {
        let diffSeconds = seconds - startTime[0];
        let diffNanos = nanos - startTime[0];
        if (diffNanos < 0) {
          diffSeconds = diffSeconds - 1;
          diffNanos = 1e9 + diffNanos;
        }
        return [diffSeconds, diffNanos];
      }
      return [seconds, nanos];
    }, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
      return BigInt(Date.now() * 1e6);
    }, "bigint") });
  }
});

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
import { Socket } from "node:net";
var ReadStream;
var init_read_stream = __esm({
  "node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    ReadStream = class extends Socket {
      fd;
      constructor(fd) {
        super();
        this.fd = fd;
      }
      isRaw = false;
      setRawMode(mode) {
        this.isRaw = mode;
        return this;
      }
      isTTY = false;
    };
    __name(ReadStream, "ReadStream");
  }
});

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
import { Socket as Socket2 } from "node:net";
var WriteStream;
var init_write_stream = __esm({
  "node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    WriteStream = class extends Socket2 {
      fd;
      constructor(fd) {
        super();
        this.fd = fd;
      }
      clearLine(dir3, callback) {
        callback && callback();
        return false;
      }
      clearScreenDown(callback) {
        callback && callback();
        return false;
      }
      cursorTo(x, y, callback) {
        callback && typeof callback === "function" && callback();
        return false;
      }
      moveCursor(dx, dy, callback) {
        callback && callback();
        return false;
      }
      getColorDepth(env2) {
        return 1;
      }
      hasColors(count3, env2) {
        return false;
      }
      getWindowSize() {
        return [this.columns, this.rows];
      }
      columns = 80;
      rows = 24;
      isTTY = false;
    };
    __name(WriteStream, "WriteStream");
  }
});

// node_modules/unenv/dist/runtime/node/tty.mjs
var init_tty = __esm({
  "node_modules/unenv/dist/runtime/node/tty.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_read_stream();
    init_write_stream();
  }
});

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";
var Process;
var init_process = __esm({
  "node_modules/unenv/dist/runtime/node/internal/process/process.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_tty();
    init_utils();
    Process = class extends EventEmitter {
      env;
      hrtime;
      nextTick;
      constructor(impl) {
        super();
        this.env = impl.env;
        this.hrtime = impl.hrtime;
        this.nextTick = impl.nextTick;
        for (const prop of [...Object.getOwnPropertyNames(Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
          const value = this[prop];
          if (typeof value === "function") {
            this[prop] = value.bind(this);
          }
        }
      }
      emitWarning(warning, type2, code) {
        console.warn(`${code ? `[${code}] ` : ""}${type2 ? `${type2}: ` : ""}${warning}`);
      }
      emit(...args) {
        return super.emit(...args);
      }
      listeners(eventName) {
        return super.listeners(eventName);
      }
      #stdin;
      #stdout;
      #stderr;
      get stdin() {
        return this.#stdin ??= new ReadStream(0);
      }
      get stdout() {
        return this.#stdout ??= new WriteStream(1);
      }
      get stderr() {
        return this.#stderr ??= new WriteStream(2);
      }
      #cwd = "/";
      chdir(cwd2) {
        this.#cwd = cwd2;
      }
      cwd() {
        return this.#cwd;
      }
      arch = "";
      platform = "";
      argv = [];
      argv0 = "";
      execArgv = [];
      execPath = "";
      title = "";
      pid = 200;
      ppid = 100;
      get version() {
        return "";
      }
      get versions() {
        return {};
      }
      get allowedNodeEnvironmentFlags() {
        return /* @__PURE__ */ new Set();
      }
      get sourceMapsEnabled() {
        return false;
      }
      get debugPort() {
        return 0;
      }
      get throwDeprecation() {
        return false;
      }
      get traceDeprecation() {
        return false;
      }
      get features() {
        return {};
      }
      get release() {
        return {};
      }
      get connected() {
        return false;
      }
      get config() {
        return {};
      }
      get moduleLoadList() {
        return [];
      }
      constrainedMemory() {
        return 0;
      }
      availableMemory() {
        return 0;
      }
      uptime() {
        return 0;
      }
      resourceUsage() {
        return {};
      }
      ref() {
      }
      unref() {
      }
      umask() {
        throw createNotImplementedError("process.umask");
      }
      getBuiltinModule() {
        return void 0;
      }
      getActiveResourcesInfo() {
        throw createNotImplementedError("process.getActiveResourcesInfo");
      }
      exit() {
        throw createNotImplementedError("process.exit");
      }
      reallyExit() {
        throw createNotImplementedError("process.reallyExit");
      }
      kill() {
        throw createNotImplementedError("process.kill");
      }
      abort() {
        throw createNotImplementedError("process.abort");
      }
      dlopen() {
        throw createNotImplementedError("process.dlopen");
      }
      setSourceMapsEnabled() {
        throw createNotImplementedError("process.setSourceMapsEnabled");
      }
      loadEnvFile() {
        throw createNotImplementedError("process.loadEnvFile");
      }
      disconnect() {
        throw createNotImplementedError("process.disconnect");
      }
      cpuUsage() {
        throw createNotImplementedError("process.cpuUsage");
      }
      setUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
      }
      hasUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
      }
      initgroups() {
        throw createNotImplementedError("process.initgroups");
      }
      openStdin() {
        throw createNotImplementedError("process.openStdin");
      }
      assert() {
        throw createNotImplementedError("process.assert");
      }
      binding() {
        throw createNotImplementedError("process.binding");
      }
      permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
      report = {
        directory: "",
        filename: "",
        signal: "SIGUSR2",
        compact: false,
        reportOnFatalError: false,
        reportOnSignal: false,
        reportOnUncaughtException: false,
        getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
        writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
      };
      finalization = {
        register: /* @__PURE__ */ notImplemented("process.finalization.register"),
        unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
        registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
      };
      memoryUsage = Object.assign(() => ({
        arrayBuffers: 0,
        rss: 0,
        external: 0,
        heapTotal: 0,
        heapUsed: 0
      }), { rss: () => 0 });
      mainModule = void 0;
      domain = void 0;
      send = void 0;
      exitCode = void 0;
      channel = void 0;
      getegid = void 0;
      geteuid = void 0;
      getgid = void 0;
      getgroups = void 0;
      getuid = void 0;
      setegid = void 0;
      seteuid = void 0;
      setgid = void 0;
      setgroups = void 0;
      setuid = void 0;
      _events = void 0;
      _eventsCount = void 0;
      _exiting = void 0;
      _maxListeners = void 0;
      _debugEnd = void 0;
      _debugProcess = void 0;
      _fatalException = void 0;
      _getActiveHandles = void 0;
      _getActiveRequests = void 0;
      _kill = void 0;
      _preload_modules = void 0;
      _rawDebug = void 0;
      _startProfilerIdleNotifier = void 0;
      _stopProfilerIdleNotifier = void 0;
      _tickCallback = void 0;
      _disconnect = void 0;
      _handleQueue = void 0;
      _pendingMessage = void 0;
      _channel = void 0;
      _send = void 0;
      _linkedBinding = void 0;
    };
    __name(Process, "Process");
  }
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess, getBuiltinModule, exit, platform, nextTick, unenvProcess, abort, addListener, allowedNodeEnvironmentFlags, hasUncaughtExceptionCaptureCallback, setUncaughtExceptionCaptureCallback, loadEnvFile, sourceMapsEnabled, arch, argv, argv0, chdir, config, connected, constrainedMemory, availableMemory, cpuUsage, cwd, debugPort, dlopen, disconnect, emit, emitWarning, env, eventNames, execArgv, execPath, finalization, features, getActiveResourcesInfo, getMaxListeners, hrtime3, kill, listeners, listenerCount, memoryUsage, on, off, once, pid, ppid, prependListener, prependOnceListener, rawListeners, release, removeAllListeners, removeListener, report, resourceUsage, setMaxListeners, setSourceMapsEnabled, stderr, stdin, stdout, title, throwDeprecation, traceDeprecation, umask, uptime, version, versions, domain, initgroups, moduleLoadList, reallyExit, openStdin, assert2, binding, send, exitCode, channel, getegid, geteuid, getgid, getgroups, getuid, setegid, seteuid, setgid, setgroups, setuid, permission, mainModule, _events, _eventsCount, _exiting, _maxListeners, _debugEnd, _debugProcess, _fatalException, _getActiveHandles, _getActiveRequests, _kill, _preload_modules, _rawDebug, _startProfilerIdleNotifier, _stopProfilerIdleNotifier, _tickCallback, _disconnect, _handleQueue, _pendingMessage, _channel, _send, _linkedBinding, _process, process_default;
var init_process2 = __esm({
  "node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_hrtime();
    init_process();
    globalProcess = globalThis["process"];
    getBuiltinModule = globalProcess.getBuiltinModule;
    ({ exit, platform, nextTick } = getBuiltinModule(
      "node:process"
    ));
    unenvProcess = new Process({
      env: globalProcess.env,
      hrtime,
      nextTick
    });
    ({
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      hasUncaughtExceptionCaptureCallback,
      setUncaughtExceptionCaptureCallback,
      loadEnvFile,
      sourceMapsEnabled,
      arch,
      argv,
      argv0,
      chdir,
      config,
      connected,
      constrainedMemory,
      availableMemory,
      cpuUsage,
      cwd,
      debugPort,
      dlopen,
      disconnect,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      finalization,
      features,
      getActiveResourcesInfo,
      getMaxListeners,
      hrtime: hrtime3,
      kill,
      listeners,
      listenerCount,
      memoryUsage,
      on,
      off,
      once,
      pid,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      setMaxListeners,
      setSourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      title,
      throwDeprecation,
      traceDeprecation,
      umask,
      uptime,
      version,
      versions,
      domain,
      initgroups,
      moduleLoadList,
      reallyExit,
      openStdin,
      assert: assert2,
      binding,
      send,
      exitCode,
      channel,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getuid,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setuid,
      permission,
      mainModule,
      _events,
      _eventsCount,
      _exiting,
      _maxListeners,
      _debugEnd,
      _debugProcess,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _kill,
      _preload_modules,
      _rawDebug,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      _disconnect,
      _handleQueue,
      _pendingMessage,
      _channel,
      _send,
      _linkedBinding
    } = unenvProcess);
    _process = {
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      hasUncaughtExceptionCaptureCallback,
      setUncaughtExceptionCaptureCallback,
      loadEnvFile,
      sourceMapsEnabled,
      arch,
      argv,
      argv0,
      chdir,
      config,
      connected,
      constrainedMemory,
      availableMemory,
      cpuUsage,
      cwd,
      debugPort,
      dlopen,
      disconnect,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      exit,
      finalization,
      features,
      getBuiltinModule,
      getActiveResourcesInfo,
      getMaxListeners,
      hrtime: hrtime3,
      kill,
      listeners,
      listenerCount,
      memoryUsage,
      nextTick,
      on,
      off,
      once,
      pid,
      platform,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      setMaxListeners,
      setSourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      title,
      throwDeprecation,
      traceDeprecation,
      umask,
      uptime,
      version,
      versions,
      // @ts-expect-error old API
      domain,
      initgroups,
      moduleLoadList,
      reallyExit,
      openStdin,
      assert: assert2,
      binding,
      send,
      exitCode,
      channel,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getuid,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setuid,
      permission,
      mainModule,
      _events,
      _eventsCount,
      _exiting,
      _maxListeners,
      _debugEnd,
      _debugProcess,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _kill,
      _preload_modules,
      _rawDebug,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      _disconnect,
      _handleQueue,
      _pendingMessage,
      _channel,
      _send,
      _linkedBinding
    };
    process_default = _process;
  }
});

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process = __esm({
  "node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process"() {
    init_process2();
    globalThis.process = process_default;
  }
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
  }
});

// node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// node_modules/unenv/dist/runtime/node/internal/fs/promises.mjs
var access, copyFile, cp, open, opendir, rename, truncate, rm, rmdir, mkdir, readdir, readlink, symlink, lstat, stat, link, unlink, chmod, lchmod, lchown, chown, utimes, lutimes, realpath, mkdtemp, writeFile, appendFile, readFile, watch, statfs, glob;
var init_promises = __esm({
  "node_modules/unenv/dist/runtime/node/internal/fs/promises.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    access = /* @__PURE__ */ notImplemented("fs.access");
    copyFile = /* @__PURE__ */ notImplemented("fs.copyFile");
    cp = /* @__PURE__ */ notImplemented("fs.cp");
    open = /* @__PURE__ */ notImplemented("fs.open");
    opendir = /* @__PURE__ */ notImplemented("fs.opendir");
    rename = /* @__PURE__ */ notImplemented("fs.rename");
    truncate = /* @__PURE__ */ notImplemented("fs.truncate");
    rm = /* @__PURE__ */ notImplemented("fs.rm");
    rmdir = /* @__PURE__ */ notImplemented("fs.rmdir");
    mkdir = /* @__PURE__ */ notImplemented("fs.mkdir");
    readdir = /* @__PURE__ */ notImplemented("fs.readdir");
    readlink = /* @__PURE__ */ notImplemented("fs.readlink");
    symlink = /* @__PURE__ */ notImplemented("fs.symlink");
    lstat = /* @__PURE__ */ notImplemented("fs.lstat");
    stat = /* @__PURE__ */ notImplemented("fs.stat");
    link = /* @__PURE__ */ notImplemented("fs.link");
    unlink = /* @__PURE__ */ notImplemented("fs.unlink");
    chmod = /* @__PURE__ */ notImplemented("fs.chmod");
    lchmod = /* @__PURE__ */ notImplemented("fs.lchmod");
    lchown = /* @__PURE__ */ notImplemented("fs.lchown");
    chown = /* @__PURE__ */ notImplemented("fs.chown");
    utimes = /* @__PURE__ */ notImplemented("fs.utimes");
    lutimes = /* @__PURE__ */ notImplemented("fs.lutimes");
    realpath = /* @__PURE__ */ notImplemented("fs.realpath");
    mkdtemp = /* @__PURE__ */ notImplemented("fs.mkdtemp");
    writeFile = /* @__PURE__ */ notImplemented("fs.writeFile");
    appendFile = /* @__PURE__ */ notImplemented("fs.appendFile");
    readFile = /* @__PURE__ */ notImplemented("fs.readFile");
    watch = /* @__PURE__ */ notImplemented("fs.watch");
    statfs = /* @__PURE__ */ notImplemented("fs.statfs");
    glob = /* @__PURE__ */ notImplemented("fs.glob");
  }
});

// node_modules/unenv/dist/runtime/node/internal/fs/constants.mjs
var constants_exports = {};
__export(constants_exports, {
  COPYFILE_EXCL: () => COPYFILE_EXCL,
  COPYFILE_FICLONE: () => COPYFILE_FICLONE,
  COPYFILE_FICLONE_FORCE: () => COPYFILE_FICLONE_FORCE,
  EXTENSIONLESS_FORMAT_JAVASCRIPT: () => EXTENSIONLESS_FORMAT_JAVASCRIPT,
  EXTENSIONLESS_FORMAT_WASM: () => EXTENSIONLESS_FORMAT_WASM,
  F_OK: () => F_OK,
  O_APPEND: () => O_APPEND,
  O_CREAT: () => O_CREAT,
  O_DIRECT: () => O_DIRECT,
  O_DIRECTORY: () => O_DIRECTORY,
  O_DSYNC: () => O_DSYNC,
  O_EXCL: () => O_EXCL,
  O_NOATIME: () => O_NOATIME,
  O_NOCTTY: () => O_NOCTTY,
  O_NOFOLLOW: () => O_NOFOLLOW,
  O_NONBLOCK: () => O_NONBLOCK,
  O_RDONLY: () => O_RDONLY,
  O_RDWR: () => O_RDWR,
  O_SYNC: () => O_SYNC,
  O_TRUNC: () => O_TRUNC,
  O_WRONLY: () => O_WRONLY,
  R_OK: () => R_OK,
  S_IFBLK: () => S_IFBLK,
  S_IFCHR: () => S_IFCHR,
  S_IFDIR: () => S_IFDIR,
  S_IFIFO: () => S_IFIFO,
  S_IFLNK: () => S_IFLNK,
  S_IFMT: () => S_IFMT,
  S_IFREG: () => S_IFREG,
  S_IFSOCK: () => S_IFSOCK,
  S_IRGRP: () => S_IRGRP,
  S_IROTH: () => S_IROTH,
  S_IRUSR: () => S_IRUSR,
  S_IRWXG: () => S_IRWXG,
  S_IRWXO: () => S_IRWXO,
  S_IRWXU: () => S_IRWXU,
  S_IWGRP: () => S_IWGRP,
  S_IWOTH: () => S_IWOTH,
  S_IWUSR: () => S_IWUSR,
  S_IXGRP: () => S_IXGRP,
  S_IXOTH: () => S_IXOTH,
  S_IXUSR: () => S_IXUSR,
  UV_DIRENT_BLOCK: () => UV_DIRENT_BLOCK,
  UV_DIRENT_CHAR: () => UV_DIRENT_CHAR,
  UV_DIRENT_DIR: () => UV_DIRENT_DIR,
  UV_DIRENT_FIFO: () => UV_DIRENT_FIFO,
  UV_DIRENT_FILE: () => UV_DIRENT_FILE,
  UV_DIRENT_LINK: () => UV_DIRENT_LINK,
  UV_DIRENT_SOCKET: () => UV_DIRENT_SOCKET,
  UV_DIRENT_UNKNOWN: () => UV_DIRENT_UNKNOWN,
  UV_FS_COPYFILE_EXCL: () => UV_FS_COPYFILE_EXCL,
  UV_FS_COPYFILE_FICLONE: () => UV_FS_COPYFILE_FICLONE,
  UV_FS_COPYFILE_FICLONE_FORCE: () => UV_FS_COPYFILE_FICLONE_FORCE,
  UV_FS_O_FILEMAP: () => UV_FS_O_FILEMAP,
  UV_FS_SYMLINK_DIR: () => UV_FS_SYMLINK_DIR,
  UV_FS_SYMLINK_JUNCTION: () => UV_FS_SYMLINK_JUNCTION,
  W_OK: () => W_OK,
  X_OK: () => X_OK
});
var UV_FS_SYMLINK_DIR, UV_FS_SYMLINK_JUNCTION, O_RDONLY, O_WRONLY, O_RDWR, UV_DIRENT_UNKNOWN, UV_DIRENT_FILE, UV_DIRENT_DIR, UV_DIRENT_LINK, UV_DIRENT_FIFO, UV_DIRENT_SOCKET, UV_DIRENT_CHAR, UV_DIRENT_BLOCK, EXTENSIONLESS_FORMAT_JAVASCRIPT, EXTENSIONLESS_FORMAT_WASM, S_IFMT, S_IFREG, S_IFDIR, S_IFCHR, S_IFBLK, S_IFIFO, S_IFLNK, S_IFSOCK, O_CREAT, O_EXCL, UV_FS_O_FILEMAP, O_NOCTTY, O_TRUNC, O_APPEND, O_DIRECTORY, O_NOATIME, O_NOFOLLOW, O_SYNC, O_DSYNC, O_DIRECT, O_NONBLOCK, S_IRWXU, S_IRUSR, S_IWUSR, S_IXUSR, S_IRWXG, S_IRGRP, S_IWGRP, S_IXGRP, S_IRWXO, S_IROTH, S_IWOTH, S_IXOTH, F_OK, R_OK, W_OK, X_OK, UV_FS_COPYFILE_EXCL, COPYFILE_EXCL, UV_FS_COPYFILE_FICLONE, COPYFILE_FICLONE, UV_FS_COPYFILE_FICLONE_FORCE, COPYFILE_FICLONE_FORCE;
var init_constants = __esm({
  "node_modules/unenv/dist/runtime/node/internal/fs/constants.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    UV_FS_SYMLINK_DIR = 1;
    UV_FS_SYMLINK_JUNCTION = 2;
    O_RDONLY = 0;
    O_WRONLY = 1;
    O_RDWR = 2;
    UV_DIRENT_UNKNOWN = 0;
    UV_DIRENT_FILE = 1;
    UV_DIRENT_DIR = 2;
    UV_DIRENT_LINK = 3;
    UV_DIRENT_FIFO = 4;
    UV_DIRENT_SOCKET = 5;
    UV_DIRENT_CHAR = 6;
    UV_DIRENT_BLOCK = 7;
    EXTENSIONLESS_FORMAT_JAVASCRIPT = 0;
    EXTENSIONLESS_FORMAT_WASM = 1;
    S_IFMT = 61440;
    S_IFREG = 32768;
    S_IFDIR = 16384;
    S_IFCHR = 8192;
    S_IFBLK = 24576;
    S_IFIFO = 4096;
    S_IFLNK = 40960;
    S_IFSOCK = 49152;
    O_CREAT = 64;
    O_EXCL = 128;
    UV_FS_O_FILEMAP = 0;
    O_NOCTTY = 256;
    O_TRUNC = 512;
    O_APPEND = 1024;
    O_DIRECTORY = 65536;
    O_NOATIME = 262144;
    O_NOFOLLOW = 131072;
    O_SYNC = 1052672;
    O_DSYNC = 4096;
    O_DIRECT = 16384;
    O_NONBLOCK = 2048;
    S_IRWXU = 448;
    S_IRUSR = 256;
    S_IWUSR = 128;
    S_IXUSR = 64;
    S_IRWXG = 56;
    S_IRGRP = 32;
    S_IWGRP = 16;
    S_IXGRP = 8;
    S_IRWXO = 7;
    S_IROTH = 4;
    S_IWOTH = 2;
    S_IXOTH = 1;
    F_OK = 0;
    R_OK = 4;
    W_OK = 2;
    X_OK = 1;
    UV_FS_COPYFILE_EXCL = 1;
    COPYFILE_EXCL = 1;
    UV_FS_COPYFILE_FICLONE = 2;
    COPYFILE_FICLONE = 2;
    UV_FS_COPYFILE_FICLONE_FORCE = 4;
    COPYFILE_FICLONE_FORCE = 4;
  }
});

// node_modules/unenv/dist/runtime/node/fs/promises.mjs
var promises_exports = {};
__export(promises_exports, {
  access: () => access,
  appendFile: () => appendFile,
  chmod: () => chmod,
  chown: () => chown,
  constants: () => constants_exports,
  copyFile: () => copyFile,
  cp: () => cp,
  default: () => promises_default,
  glob: () => glob,
  lchmod: () => lchmod,
  lchown: () => lchown,
  link: () => link,
  lstat: () => lstat,
  lutimes: () => lutimes,
  mkdir: () => mkdir,
  mkdtemp: () => mkdtemp,
  open: () => open,
  opendir: () => opendir,
  readFile: () => readFile,
  readdir: () => readdir,
  readlink: () => readlink,
  realpath: () => realpath,
  rename: () => rename,
  rm: () => rm,
  rmdir: () => rmdir,
  stat: () => stat,
  statfs: () => statfs,
  symlink: () => symlink,
  truncate: () => truncate,
  unlink: () => unlink,
  utimes: () => utimes,
  watch: () => watch,
  writeFile: () => writeFile
});
var promises_default;
var init_promises2 = __esm({
  "node_modules/unenv/dist/runtime/node/fs/promises.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_promises();
    init_constants();
    init_promises();
    promises_default = {
      constants: constants_exports,
      access,
      appendFile,
      chmod,
      chown,
      copyFile,
      cp,
      glob,
      lchmod,
      lchown,
      link,
      lstat,
      lutimes,
      mkdir,
      mkdtemp,
      open,
      opendir,
      readFile,
      readdir,
      readlink,
      realpath,
      rename,
      rm,
      rmdir,
      stat,
      statfs,
      symlink,
      truncate,
      unlink,
      utimes,
      watch,
      writeFile
    };
  }
});

// node_modules/unenv/dist/runtime/node/internal/fs/classes.mjs
var Dir, Dirent, Stats, ReadStream2, WriteStream2, FileReadStream, FileWriteStream;
var init_classes = __esm({
  "node_modules/unenv/dist/runtime/node/internal/fs/classes.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    Dir = /* @__PURE__ */ notImplementedClass("fs.Dir");
    Dirent = /* @__PURE__ */ notImplementedClass("fs.Dirent");
    Stats = /* @__PURE__ */ notImplementedClass("fs.Stats");
    ReadStream2 = /* @__PURE__ */ notImplementedClass("fs.ReadStream");
    WriteStream2 = /* @__PURE__ */ notImplementedClass("fs.WriteStream");
    FileReadStream = ReadStream2;
    FileWriteStream = WriteStream2;
  }
});

// node_modules/unenv/dist/runtime/node/internal/fs/fs.mjs
function callbackify(fn) {
  const fnc = /* @__PURE__ */ __name(function(...args) {
    const cb = args.pop();
    fn().catch((error3) => cb(error3)).then((val) => cb(void 0, val));
  }, "fnc");
  fnc.__promisify__ = fn;
  fnc.native = fnc;
  return fnc;
}
var access2, appendFile2, chown2, chmod2, copyFile2, cp2, lchown2, lchmod2, link2, lstat2, lutimes2, mkdir2, mkdtemp2, realpath2, open2, opendir2, readdir2, readFile2, readlink2, rename2, rm2, rmdir2, stat2, symlink2, truncate2, unlink2, utimes2, writeFile2, statfs2, close, createReadStream, createWriteStream, exists, fchown, fchmod, fdatasync, fstat, fsync, ftruncate, futimes, lstatSync, read, readv, realpathSync, statSync, unwatchFile, watch2, watchFile, write, writev, _toUnixTimestamp, openAsBlob, glob2, appendFileSync, accessSync, chownSync, chmodSync, closeSync, copyFileSync, cpSync, existsSync, fchownSync, fchmodSync, fdatasyncSync, fstatSync, fsyncSync, ftruncateSync, futimesSync, lchownSync, lchmodSync, linkSync, lutimesSync, mkdirSync, mkdtempSync, openSync, opendirSync, readdirSync, readSync, readvSync, readFileSync, readlinkSync, renameSync, rmSync, rmdirSync, symlinkSync, truncateSync, unlinkSync, utimesSync, writeFileSync, writeSync, writevSync, statfsSync, globSync;
var init_fs = __esm({
  "node_modules/unenv/dist/runtime/node/internal/fs/fs.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    init_promises();
    __name(callbackify, "callbackify");
    access2 = callbackify(access);
    appendFile2 = callbackify(appendFile);
    chown2 = callbackify(chown);
    chmod2 = callbackify(chmod);
    copyFile2 = callbackify(copyFile);
    cp2 = callbackify(cp);
    lchown2 = callbackify(lchown);
    lchmod2 = callbackify(lchmod);
    link2 = callbackify(link);
    lstat2 = callbackify(lstat);
    lutimes2 = callbackify(lutimes);
    mkdir2 = callbackify(mkdir);
    mkdtemp2 = callbackify(mkdtemp);
    realpath2 = callbackify(realpath);
    open2 = callbackify(open);
    opendir2 = callbackify(opendir);
    readdir2 = callbackify(readdir);
    readFile2 = callbackify(readFile);
    readlink2 = callbackify(readlink);
    rename2 = callbackify(rename);
    rm2 = callbackify(rm);
    rmdir2 = callbackify(rmdir);
    stat2 = callbackify(stat);
    symlink2 = callbackify(symlink);
    truncate2 = callbackify(truncate);
    unlink2 = callbackify(unlink);
    utimes2 = callbackify(utimes);
    writeFile2 = callbackify(writeFile);
    statfs2 = callbackify(statfs);
    close = /* @__PURE__ */ notImplementedAsync("fs.close");
    createReadStream = /* @__PURE__ */ notImplementedAsync("fs.createReadStream");
    createWriteStream = /* @__PURE__ */ notImplementedAsync("fs.createWriteStream");
    exists = /* @__PURE__ */ notImplementedAsync("fs.exists");
    fchown = /* @__PURE__ */ notImplementedAsync("fs.fchown");
    fchmod = /* @__PURE__ */ notImplementedAsync("fs.fchmod");
    fdatasync = /* @__PURE__ */ notImplementedAsync("fs.fdatasync");
    fstat = /* @__PURE__ */ notImplementedAsync("fs.fstat");
    fsync = /* @__PURE__ */ notImplementedAsync("fs.fsync");
    ftruncate = /* @__PURE__ */ notImplementedAsync("fs.ftruncate");
    futimes = /* @__PURE__ */ notImplementedAsync("fs.futimes");
    lstatSync = /* @__PURE__ */ notImplementedAsync("fs.lstatSync");
    read = /* @__PURE__ */ notImplementedAsync("fs.read");
    readv = /* @__PURE__ */ notImplementedAsync("fs.readv");
    realpathSync = /* @__PURE__ */ notImplementedAsync("fs.realpathSync");
    statSync = /* @__PURE__ */ notImplementedAsync("fs.statSync");
    unwatchFile = /* @__PURE__ */ notImplementedAsync("fs.unwatchFile");
    watch2 = /* @__PURE__ */ notImplementedAsync("fs.watch");
    watchFile = /* @__PURE__ */ notImplementedAsync("fs.watchFile");
    write = /* @__PURE__ */ notImplementedAsync("fs.write");
    writev = /* @__PURE__ */ notImplementedAsync("fs.writev");
    _toUnixTimestamp = /* @__PURE__ */ notImplementedAsync("fs._toUnixTimestamp");
    openAsBlob = /* @__PURE__ */ notImplementedAsync("fs.openAsBlob");
    glob2 = /* @__PURE__ */ notImplementedAsync("fs.glob");
    appendFileSync = /* @__PURE__ */ notImplemented("fs.appendFileSync");
    accessSync = /* @__PURE__ */ notImplemented("fs.accessSync");
    chownSync = /* @__PURE__ */ notImplemented("fs.chownSync");
    chmodSync = /* @__PURE__ */ notImplemented("fs.chmodSync");
    closeSync = /* @__PURE__ */ notImplemented("fs.closeSync");
    copyFileSync = /* @__PURE__ */ notImplemented("fs.copyFileSync");
    cpSync = /* @__PURE__ */ notImplemented("fs.cpSync");
    existsSync = /* @__PURE__ */ __name(() => false, "existsSync");
    fchownSync = /* @__PURE__ */ notImplemented("fs.fchownSync");
    fchmodSync = /* @__PURE__ */ notImplemented("fs.fchmodSync");
    fdatasyncSync = /* @__PURE__ */ notImplemented("fs.fdatasyncSync");
    fstatSync = /* @__PURE__ */ notImplemented("fs.fstatSync");
    fsyncSync = /* @__PURE__ */ notImplemented("fs.fsyncSync");
    ftruncateSync = /* @__PURE__ */ notImplemented("fs.ftruncateSync");
    futimesSync = /* @__PURE__ */ notImplemented("fs.futimesSync");
    lchownSync = /* @__PURE__ */ notImplemented("fs.lchownSync");
    lchmodSync = /* @__PURE__ */ notImplemented("fs.lchmodSync");
    linkSync = /* @__PURE__ */ notImplemented("fs.linkSync");
    lutimesSync = /* @__PURE__ */ notImplemented("fs.lutimesSync");
    mkdirSync = /* @__PURE__ */ notImplemented("fs.mkdirSync");
    mkdtempSync = /* @__PURE__ */ notImplemented("fs.mkdtempSync");
    openSync = /* @__PURE__ */ notImplemented("fs.openSync");
    opendirSync = /* @__PURE__ */ notImplemented("fs.opendirSync");
    readdirSync = /* @__PURE__ */ notImplemented("fs.readdirSync");
    readSync = /* @__PURE__ */ notImplemented("fs.readSync");
    readvSync = /* @__PURE__ */ notImplemented("fs.readvSync");
    readFileSync = /* @__PURE__ */ notImplemented("fs.readFileSync");
    readlinkSync = /* @__PURE__ */ notImplemented("fs.readlinkSync");
    renameSync = /* @__PURE__ */ notImplemented("fs.renameSync");
    rmSync = /* @__PURE__ */ notImplemented("fs.rmSync");
    rmdirSync = /* @__PURE__ */ notImplemented("fs.rmdirSync");
    symlinkSync = /* @__PURE__ */ notImplemented("fs.symlinkSync");
    truncateSync = /* @__PURE__ */ notImplemented("fs.truncateSync");
    unlinkSync = /* @__PURE__ */ notImplemented("fs.unlinkSync");
    utimesSync = /* @__PURE__ */ notImplemented("fs.utimesSync");
    writeFileSync = /* @__PURE__ */ notImplemented("fs.writeFileSync");
    writeSync = /* @__PURE__ */ notImplemented("fs.writeSync");
    writevSync = /* @__PURE__ */ notImplemented("fs.writevSync");
    statfsSync = /* @__PURE__ */ notImplemented("fs.statfsSync");
    globSync = /* @__PURE__ */ notImplemented("fs.globSync");
  }
});

// node_modules/unenv/dist/runtime/node/fs.mjs
var fs_exports = {};
__export(fs_exports, {
  Dir: () => Dir,
  Dirent: () => Dirent,
  F_OK: () => F_OK,
  FileReadStream: () => FileReadStream,
  FileWriteStream: () => FileWriteStream,
  R_OK: () => R_OK,
  ReadStream: () => ReadStream2,
  Stats: () => Stats,
  W_OK: () => W_OK,
  WriteStream: () => WriteStream2,
  X_OK: () => X_OK,
  _toUnixTimestamp: () => _toUnixTimestamp,
  access: () => access2,
  accessSync: () => accessSync,
  appendFile: () => appendFile2,
  appendFileSync: () => appendFileSync,
  chmod: () => chmod2,
  chmodSync: () => chmodSync,
  chown: () => chown2,
  chownSync: () => chownSync,
  close: () => close,
  closeSync: () => closeSync,
  constants: () => constants_exports,
  copyFile: () => copyFile2,
  copyFileSync: () => copyFileSync,
  cp: () => cp2,
  cpSync: () => cpSync,
  createReadStream: () => createReadStream,
  createWriteStream: () => createWriteStream,
  default: () => fs_default,
  exists: () => exists,
  existsSync: () => existsSync,
  fchmod: () => fchmod,
  fchmodSync: () => fchmodSync,
  fchown: () => fchown,
  fchownSync: () => fchownSync,
  fdatasync: () => fdatasync,
  fdatasyncSync: () => fdatasyncSync,
  fstat: () => fstat,
  fstatSync: () => fstatSync,
  fsync: () => fsync,
  fsyncSync: () => fsyncSync,
  ftruncate: () => ftruncate,
  ftruncateSync: () => ftruncateSync,
  futimes: () => futimes,
  futimesSync: () => futimesSync,
  glob: () => glob2,
  globSync: () => globSync,
  lchmod: () => lchmod2,
  lchmodSync: () => lchmodSync,
  lchown: () => lchown2,
  lchownSync: () => lchownSync,
  link: () => link2,
  linkSync: () => linkSync,
  lstat: () => lstat2,
  lstatSync: () => lstatSync,
  lutimes: () => lutimes2,
  lutimesSync: () => lutimesSync,
  mkdir: () => mkdir2,
  mkdirSync: () => mkdirSync,
  mkdtemp: () => mkdtemp2,
  mkdtempSync: () => mkdtempSync,
  open: () => open2,
  openAsBlob: () => openAsBlob,
  openSync: () => openSync,
  opendir: () => opendir2,
  opendirSync: () => opendirSync,
  promises: () => promises_default,
  read: () => read,
  readFile: () => readFile2,
  readFileSync: () => readFileSync,
  readSync: () => readSync,
  readdir: () => readdir2,
  readdirSync: () => readdirSync,
  readlink: () => readlink2,
  readlinkSync: () => readlinkSync,
  readv: () => readv,
  readvSync: () => readvSync,
  realpath: () => realpath2,
  realpathSync: () => realpathSync,
  rename: () => rename2,
  renameSync: () => renameSync,
  rm: () => rm2,
  rmSync: () => rmSync,
  rmdir: () => rmdir2,
  rmdirSync: () => rmdirSync,
  stat: () => stat2,
  statSync: () => statSync,
  statfs: () => statfs2,
  statfsSync: () => statfsSync,
  symlink: () => symlink2,
  symlinkSync: () => symlinkSync,
  truncate: () => truncate2,
  truncateSync: () => truncateSync,
  unlink: () => unlink2,
  unlinkSync: () => unlinkSync,
  unwatchFile: () => unwatchFile,
  utimes: () => utimes2,
  utimesSync: () => utimesSync,
  watch: () => watch2,
  watchFile: () => watchFile,
  write: () => write,
  writeFile: () => writeFile2,
  writeFileSync: () => writeFileSync,
  writeSync: () => writeSync,
  writev: () => writev,
  writevSync: () => writevSync
});
var fs_default;
var init_fs2 = __esm({
  "node_modules/unenv/dist/runtime/node/fs.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_promises2();
    init_classes();
    init_fs();
    init_constants();
    init_constants();
    init_constants();
    init_fs();
    init_classes();
    fs_default = {
      F_OK,
      R_OK,
      W_OK,
      X_OK,
      constants: constants_exports,
      promises: promises_default,
      Dir,
      Dirent,
      FileReadStream,
      FileWriteStream,
      ReadStream: ReadStream2,
      Stats,
      WriteStream: WriteStream2,
      _toUnixTimestamp,
      access: access2,
      accessSync,
      appendFile: appendFile2,
      appendFileSync,
      chmod: chmod2,
      chmodSync,
      chown: chown2,
      chownSync,
      close,
      closeSync,
      copyFile: copyFile2,
      copyFileSync,
      cp: cp2,
      cpSync,
      createReadStream,
      createWriteStream,
      exists,
      existsSync,
      fchmod,
      fchmodSync,
      fchown,
      fchownSync,
      fdatasync,
      fdatasyncSync,
      fstat,
      fstatSync,
      fsync,
      fsyncSync,
      ftruncate,
      ftruncateSync,
      futimes,
      futimesSync,
      glob: glob2,
      lchmod: lchmod2,
      globSync,
      lchmodSync,
      lchown: lchown2,
      lchownSync,
      link: link2,
      linkSync,
      lstat: lstat2,
      lstatSync,
      lutimes: lutimes2,
      lutimesSync,
      mkdir: mkdir2,
      mkdirSync,
      mkdtemp: mkdtemp2,
      mkdtempSync,
      open: open2,
      openAsBlob,
      openSync,
      opendir: opendir2,
      opendirSync,
      read,
      readFile: readFile2,
      readFileSync,
      readSync,
      readdir: readdir2,
      readdirSync,
      readlink: readlink2,
      readlinkSync,
      readv,
      readvSync,
      realpath: realpath2,
      realpathSync,
      rename: rename2,
      renameSync,
      rm: rm2,
      rmSync,
      rmdir: rmdir2,
      rmdirSync,
      stat: stat2,
      statSync,
      statfs: statfs2,
      statfsSync,
      symlink: symlink2,
      symlinkSync,
      truncate: truncate2,
      truncateSync,
      unlink: unlink2,
      unlinkSync,
      unwatchFile,
      utimes: utimes2,
      utimesSync,
      watch: watch2,
      watchFile,
      write,
      writeFile: writeFile2,
      writeFileSync,
      writeSync,
      writev,
      writevSync
    };
  }
});

// node_modules/unenv/dist/runtime/node/internal/os/constants.mjs
var UV_UDP_REUSEADDR, dlopen2, errno, signals, priority;
var init_constants2 = __esm({
  "node_modules/unenv/dist/runtime/node/internal/os/constants.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    UV_UDP_REUSEADDR = 4;
    dlopen2 = {
      RTLD_LAZY: 1,
      RTLD_NOW: 2,
      RTLD_GLOBAL: 256,
      RTLD_LOCAL: 0,
      RTLD_DEEPBIND: 8
    };
    errno = {
      E2BIG: 7,
      EACCES: 13,
      EADDRINUSE: 98,
      EADDRNOTAVAIL: 99,
      EAFNOSUPPORT: 97,
      EAGAIN: 11,
      EALREADY: 114,
      EBADF: 9,
      EBADMSG: 74,
      EBUSY: 16,
      ECANCELED: 125,
      ECHILD: 10,
      ECONNABORTED: 103,
      ECONNREFUSED: 111,
      ECONNRESET: 104,
      EDEADLK: 35,
      EDESTADDRREQ: 89,
      EDOM: 33,
      EDQUOT: 122,
      EEXIST: 17,
      EFAULT: 14,
      EFBIG: 27,
      EHOSTUNREACH: 113,
      EIDRM: 43,
      EILSEQ: 84,
      EINPROGRESS: 115,
      EINTR: 4,
      EINVAL: 22,
      EIO: 5,
      EISCONN: 106,
      EISDIR: 21,
      ELOOP: 40,
      EMFILE: 24,
      EMLINK: 31,
      EMSGSIZE: 90,
      EMULTIHOP: 72,
      ENAMETOOLONG: 36,
      ENETDOWN: 100,
      ENETRESET: 102,
      ENETUNREACH: 101,
      ENFILE: 23,
      ENOBUFS: 105,
      ENODATA: 61,
      ENODEV: 19,
      ENOENT: 2,
      ENOEXEC: 8,
      ENOLCK: 37,
      ENOLINK: 67,
      ENOMEM: 12,
      ENOMSG: 42,
      ENOPROTOOPT: 92,
      ENOSPC: 28,
      ENOSR: 63,
      ENOSTR: 60,
      ENOSYS: 38,
      ENOTCONN: 107,
      ENOTDIR: 20,
      ENOTEMPTY: 39,
      ENOTSOCK: 88,
      ENOTSUP: 95,
      ENOTTY: 25,
      ENXIO: 6,
      EOPNOTSUPP: 95,
      EOVERFLOW: 75,
      EPERM: 1,
      EPIPE: 32,
      EPROTO: 71,
      EPROTONOSUPPORT: 93,
      EPROTOTYPE: 91,
      ERANGE: 34,
      EROFS: 30,
      ESPIPE: 29,
      ESRCH: 3,
      ESTALE: 116,
      ETIME: 62,
      ETIMEDOUT: 110,
      ETXTBSY: 26,
      EWOULDBLOCK: 11,
      EXDEV: 18
    };
    signals = {
      SIGHUP: 1,
      SIGINT: 2,
      SIGQUIT: 3,
      SIGILL: 4,
      SIGTRAP: 5,
      SIGABRT: 6,
      SIGIOT: 6,
      SIGBUS: 7,
      SIGFPE: 8,
      SIGKILL: 9,
      SIGUSR1: 10,
      SIGSEGV: 11,
      SIGUSR2: 12,
      SIGPIPE: 13,
      SIGALRM: 14,
      SIGTERM: 15,
      SIGCHLD: 17,
      SIGSTKFLT: 16,
      SIGCONT: 18,
      SIGSTOP: 19,
      SIGTSTP: 20,
      SIGTTIN: 21,
      SIGTTOU: 22,
      SIGURG: 23,
      SIGXCPU: 24,
      SIGXFSZ: 25,
      SIGVTALRM: 26,
      SIGPROF: 27,
      SIGWINCH: 28,
      SIGIO: 29,
      SIGPOLL: 29,
      SIGPWR: 30,
      SIGSYS: 31
    };
    priority = {
      PRIORITY_LOW: 19,
      PRIORITY_BELOW_NORMAL: 10,
      PRIORITY_NORMAL: 0,
      PRIORITY_ABOVE_NORMAL: -7,
      PRIORITY_HIGH: -14,
      PRIORITY_HIGHEST: -20
    };
  }
});

// node_modules/unenv/dist/runtime/node/os.mjs
var os_exports = {};
__export(os_exports, {
  EOL: () => EOL,
  arch: () => arch2,
  availableParallelism: () => availableParallelism,
  constants: () => constants,
  cpus: () => cpus,
  default: () => os_default,
  devNull: () => devNull,
  endianness: () => endianness,
  freemem: () => freemem,
  getPriority: () => getPriority,
  homedir: () => homedir,
  hostname: () => hostname,
  loadavg: () => loadavg,
  machine: () => machine,
  networkInterfaces: () => networkInterfaces,
  platform: () => platform2,
  release: () => release2,
  setPriority: () => setPriority,
  tmpdir: () => tmpdir,
  totalmem: () => totalmem,
  type: () => type,
  uptime: () => uptime2,
  userInfo: () => userInfo,
  version: () => version2
});
var constants, NUM_CPUS, availableParallelism, arch2, machine, endianness, cpus, getPriority, setPriority, homedir, tmpdir, devNull, freemem, totalmem, loadavg, uptime2, hostname, networkInterfaces, platform2, type, release2, version2, userInfo, EOL, os_default;
var init_os = __esm({
  "node_modules/unenv/dist/runtime/node/os.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    init_constants2();
    constants = {
      UV_UDP_REUSEADDR,
      dlopen: dlopen2,
      errno,
      signals,
      priority
    };
    NUM_CPUS = 8;
    availableParallelism = /* @__PURE__ */ __name(() => NUM_CPUS, "availableParallelism");
    arch2 = /* @__PURE__ */ __name(() => "", "arch");
    machine = /* @__PURE__ */ __name(() => "", "machine");
    endianness = /* @__PURE__ */ __name(() => "LE", "endianness");
    cpus = /* @__PURE__ */ __name(() => {
      const info3 = {
        model: "",
        speed: 0,
        times: {
          user: 0,
          nice: 0,
          sys: 0,
          idle: 0,
          irq: 0
        }
      };
      return Array.from({ length: NUM_CPUS }, () => info3);
    }, "cpus");
    getPriority = /* @__PURE__ */ __name(() => 0, "getPriority");
    setPriority = /* @__PURE__ */ notImplemented("os.setPriority");
    homedir = /* @__PURE__ */ __name(() => "/", "homedir");
    tmpdir = /* @__PURE__ */ __name(() => "/tmp", "tmpdir");
    devNull = "/dev/null";
    freemem = /* @__PURE__ */ __name(() => 0, "freemem");
    totalmem = /* @__PURE__ */ __name(() => 0, "totalmem");
    loadavg = /* @__PURE__ */ __name(() => [
      0,
      0,
      0
    ], "loadavg");
    uptime2 = /* @__PURE__ */ __name(() => 0, "uptime");
    hostname = /* @__PURE__ */ __name(() => "", "hostname");
    networkInterfaces = /* @__PURE__ */ __name(() => {
      return { lo0: [
        {
          address: "127.0.0.1",
          netmask: "255.0.0.0",
          family: "IPv4",
          mac: "00:00:00:00:00:00",
          internal: true,
          cidr: "127.0.0.1/8"
        },
        {
          address: "::1",
          netmask: "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff",
          family: "IPv6",
          mac: "00:00:00:00:00:00",
          internal: true,
          cidr: "::1/128",
          scopeid: 0
        },
        {
          address: "fe80::1",
          netmask: "ffff:ffff:ffff:ffff::",
          family: "IPv6",
          mac: "00:00:00:00:00:00",
          internal: true,
          cidr: "fe80::1/64",
          scopeid: 1
        }
      ] };
    }, "networkInterfaces");
    platform2 = /* @__PURE__ */ __name(() => "linux", "platform");
    type = /* @__PURE__ */ __name(() => "Linux", "type");
    release2 = /* @__PURE__ */ __name(() => "", "release");
    version2 = /* @__PURE__ */ __name(() => "", "version");
    userInfo = /* @__PURE__ */ __name((opts) => {
      const encode = /* @__PURE__ */ __name((str) => {
        if (opts?.encoding) {
          const buff = Buffer.from(str);
          return opts.encoding === "buffer" ? buff : buff.toString(opts.encoding);
        }
        return str;
      }, "encode");
      return {
        gid: 1e3,
        uid: 1e3,
        homedir: encode("/"),
        shell: encode("/bin/sh"),
        username: encode("root")
      };
    }, "userInfo");
    EOL = "\n";
    os_default = {
      arch: arch2,
      availableParallelism,
      constants,
      cpus,
      EOL,
      endianness,
      devNull,
      freemem,
      getPriority,
      homedir,
      hostname,
      loadavg,
      machine,
      networkInterfaces,
      platform: platform2,
      release: release2,
      setPriority,
      tmpdir,
      totalmem,
      type,
      uptime: uptime2,
      userInfo,
      version: version2
    };
  }
});

// node_modules/unenv/dist/runtime/node/internal/crypto/web.mjs
var subtle;
var init_web = __esm({
  "node_modules/unenv/dist/runtime/node/internal/crypto/web.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    subtle = globalThis.crypto?.subtle;
  }
});

// node_modules/unenv/dist/runtime/node/internal/crypto/node.mjs
var webcrypto, createCipher, createDecipher, pseudoRandomBytes, createCipheriv, createDecipheriv, createECDH, createSign, createVerify, diffieHellman, getCipherInfo, privateDecrypt, privateEncrypt, publicDecrypt, publicEncrypt, sign, verify, hash, Cipher, Cipheriv, Decipher, Decipheriv, ECDH, Sign, Verify;
var init_node = __esm({
  "node_modules/unenv/dist/runtime/node/internal/crypto/node.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    webcrypto = new Proxy(globalThis.crypto, { get(_, key) {
      if (key === "CryptoKey") {
        return globalThis.CryptoKey;
      }
      if (typeof globalThis.crypto[key] === "function") {
        return globalThis.crypto[key].bind(globalThis.crypto);
      }
      return globalThis.crypto[key];
    } });
    createCipher = /* @__PURE__ */ notImplemented("crypto.createCipher");
    createDecipher = /* @__PURE__ */ notImplemented("crypto.createDecipher");
    pseudoRandomBytes = /* @__PURE__ */ notImplemented("crypto.pseudoRandomBytes");
    createCipheriv = /* @__PURE__ */ notImplemented("crypto.createCipheriv");
    createDecipheriv = /* @__PURE__ */ notImplemented("crypto.createDecipheriv");
    createECDH = /* @__PURE__ */ notImplemented("crypto.createECDH");
    createSign = /* @__PURE__ */ notImplemented("crypto.createSign");
    createVerify = /* @__PURE__ */ notImplemented("crypto.createVerify");
    diffieHellman = /* @__PURE__ */ notImplemented("crypto.diffieHellman");
    getCipherInfo = /* @__PURE__ */ notImplemented("crypto.getCipherInfo");
    privateDecrypt = /* @__PURE__ */ notImplemented("crypto.privateDecrypt");
    privateEncrypt = /* @__PURE__ */ notImplemented("crypto.privateEncrypt");
    publicDecrypt = /* @__PURE__ */ notImplemented("crypto.publicDecrypt");
    publicEncrypt = /* @__PURE__ */ notImplemented("crypto.publicEncrypt");
    sign = /* @__PURE__ */ notImplemented("crypto.sign");
    verify = /* @__PURE__ */ notImplemented("crypto.verify");
    hash = /* @__PURE__ */ notImplemented("crypto.hash");
    Cipher = /* @__PURE__ */ notImplementedClass("crypto.Cipher");
    Cipheriv = /* @__PURE__ */ notImplementedClass(
      "crypto.Cipheriv"
      // @ts-expect-error not typed yet
    );
    Decipher = /* @__PURE__ */ notImplementedClass("crypto.Decipher");
    Decipheriv = /* @__PURE__ */ notImplementedClass(
      "crypto.Decipheriv"
      // @ts-expect-error not typed yet
    );
    ECDH = /* @__PURE__ */ notImplementedClass("crypto.ECDH");
    Sign = /* @__PURE__ */ notImplementedClass("crypto.Sign");
    Verify = /* @__PURE__ */ notImplementedClass("crypto.Verify");
  }
});

// node_modules/unenv/dist/runtime/node/internal/crypto/constants.mjs
var SSL_OP_ALL, SSL_OP_ALLOW_NO_DHE_KEX, SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION, SSL_OP_CIPHER_SERVER_PREFERENCE, SSL_OP_CISCO_ANYCONNECT, SSL_OP_COOKIE_EXCHANGE, SSL_OP_CRYPTOPRO_TLSEXT_BUG, SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS, SSL_OP_LEGACY_SERVER_CONNECT, SSL_OP_NO_COMPRESSION, SSL_OP_NO_ENCRYPT_THEN_MAC, SSL_OP_NO_QUERY_MTU, SSL_OP_NO_RENEGOTIATION, SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION, SSL_OP_NO_SSLv2, SSL_OP_NO_SSLv3, SSL_OP_NO_TICKET, SSL_OP_NO_TLSv1, SSL_OP_NO_TLSv1_1, SSL_OP_NO_TLSv1_2, SSL_OP_NO_TLSv1_3, SSL_OP_PRIORITIZE_CHACHA, SSL_OP_TLS_ROLLBACK_BUG, ENGINE_METHOD_RSA, ENGINE_METHOD_DSA, ENGINE_METHOD_DH, ENGINE_METHOD_RAND, ENGINE_METHOD_EC, ENGINE_METHOD_CIPHERS, ENGINE_METHOD_DIGESTS, ENGINE_METHOD_PKEY_METHS, ENGINE_METHOD_PKEY_ASN1_METHS, ENGINE_METHOD_ALL, ENGINE_METHOD_NONE, DH_CHECK_P_NOT_SAFE_PRIME, DH_CHECK_P_NOT_PRIME, DH_UNABLE_TO_CHECK_GENERATOR, DH_NOT_SUITABLE_GENERATOR, RSA_PKCS1_PADDING, RSA_NO_PADDING, RSA_PKCS1_OAEP_PADDING, RSA_X931_PADDING, RSA_PKCS1_PSS_PADDING, RSA_PSS_SALTLEN_DIGEST, RSA_PSS_SALTLEN_MAX_SIGN, RSA_PSS_SALTLEN_AUTO, POINT_CONVERSION_COMPRESSED, POINT_CONVERSION_UNCOMPRESSED, POINT_CONVERSION_HYBRID, defaultCoreCipherList, defaultCipherList, OPENSSL_VERSION_NUMBER, TLS1_VERSION, TLS1_1_VERSION, TLS1_2_VERSION, TLS1_3_VERSION;
var init_constants3 = __esm({
  "node_modules/unenv/dist/runtime/node/internal/crypto/constants.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    SSL_OP_ALL = 2147485776;
    SSL_OP_ALLOW_NO_DHE_KEX = 1024;
    SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION = 262144;
    SSL_OP_CIPHER_SERVER_PREFERENCE = 4194304;
    SSL_OP_CISCO_ANYCONNECT = 32768;
    SSL_OP_COOKIE_EXCHANGE = 8192;
    SSL_OP_CRYPTOPRO_TLSEXT_BUG = 2147483648;
    SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS = 2048;
    SSL_OP_LEGACY_SERVER_CONNECT = 4;
    SSL_OP_NO_COMPRESSION = 131072;
    SSL_OP_NO_ENCRYPT_THEN_MAC = 524288;
    SSL_OP_NO_QUERY_MTU = 4096;
    SSL_OP_NO_RENEGOTIATION = 1073741824;
    SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION = 65536;
    SSL_OP_NO_SSLv2 = 0;
    SSL_OP_NO_SSLv3 = 33554432;
    SSL_OP_NO_TICKET = 16384;
    SSL_OP_NO_TLSv1 = 67108864;
    SSL_OP_NO_TLSv1_1 = 268435456;
    SSL_OP_NO_TLSv1_2 = 134217728;
    SSL_OP_NO_TLSv1_3 = 536870912;
    SSL_OP_PRIORITIZE_CHACHA = 2097152;
    SSL_OP_TLS_ROLLBACK_BUG = 8388608;
    ENGINE_METHOD_RSA = 1;
    ENGINE_METHOD_DSA = 2;
    ENGINE_METHOD_DH = 4;
    ENGINE_METHOD_RAND = 8;
    ENGINE_METHOD_EC = 2048;
    ENGINE_METHOD_CIPHERS = 64;
    ENGINE_METHOD_DIGESTS = 128;
    ENGINE_METHOD_PKEY_METHS = 512;
    ENGINE_METHOD_PKEY_ASN1_METHS = 1024;
    ENGINE_METHOD_ALL = 65535;
    ENGINE_METHOD_NONE = 0;
    DH_CHECK_P_NOT_SAFE_PRIME = 2;
    DH_CHECK_P_NOT_PRIME = 1;
    DH_UNABLE_TO_CHECK_GENERATOR = 4;
    DH_NOT_SUITABLE_GENERATOR = 8;
    RSA_PKCS1_PADDING = 1;
    RSA_NO_PADDING = 3;
    RSA_PKCS1_OAEP_PADDING = 4;
    RSA_X931_PADDING = 5;
    RSA_PKCS1_PSS_PADDING = 6;
    RSA_PSS_SALTLEN_DIGEST = -1;
    RSA_PSS_SALTLEN_MAX_SIGN = -2;
    RSA_PSS_SALTLEN_AUTO = -2;
    POINT_CONVERSION_COMPRESSED = 2;
    POINT_CONVERSION_UNCOMPRESSED = 4;
    POINT_CONVERSION_HYBRID = 6;
    defaultCoreCipherList = "";
    defaultCipherList = "";
    OPENSSL_VERSION_NUMBER = 0;
    TLS1_VERSION = 0;
    TLS1_1_VERSION = 0;
    TLS1_2_VERSION = 0;
    TLS1_3_VERSION = 0;
  }
});

// node_modules/unenv/dist/runtime/node/crypto.mjs
var constants2;
var init_crypto = __esm({
  "node_modules/unenv/dist/runtime/node/crypto.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_constants3();
    init_web();
    init_node();
    constants2 = {
      OPENSSL_VERSION_NUMBER,
      SSL_OP_ALL,
      SSL_OP_ALLOW_NO_DHE_KEX,
      SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION,
      SSL_OP_CIPHER_SERVER_PREFERENCE,
      SSL_OP_CISCO_ANYCONNECT,
      SSL_OP_COOKIE_EXCHANGE,
      SSL_OP_CRYPTOPRO_TLSEXT_BUG,
      SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS,
      SSL_OP_LEGACY_SERVER_CONNECT,
      SSL_OP_NO_COMPRESSION,
      SSL_OP_NO_ENCRYPT_THEN_MAC,
      SSL_OP_NO_QUERY_MTU,
      SSL_OP_NO_RENEGOTIATION,
      SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION,
      SSL_OP_NO_SSLv2,
      SSL_OP_NO_SSLv3,
      SSL_OP_NO_TICKET,
      SSL_OP_NO_TLSv1,
      SSL_OP_NO_TLSv1_1,
      SSL_OP_NO_TLSv1_2,
      SSL_OP_NO_TLSv1_3,
      SSL_OP_PRIORITIZE_CHACHA,
      SSL_OP_TLS_ROLLBACK_BUG,
      ENGINE_METHOD_RSA,
      ENGINE_METHOD_DSA,
      ENGINE_METHOD_DH,
      ENGINE_METHOD_RAND,
      ENGINE_METHOD_EC,
      ENGINE_METHOD_CIPHERS,
      ENGINE_METHOD_DIGESTS,
      ENGINE_METHOD_PKEY_METHS,
      ENGINE_METHOD_PKEY_ASN1_METHS,
      ENGINE_METHOD_ALL,
      ENGINE_METHOD_NONE,
      DH_CHECK_P_NOT_SAFE_PRIME,
      DH_CHECK_P_NOT_PRIME,
      DH_UNABLE_TO_CHECK_GENERATOR,
      DH_NOT_SUITABLE_GENERATOR,
      RSA_PKCS1_PADDING,
      RSA_NO_PADDING,
      RSA_PKCS1_OAEP_PADDING,
      RSA_X931_PADDING,
      RSA_PKCS1_PSS_PADDING,
      RSA_PSS_SALTLEN_DIGEST,
      RSA_PSS_SALTLEN_MAX_SIGN,
      RSA_PSS_SALTLEN_AUTO,
      defaultCoreCipherList,
      TLS1_VERSION,
      TLS1_1_VERSION,
      TLS1_2_VERSION,
      TLS1_3_VERSION,
      POINT_CONVERSION_COMPRESSED,
      POINT_CONVERSION_UNCOMPRESSED,
      POINT_CONVERSION_HYBRID,
      defaultCipherList
    };
  }
});

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/crypto.mjs
var crypto_exports = {};
__export(crypto_exports, {
  Certificate: () => Certificate,
  Cipher: () => Cipher,
  Cipheriv: () => Cipheriv,
  Decipher: () => Decipher,
  Decipheriv: () => Decipheriv,
  DiffieHellman: () => DiffieHellman,
  DiffieHellmanGroup: () => DiffieHellmanGroup,
  ECDH: () => ECDH,
  Hash: () => Hash,
  Hmac: () => Hmac,
  KeyObject: () => KeyObject,
  Sign: () => Sign,
  Verify: () => Verify,
  X509Certificate: () => X509Certificate,
  checkPrime: () => checkPrime,
  checkPrimeSync: () => checkPrimeSync,
  constants: () => constants2,
  createCipheriv: () => createCipheriv,
  createDecipheriv: () => createDecipheriv,
  createDiffieHellman: () => createDiffieHellman,
  createDiffieHellmanGroup: () => createDiffieHellmanGroup,
  createECDH: () => createECDH,
  createHash: () => createHash,
  createHmac: () => createHmac,
  createPrivateKey: () => createPrivateKey,
  createPublicKey: () => createPublicKey,
  createSecretKey: () => createSecretKey,
  createSign: () => createSign,
  createVerify: () => createVerify,
  default: () => crypto_default,
  diffieHellman: () => diffieHellman,
  generateKey: () => generateKey,
  generateKeyPair: () => generateKeyPair,
  generateKeyPairSync: () => generateKeyPairSync,
  generateKeySync: () => generateKeySync,
  generatePrime: () => generatePrime,
  generatePrimeSync: () => generatePrimeSync,
  getCipherInfo: () => getCipherInfo,
  getCiphers: () => getCiphers,
  getCurves: () => getCurves,
  getDiffieHellman: () => getDiffieHellman,
  getFips: () => getFips,
  getHashes: () => getHashes,
  getRandomValues: () => getRandomValues,
  hash: () => hash,
  hkdf: () => hkdf,
  hkdfSync: () => hkdfSync,
  pbkdf2: () => pbkdf2,
  pbkdf2Sync: () => pbkdf2Sync,
  privateDecrypt: () => privateDecrypt,
  privateEncrypt: () => privateEncrypt,
  publicDecrypt: () => publicDecrypt,
  publicEncrypt: () => publicEncrypt,
  randomBytes: () => randomBytes,
  randomFill: () => randomFill,
  randomFillSync: () => randomFillSync,
  randomInt: () => randomInt,
  randomUUID: () => randomUUID,
  scrypt: () => scrypt,
  scryptSync: () => scryptSync,
  secureHeapUsed: () => secureHeapUsed,
  setEngine: () => setEngine,
  setFips: () => setFips,
  sign: () => sign,
  subtle: () => subtle2,
  timingSafeEqual: () => timingSafeEqual,
  verify: () => verify,
  webcrypto: () => webcrypto2
});
var workerdCrypto, Certificate, DiffieHellman, DiffieHellmanGroup, Hash, Hmac, KeyObject, X509Certificate, checkPrime, checkPrimeSync, createDiffieHellman, createDiffieHellmanGroup, createHash, createHmac, createPrivateKey, createPublicKey, createSecretKey, generateKey, generateKeyPair, generateKeyPairSync, generateKeySync, generatePrime, generatePrimeSync, getCiphers, getCurves, getDiffieHellman, getFips, getHashes, hkdf, hkdfSync, pbkdf2, pbkdf2Sync, randomBytes, randomFill, randomFillSync, randomInt, randomUUID, scrypt, scryptSync, secureHeapUsed, setEngine, setFips, subtle2, timingSafeEqual, getRandomValues, webcrypto2, fips, crypto_default;
var init_crypto2 = __esm({
  "node_modules/@cloudflare/unenv-preset/dist/runtime/node/crypto.mjs"() {
    init_strip_cf_connecting_ip_header();
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_crypto();
    init_crypto();
    workerdCrypto = process.getBuiltinModule("node:crypto");
    ({
      Certificate,
      DiffieHellman,
      DiffieHellmanGroup,
      Hash,
      Hmac,
      KeyObject,
      X509Certificate,
      checkPrime,
      checkPrimeSync,
      createDiffieHellman,
      createDiffieHellmanGroup,
      createHash,
      createHmac,
      createPrivateKey,
      createPublicKey,
      createSecretKey,
      generateKey,
      generateKeyPair,
      generateKeyPairSync,
      generateKeySync,
      generatePrime,
      generatePrimeSync,
      getCiphers,
      getCurves,
      getDiffieHellman,
      getFips,
      getHashes,
      hkdf,
      hkdfSync,
      pbkdf2,
      pbkdf2Sync,
      randomBytes,
      randomFill,
      randomFillSync,
      randomInt,
      randomUUID,
      scrypt,
      scryptSync,
      secureHeapUsed,
      setEngine,
      setFips,
      subtle: subtle2,
      timingSafeEqual
    } = workerdCrypto);
    getRandomValues = workerdCrypto.getRandomValues.bind(
      workerdCrypto.webcrypto
    );
    webcrypto2 = {
      // @ts-expect-error unenv has unknown type
      CryptoKey: webcrypto.CryptoKey,
      getRandomValues,
      randomUUID,
      subtle: subtle2
    };
    fips = workerdCrypto.fips;
    crypto_default = {
      /**
       * manually unroll unenv-polyfilled-symbols to make it tree-shakeable
       */
      Certificate,
      Cipher,
      Cipheriv,
      Decipher,
      Decipheriv,
      ECDH,
      Sign,
      Verify,
      X509Certificate,
      // @ts-expect-error @types/node is out of date - this is a bug in typings
      constants: constants2,
      // @ts-expect-error unenv has unknown type
      createCipheriv,
      // @ts-expect-error unenv has unknown type
      createDecipheriv,
      // @ts-expect-error unenv has unknown type
      createECDH,
      // @ts-expect-error unenv has unknown type
      createSign,
      // @ts-expect-error unenv has unknown type
      createVerify,
      // @ts-expect-error unenv has unknown type
      diffieHellman,
      // @ts-expect-error unenv has unknown type
      getCipherInfo,
      // @ts-expect-error unenv has unknown type
      hash,
      // @ts-expect-error unenv has unknown type
      privateDecrypt,
      // @ts-expect-error unenv has unknown type
      privateEncrypt,
      // @ts-expect-error unenv has unknown type
      publicDecrypt,
      // @ts-expect-error unenv has unknown type
      publicEncrypt,
      scrypt,
      scryptSync,
      // @ts-expect-error unenv has unknown type
      sign,
      // @ts-expect-error unenv has unknown type
      verify,
      // default-only export from unenv
      // @ts-expect-error unenv has unknown type
      createCipher,
      // @ts-expect-error unenv has unknown type
      createDecipher,
      // @ts-expect-error unenv has unknown type
      pseudoRandomBytes,
      /**
       * manually unroll workerd-polyfilled-symbols to make it tree-shakeable
       */
      DiffieHellman,
      DiffieHellmanGroup,
      Hash,
      Hmac,
      KeyObject,
      checkPrime,
      checkPrimeSync,
      createDiffieHellman,
      createDiffieHellmanGroup,
      createHash,
      createHmac,
      createPrivateKey,
      createPublicKey,
      createSecretKey,
      generateKey,
      generateKeyPair,
      generateKeyPairSync,
      generateKeySync,
      generatePrime,
      generatePrimeSync,
      getCiphers,
      getCurves,
      getDiffieHellman,
      getFips,
      getHashes,
      getRandomValues,
      hkdf,
      hkdfSync,
      pbkdf2,
      pbkdf2Sync,
      randomBytes,
      randomFill,
      randomFillSync,
      randomInt,
      randomUUID,
      secureHeapUsed,
      setEngine,
      setFips,
      subtle: subtle2,
      timingSafeEqual,
      // default-only export from workerd
      fips,
      // special-cased deep merged symbols
      webcrypto: webcrypto2
    };
  }
});

// .wrangler/tmp/bundle-DCrqMO/middleware-loader.entry.ts
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// .wrangler/tmp/bundle-DCrqMO/middleware-insertion-facade.js
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// src/worker.ts
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// src/lib/tor.ts
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
import { connect } from "cloudflare:sockets";
import torWasmModule from "./00a3d0fdb1254a2a92f6ad8a4925bcfe3a3cc352-tor_js_bg.wasm";

// node_modules/tor-js/dist/entryPoints/wasm-cdn/index.js
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var __defProp2 = Object.defineProperty;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __esm2 = /* @__PURE__ */ __name((fn, res) => /* @__PURE__ */ __name(function __init() {
  return fn && (res = (0, fn[__getOwnPropNames2(fn)[0]])(fn = 0)), res;
}, "__init"), "__esm");
var __export2 = /* @__PURE__ */ __name((target, all) => {
  for (var name in all)
    __defProp2(target, name, { get: all[name], enumerable: true });
}, "__export");
function parseAddress2(s) {
  const malformed = /* @__PURE__ */ __name(() => new Error(`address: malformed (expected <ip>:<port>:<certhash> or [ipv6]:<port>:<certhash>): ${s}`), "malformed");
  let ip;
  let rest;
  if (s.startsWith("[")) {
    const end = s.indexOf("]");
    if (end < 0 || s[end + 1] !== ":")
      throw malformed();
    ip = s.slice(1, end);
    rest = s.slice(end + 2);
  } else {
    const i = s.indexOf(":");
    if (i < 0)
      throw malformed();
    ip = s.slice(0, i);
    rest = s.slice(i + 1);
  }
  const j = rest.indexOf(":");
  if (j < 0)
    throw malformed();
  const portStr = rest.slice(0, j);
  const certhash = rest.slice(j + 1);
  if (!/^\d+$/.test(portStr))
    throw malformed();
  const port = Number(portStr);
  if (port < 1 || port > 65535)
    throw new Error("address: port out of range");
  if (!ip || !certhash)
    throw malformed();
  return { ip, port, certhash };
}
__name(parseAddress2, "parseAddress2");
function formatAddress2(addr) {
  const host = addr.ip.includes(":") ? `[${addr.ip}]` : addr.ip;
  return `${host}:${addr.port}:${addr.certhash}`;
}
__name(formatAddress2, "formatAddress2");
var init_address = __esm2({
  "node_modules/@kpstreams/core/dist/address.js"() {
    "use strict";
  }
});
function decodeCerthash(s) {
  if (!s.startsWith(MULTIBASE_BASE64URL_NOPAD)) {
    throw new Error(`certhash: expected multibase prefix '${MULTIBASE_BASE64URL_NOPAD}', got '${s[0] ?? ""}'`);
  }
  const bytes = base64urlDecode(s.slice(1));
  if (bytes.length !== 2 + MULTIHASH_SHA256_LEN) {
    throw new Error(`certhash: expected ${2 + MULTIHASH_SHA256_LEN} bytes, got ${bytes.length}`);
  }
  if (bytes[0] !== MULTIHASH_SHA256_CODE || bytes[1] !== MULTIHASH_SHA256_LEN) {
    throw new Error(`certhash: not a sha2-256 multihash (prefix ${bytes[0].toString(16)} ${bytes[1].toString(16)})`);
  }
  return bytes.slice(2);
}
__name(decodeCerthash, "decodeCerthash");
function digestToSdpFingerprint(digest) {
  return Array.from(digest, (b) => b.toString(16).padStart(2, "0").toUpperCase()).join(":");
}
__name(digestToSdpFingerprint, "digestToSdpFingerprint");
function base64urlDecode(s) {
  const pad = (4 - s.length % 4) % 4;
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat(pad);
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++)
    out[i] = bin.charCodeAt(i);
  return out;
}
__name(base64urlDecode, "base64urlDecode");
var MULTIBASE_BASE64URL_NOPAD;
var MULTIHASH_SHA256_CODE;
var MULTIHASH_SHA256_LEN;
var init_certhash = __esm2({
  "node_modules/@kpstreams/core/dist/certhash.js"() {
    "use strict";
    MULTIBASE_BASE64URL_NOPAD = "u";
    MULTIHASH_SHA256_CODE = 18;
    MULTIHASH_SHA256_LEN = 32;
  }
});
function streamError(reason) {
  const e = new Error(reason.message ?? `kps: stream ${reason.code ?? "reset"}`);
  e.code = reason.code;
  return e;
}
__name(streamError, "streamError");
function reasonFrom(x) {
  if (x == null)
    return void 0;
  if (typeof x === "object" && ("code" in x || "message" in x))
    return x;
  return { message: String(x?.message ?? x) };
}
__name(reasonFrom, "reasonFrom");
var init_errors = __esm2({
  "node_modules/@kpstreams/core/dist/errors.js"() {
    "use strict";
  }
});
var init_dist = __esm2({
  "node_modules/@kpstreams/core/dist/index.js"() {
    "use strict";
    init_address();
    init_certhash();
  }
});
function codeToNum(code) {
  return code ? CODE_TO_NUM[code] ?? 0 : 0;
}
__name(codeToNum, "codeToNum");
function numToCode(n) {
  return n === 0 ? void 0 : NUM_TO_CODE[n] ?? "internal-error";
}
__name(numToCode, "numToCode");
function encodeData(payload) {
  const out = new Uint8Array(1 + payload.length);
  out[0] = FRAME_DATA;
  out.set(payload, 1);
  return out;
}
__name(encodeData, "encodeData");
function encodeFin() {
  return new Uint8Array([FRAME_FIN]);
}
__name(encodeFin, "encodeFin");
function encodeCode(type2, code) {
  const out = new Uint8Array(5);
  out[0] = type2;
  new DataView(out.buffer).setUint32(1, code >>> 0, false);
  return out;
}
__name(encodeCode, "encodeCode");
function encodeMaxStreamData(value) {
  const out = new Uint8Array(9);
  out[0] = FRAME_MAX_STREAM_DATA;
  new DataView(out.buffer).setBigUint64(1, value, false);
  return out;
}
__name(encodeMaxStreamData, "encodeMaxStreamData");
function parseFrame(data) {
  if (data.length === 0)
    throw new ProtocolViolation("empty data-channel message");
  if (data.length > MAX_WEBRTC_FRAME_SIZE) {
    throw new ProtocolViolation(`frame exceeds ${MAX_WEBRTC_FRAME_SIZE} bytes (${data.length})`);
  }
  const type2 = data[0];
  const payload = data.subarray(1);
  const view = /* @__PURE__ */ __name(() => new DataView(payload.buffer, payload.byteOffset, payload.byteLength), "view");
  switch (type2) {
    case FRAME_DATA:
      if (payload.length === 0)
        throw new ProtocolViolation("empty DATA frame");
      return { type: "data", payload };
    case FRAME_FIN:
      if (payload.length !== 0)
        throw new ProtocolViolation("FIN with payload");
      return { type: "fin" };
    case FRAME_RESET:
      if (payload.length !== 4)
        throw new ProtocolViolation("RESET payload must be 4 bytes");
      return { type: "reset", code: view().getUint32(0, false) };
    case FRAME_STOP_SENDING:
      if (payload.length !== 4)
        throw new ProtocolViolation("STOP_SENDING payload must be 4 bytes");
      return { type: "stop-sending", code: view().getUint32(0, false) };
    case FRAME_MAX_STREAM_DATA: {
      if (payload.length !== 8)
        throw new ProtocolViolation("MAX_STREAM_DATA payload must be 8 bytes");
      const value = view().getBigUint64(0, false);
      if (value > MAX_OFFSET)
        throw new ProtocolViolation("MAX_STREAM_DATA above MAX_OFFSET");
      return { type: "max-stream-data", value };
    }
    default:
      throw new ProtocolViolation(`unknown frame type 0x${type2.toString(16)}`);
  }
}
__name(parseFrame, "parseFrame");
var FRAME_DATA;
var FRAME_FIN;
var FRAME_RESET;
var FRAME_STOP_SENDING;
var FRAME_MAX_STREAM_DATA;
var MAX_WEBRTC_FRAME_SIZE;
var MAX_FRAME_PAYLOAD;
var MAX_OFFSET;
var ProtocolViolation;
var CODE_TO_NUM;
var NUM_TO_CODE;
var init_framing = __esm2({
  "node_modules/@kpstreams/core/dist/framing.js"() {
    "use strict";
    FRAME_DATA = 0;
    FRAME_FIN = 1;
    FRAME_RESET = 2;
    FRAME_STOP_SENDING = 3;
    FRAME_MAX_STREAM_DATA = 4;
    MAX_WEBRTC_FRAME_SIZE = 16384;
    MAX_FRAME_PAYLOAD = MAX_WEBRTC_FRAME_SIZE - 1;
    MAX_OFFSET = (1n << 62n) - 1n;
    ProtocolViolation = /* @__PURE__ */ __name(class extends Error {
    }, "ProtocolViolation");
    CODE_TO_NUM = {
      cancelled: 1,
      closed: 2,
      reset: 3,
      timeout: 4,
      "network-error": 5,
      "protocol-error": 6,
      unsupported: 7,
      "too-large": 8,
      "queue-full": 9,
      "permission-denied": 10,
      "internal-error": 11
    };
    NUM_TO_CODE = Object.fromEntries(Object.entries(CODE_TO_NUM).map(([k, v]) => [v, k]));
  }
});
function encodeConnClose(code) {
  const out = new Uint8Array(5);
  out[0] = CTRL_CONNECTION_CLOSE;
  new DataView(out.buffer).setUint32(1, codeToNum(code), false);
  return out;
}
__name(encodeConnClose, "encodeConnClose");
function encodeHello(limits, version3 = WIRE_VERSION) {
  const out = new Uint8Array(26);
  const v = new DataView(out.buffer);
  out[0] = CTRL_HELLO;
  out[1] = version3;
  v.setBigUint64(2, limits.initialMaxStreamData, false);
  v.setBigUint64(10, limits.initialMaxData, false);
  v.setBigUint64(18, limits.initialMaxStreams, false);
  return out;
}
__name(encodeHello, "encodeHello");
function encodeMaxData(value) {
  const out = new Uint8Array(9);
  out[0] = CTRL_MAX_DATA;
  new DataView(out.buffer).setBigUint64(1, value, false);
  return out;
}
__name(encodeMaxData, "encodeMaxData");
function encodeMaxStreams(value) {
  const out = new Uint8Array(9);
  out[0] = CTRL_MAX_STREAMS;
  new DataView(out.buffer).setBigUint64(1, value, false);
  return out;
}
__name(encodeMaxStreams, "encodeMaxStreams");
function decodeControl(data) {
  if (data.length === 0)
    throw new ProtocolViolation("empty control message");
  const type2 = data[0];
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  switch (type2) {
    case CTRL_CONNECTION_CLOSE:
      if (data.length !== 5)
        throw new ProtocolViolation("CONNECTION_CLOSE must be 5 bytes");
      return { t: "close", code: view.getUint32(1, false) };
    case CTRL_HELLO: {
      if (data.length !== 26)
        throw new ProtocolViolation("HELLO must be 26 bytes");
      const limits = {
        initialMaxStreamData: view.getBigUint64(2, false),
        initialMaxData: view.getBigUint64(10, false),
        initialMaxStreams: view.getBigUint64(18, false)
      };
      for (const v of Object.values(limits)) {
        if (v > MAX_OFFSET)
          throw new ProtocolViolation("HELLO credit above MAX_OFFSET");
      }
      return { t: "hello", version: data[1], limits };
    }
    case CTRL_MAX_DATA: {
      if (data.length !== 9)
        throw new ProtocolViolation("MAX_DATA must be 9 bytes");
      const value = view.getBigUint64(1, false);
      if (value > MAX_OFFSET)
        throw new ProtocolViolation("MAX_DATA above MAX_OFFSET");
      return { t: "max-data", value };
    }
    case CTRL_MAX_STREAMS: {
      if (data.length !== 9)
        throw new ProtocolViolation("MAX_STREAMS must be 9 bytes");
      const value = view.getBigUint64(1, false);
      if (value > MAX_OFFSET)
        throw new ProtocolViolation("MAX_STREAMS above MAX_OFFSET");
      return { t: "max-streams", value };
    }
    default:
      throw new ProtocolViolation(`unknown control message type 0x${type2.toString(16)}`);
  }
}
__name(decodeControl, "decodeControl");
var CTRL_CONNECTION_CLOSE;
var CTRL_HELLO;
var CTRL_MAX_DATA;
var CTRL_MAX_STREAMS;
var WIRE_VERSION;
var init_control = __esm2({
  "node_modules/@kpstreams/core/dist/control.js"() {
    "use strict";
    init_framing();
    CTRL_CONNECTION_CLOSE = 0;
    CTRL_HELLO = 1;
    CTRL_MAX_DATA = 2;
    CTRL_MAX_STREAMS = 3;
    WIRE_VERSION = 1;
  }
});
function resolveLimits(partial) {
  return {
    initialMaxStreamData: partial?.initialMaxStreamData ?? DEFAULT_INITIAL_MAX_STREAM_DATA,
    initialMaxData: partial?.initialMaxData ?? DEFAULT_INITIAL_MAX_DATA,
    initialMaxStreams: partial?.initialMaxStreams ?? DEFAULT_INITIAL_MAX_STREAMS
  };
}
__name(resolveLimits, "resolveLimits");
function saturate(v) {
  return v > MAX_OFFSET ? MAX_OFFSET : v;
}
__name(saturate, "saturate");
var DEFAULT_INITIAL_MAX_STREAM_DATA;
var DEFAULT_INITIAL_MAX_DATA;
var DEFAULT_INITIAL_MAX_STREAMS;
var Wakeable;
var ConnFlow;
var StreamFlow;
var init_flow = __esm2({
  "node_modules/@kpstreams/core/dist/flow.js"() {
    "use strict";
    init_framing();
    DEFAULT_INITIAL_MAX_STREAM_DATA = 1n << 20n;
    DEFAULT_INITIAL_MAX_DATA = 8n << 20n;
    DEFAULT_INITIAL_MAX_STREAMS = 100n;
    Wakeable = /* @__PURE__ */ __name(class {
      #resolvers = [];
      wake() {
        const rs = this.#resolvers;
        this.#resolvers = [];
        for (const r of rs)
          r();
      }
      wait(signal) {
        return new Promise((resolve, reject) => {
          if (signal) {
            const onAbort = /* @__PURE__ */ __name(() => reject(new Error("kps: aborted")), "onAbort");
            signal.addEventListener("abort", onAbort, { once: true });
            this.#resolvers.push(() => {
              signal.removeEventListener("abort", onAbort);
              resolve();
            });
          } else {
            this.#resolvers.push(resolve);
          }
        });
      }
    }, "Wakeable");
    ConnFlow = /* @__PURE__ */ __name(class {
      // ---- our receive policy (what we grant the peer) ----
      local;
      // ---- sender side (peer-granted, all zero until the peer's HELLO) ----
      #peerMaxStreamDataInitial = 0n;
      // seeds each new StreamFlow's send window
      #peerMaxData = 0n;
      #peerMaxStreams = 0n;
      #connSent = 0n;
      #connReserved = 0n;
      #streamsOpened = 0n;
      #streamsReserved = 0n;
      // ---- receiver side ----
      #localMaxData;
      // enforcement limit (advances at commit-to-send)
      #connReceived = 0n;
      #connConsumed = 0n;
      #connAdvertisedAt = 0n;
      // connConsumed value at the last advertisement
      #peerOpenedStreams = 0n;
      #peerRetiredStreams = 0n;
      #advertisedMaxStreams;
      #credit = new Wakeable();
      #failure = null;
      #sink;
      constructor(local, sink) {
        this.local = local;
        this.#localMaxData = local.initialMaxData;
        this.#advertisedMaxStreams = local.initialMaxStreams;
        this.#sink = sink;
      }
      /** The peer's HELLO: seed every send-side limit. */
      onPeerHello(limits) {
        this.#peerMaxStreamDataInitial = limits.initialMaxStreamData;
        this.#peerMaxData = limits.initialMaxData;
        this.#peerMaxStreams = limits.initialMaxStreams;
        this.#credit.wake();
      }
      /** Peer raised the connection data limit (MAX_DATA). Decreases are ignored. */
      onPeerMaxData(value) {
        if (value > this.#peerMaxData) {
          this.#peerMaxData = value;
          this.#credit.wake();
        }
      }
      /** Peer raised the stream-count limit (MAX_STREAMS). Decreases are ignored. */
      onPeerMaxStreams(value) {
        if (value > this.#peerMaxStreams) {
          this.#peerMaxStreams = value;
          this.#credit.wake();
        }
      }
      /** Fail every pending and future credit wait (connection teardown). */
      fail(err) {
        if (this.#failure)
          return;
        this.#failure = err;
        this.#credit.wake();
      }
      /** Wake blocked reservations so they re-check (stream credit or failure). */
      wake() {
        this.#credit.wake();
      }
      get failed() {
        return this.#failure;
      }
      /**
       * The peer's per-stream initial window. A getter (not copied into
       * StreamFlow) so streams staged before the peer's HELLO see the window the
       * moment it arrives.
       */
      get peerInitialMaxStreamData() {
        return this.#peerMaxStreamDataInitial;
      }
      newStream(sendMaxStreamData) {
        return new StreamFlow(this, this.local.initialMaxStreamData, sendMaxStreamData);
      }
      // ---- sender: byte credit (called via StreamFlow) ----
      /**
       * Reserve up to `n` DATA payload bytes at both levels, waiting until at
       * least one byte of credit is available (a writer larger than the whole
       * window must split at the window boundary, like a QUIC sender — an
       * all-or-nothing reservation would deadlock). Returns the granted amount
       * (1..n). Rejects if the stream's write half fails (STOP_SENDING, reset,
       * close), the connection fails, or `signal` aborts.
       */
      async reserveData(sf, n, signal) {
        for (; ; ) {
          if (this.#failure)
            throw this.#failure;
          const sfErr = sf.sendFailed;
          if (sfErr)
            throw sfErr;
          if (signal?.aborted)
            throw new Error("kps: aborted");
          const streamAvail = sf.peerMaxStreamData - sf.sendSent - sf.sendReserved;
          const connAvail = this.#peerMaxData - this.#connSent - this.#connReserved;
          let grant = streamAvail < connAvail ? streamAvail : connAvail;
          if (grant > n)
            grant = n;
          if (grant >= 1n) {
            sf.sendReserved += grant;
            this.#connReserved += grant;
            return grant;
          }
          await this.#credit.wait(signal);
        }
      }
      /** Bytes passed to the transport: reserved → sent, both levels. */
      commitData(sf, n) {
        sf.sendReserved -= n;
        sf.sendSent += n;
        this.#connReserved -= n;
        this.#connSent += n;
      }
      /** A reserved-but-unsent frame was discarded: release its reservation. */
      releaseData(sf, n) {
        sf.sendReserved -= n;
        this.#connReserved -= n;
        this.#credit.wake();
      }
      // ---- sender: stream slots ----
      /** Reserve a slot to open one stream, waiting at the limit. */
      async reserveStreamSlot(signal) {
        for (; ; ) {
          if (this.#failure)
            throw this.#failure;
          if (signal?.aborted)
            throw new Error("kps: aborted");
          if (this.#streamsOpened + this.#streamsReserved < this.#peerMaxStreams) {
            this.#streamsReserved += 1n;
            return;
          }
          await this.#credit.wait(signal);
        }
      }
      /** Channel creation succeeded: the cumulative count never decreases. */
      commitStreamSlot() {
        this.#streamsReserved -= 1n;
        this.#streamsOpened += 1n;
      }
      /** Channel creation failed synchronously: release the slot. */
      releaseStreamSlot() {
        this.#streamsReserved -= 1n;
        this.#credit.wake();
      }
      // ---- receiver: byte credit (called via StreamFlow) ----
      /** @throws ProtocolViolation when the peer exceeds the connection window. */
      connDataReceived(n) {
        if (this.#connReceived + n > this.#localMaxData) {
          throw new ProtocolViolation("peer exceeded MAX_DATA");
        }
        this.#connReceived += n;
      }
      connDataConsumed(n) {
        this.#connConsumed += n;
        const window2 = this.local.initialMaxData;
        if (this.#connConsumed - this.#connAdvertisedAt >= window2 / 2n) {
          this.#connAdvertisedAt = this.#connConsumed;
          this.#localMaxData = saturate(this.#connConsumed + window2);
          this.#sink.sendMaxData(this.#localMaxData);
        }
      }
      // ---- receiver: stream count ----
      /**
       * A peer-initiated stream was observed (it consumes a slot immediately, even
       * unaccepted or pre-HELLO).
       * @throws ProtocolViolation when the peer exceeds MAX_STREAMS.
       */
      peerStreamOpened() {
        if (this.#peerOpenedStreams >= this.#advertisedMaxStreams) {
          throw new ProtocolViolation("peer exceeded MAX_STREAMS");
        }
        this.#peerOpenedStreams += 1n;
      }
      /** A peer-initiated stream retired: grant a replacement slot. */
      peerStreamRetired() {
        this.#peerRetiredStreams += 1n;
        this.#advertisedMaxStreams = saturate(this.local.initialMaxStreams + this.#peerRetiredStreams);
        this.#sink.sendMaxStreams(this.#advertisedMaxStreams);
      }
    }, "ConnFlow");
    StreamFlow = /* @__PURE__ */ __name(class {
      // sender side
      sendSent = 0n;
      sendReserved = 0n;
      #peerMaxExplicit = 0n;
      // largest MAX_STREAM_DATA received on this stream
      #sendFailure = null;
      // receiver side
      #localMaxStreamData;
      // enforcement limit
      #received = 0n;
      #consumed = 0n;
      #advertisedAt = 0n;
      #cancelled = false;
      // local cancelRead: no further stream credit
      #conn;
      #sendMaxStreamData;
      constructor(conn, localMaxStreamData, sendMaxStreamData) {
        this.#conn = conn;
        this.#localMaxStreamData = localMaxStreamData;
        this.#sendMaxStreamData = sendMaxStreamData;
      }
      /** Effective peer window: explicit updates never lower it below the HELLO initial. */
      get peerMaxStreamData() {
        const initial = this.#conn.peerInitialMaxStreamData;
        return this.#peerMaxExplicit > initial ? this.#peerMaxExplicit : initial;
      }
      // ---- sender ----
      /** Reserve up to `n` bytes; resolves with the granted amount (1..n). */
      async reserve(n, signal) {
        return Number(await this.#conn.reserveData(this, BigInt(n), signal));
      }
      commit(n) {
        this.#conn.commitData(this, BigInt(n));
      }
      release(n) {
        this.#conn.releaseData(this, BigInt(n));
      }
      /** Fail pending and future reservations (STOP_SENDING, reset, close). */
      failSend(err) {
        if (this.#sendFailure)
          return;
        this.#sendFailure = err;
        this.#conn.wake();
      }
      get sendFailed() {
        return this.#sendFailure;
      }
      /** MAX_STREAM_DATA from the peer. Decreases are ignored. */
      onPeerMaxStreamData(value) {
        if (value > this.#peerMaxExplicit) {
          this.#peerMaxExplicit = value;
          this.#conn.wake();
        }
      }
      // ---- receiver ----
      /**
       * `n` inbound DATA payload bytes arrived; enforce both windows atomically
       * (single-threaded: check both, then count both).
       * @throws ProtocolViolation when the peer exceeds either window.
       */
      onDataReceived(n) {
        const bn = BigInt(n);
        if (this.#received + bn > this.#localMaxStreamData) {
          throw new ProtocolViolation("peer exceeded MAX_STREAM_DATA");
        }
        this.#conn.connDataReceived(bn);
        this.#received += bn;
      }
      /**
       * `n` bytes were consumed — read-fulfilled to the application or explicitly
       * discarded. Advertises replacement credit past the half-window threshold
       * (stream credit is withheld after cancelRead; connection credit always
       * flows so a discarded stream cannot starve unrelated streams).
       */
      onConsumed(n) {
        const bn = BigInt(n);
        this.#consumed += bn;
        const window2 = this.#conn.local.initialMaxStreamData;
        if (!this.#cancelled && this.#consumed - this.#advertisedAt >= window2 / 2n) {
          this.#advertisedAt = this.#consumed;
          this.#localMaxStreamData = saturate(this.#consumed + window2);
          this.#sendMaxStreamData(this.#localMaxStreamData);
        }
        this.#conn.connDataConsumed(bn);
      }
      /** Local cancelRead: stop granting stream credit; discards still free MAX_DATA. */
      markCancelled() {
        this.#cancelled = true;
      }
    }, "StreamFlow");
  }
});
var LOCAL_SEND_BUFFER_LOW;
var Wakeable2;
var KpsStream;
var init_stream_core = __esm2({
  "node_modules/@kpstreams/core/dist/stream-core.js"() {
    "use strict";
    init_framing();
    init_errors();
    LOCAL_SEND_BUFFER_LOW = 1 << 20;
    Wakeable2 = /* @__PURE__ */ __name(class {
      #resolvers = [];
      wake() {
        const rs = this.#resolvers;
        this.#resolvers = [];
        for (const r of rs)
          r();
      }
      wait() {
        return new Promise((res) => this.#resolvers.push(res));
      }
    }, "Wakeable2");
    KpsStream = /* @__PURE__ */ __name(class {
      readable;
      writable;
      closed;
      /** Resolves when the channel opens; rejects if it dies first. */
      opened;
      #ch;
      #sf;
      #hooks;
      #inbuf = [];
      #peerFin = false;
      #peerReset = null;
      #peerStop = null;
      #localTerminal = null;
      #readCancelled = false;
      // The reason a locally-terminated read half surfaces to a pending/subsequent
      // read. Per SPEC §9.2, EOF is reserved for the peer's FIN; a local
      // cancelRead/close or a connection teardown must make the read *error*.
      #readError = null;
      #channelClosed = false;
      #retiredFired = false;
      #readWake = new Wakeable2();
      #drainWake = new Wakeable2();
      #closeResolve;
      #closeSettled = false;
      #openResolve;
      #openReject;
      #openSettled = false;
      constructor(ch, connFlow, hooks) {
        this.#ch = ch;
        this.#hooks = hooks;
        this.#sf = connFlow.newStream((v) => {
          if (this.#ch.isOpen())
            this.#ch.send(encodeMaxStreamData(v));
        });
        this.closed = new Promise((res) => {
          this.#closeResolve = res;
        });
        this.opened = new Promise((res, rej) => {
          this.#openResolve = res;
          this.#openReject = rej;
        });
        this.opened.catch(() => {
        });
        ch.setBufferedAmountLowThreshold(LOCAL_SEND_BUFFER_LOW);
        ch.onBufferedAmountLow(() => this.#drainWake.wake());
        ch.onOpen(() => this.#settleOpen(null));
        if (ch.isOpen())
          this.#settleOpen(null);
        ch.onMessage((d) => this.#onFrame(d));
        ch.onClose(() => this.#onChannelClose());
        ch.onError((msg) => {
          this.#settle({ ok: false, reason: { code: "network-error", message: msg } });
          this.#settleOpen(new Error(`kps: stream failed: ${msg}`));
          this.#readWake.wake();
          this.#drainWake.wake();
        });
        this.readable = new ReadableStream({
          pull: async (controller) => {
            for (; ; ) {
              if (this.#readCancelled) {
                controller.error(streamError(this.#readError ?? { code: "cancelled" }));
                return;
              }
              const chunk = this.#inbuf.shift();
              if (chunk) {
                controller.enqueue(chunk);
                this.#sf.onConsumed(chunk.length);
                this.#maybeRetire();
                return;
              }
              if (this.#peerReset) {
                controller.error(streamError(this.#peerReset));
                return;
              }
              if (this.#peerFin) {
                controller.close();
                return;
              }
              if (this.#channelClosed) {
                controller.error(streamError({ code: "network-error", message: "kps: stream closed" }));
                return;
              }
              await this.#readWake.wait();
            }
          },
          cancel: (reason) => {
            void this.cancelRead(reasonFrom(reason) ?? { code: "cancelled" });
          }
        }, { highWaterMark: 0 });
        this.writable = new WritableStream({
          write: (chunk) => this.#writeChunk(chunk),
          close: () => this.closeWrite(),
          abort: (reason) => this.resetWrite(reasonFrom(reason) ?? { code: "reset" })
        });
      }
      // ---- inbound ----
      #onFrame(data) {
        let f;
        try {
          f = parseFrame(data);
        } catch (e) {
          this.#hooks.fatal({ code: "protocol-error", message: e.message });
          return;
        }
        switch (f.type) {
          case "data": {
            if (this.#peerFin || this.#peerReset) {
              this.#hooks.fatal({ code: "protocol-error", message: "DATA after terminal frame" });
              return;
            }
            try {
              this.#sf.onDataReceived(f.payload.length);
            } catch (e) {
              this.#hooks.fatal({ code: "protocol-error", message: e.message });
              return;
            }
            if (this.#readCancelled) {
              this.#sf.onConsumed(f.payload.length);
              return;
            }
            this.#inbuf.push(f.payload.slice());
            this.#readWake.wake();
            return;
          }
          case "fin": {
            if (this.#peerFin || this.#peerReset) {
              this.#hooks.fatal({ code: "protocol-error", message: "second terminal frame" });
              return;
            }
            this.#peerFin = true;
            this.#readWake.wake();
            this.#maybeRetire();
            return;
          }
          case "reset": {
            if (this.#peerFin || this.#peerReset) {
              this.#hooks.fatal({ code: "protocol-error", message: "second terminal frame" });
              return;
            }
            this.#peerReset = { code: numToCode(f.code) ?? "reset" };
            this.#discardInbuf();
            this.#readWake.wake();
            this.#maybeRetire();
            return;
          }
          case "stop-sending": {
            if (this.#peerStop)
              return;
            this.#peerStop = { code: numToCode(f.code) ?? "cancelled" };
            this.#sf.failSend(streamError(this.#peerStop));
            if (!this.#localTerminal) {
              this.#localTerminal = "reset";
              if (this.#ch.isOpen())
                this.#ch.send(encodeCode(FRAME_RESET, f.code));
              this.#maybeRetire();
            }
            return;
          }
          case "max-stream-data":
            this.#sf.onPeerMaxStreamData(f.value);
            return;
        }
      }
      #onChannelClose() {
        this.#channelClosed = true;
        const wireComplete = this.#localTerminal !== null && (this.#peerFin || this.#peerReset !== null);
        if (!wireComplete && !this.#hooks.isTeardown()) {
          this.#hooks.fatal({ code: "protocol-error", message: "data channel closed mid-stream" });
        }
        this.#sf.failSend(streamError({ code: "network-error", message: "kps: stream closed" }));
        this.#settleOpen(new Error("kps: stream closed before opening"));
        this.#settle({ ok: !this.#peerReset, reason: this.#peerReset ?? void 0 });
        this.#readWake.wake();
        this.#drainWake.wake();
        this.#maybeRetire();
      }
      // ---- outbound ----
      async #writeChunk(chunk) {
        let off2 = 0;
        while (off2 < chunk.length) {
          this.#checkWritable();
          const want = Math.min(chunk.length - off2, MAX_FRAME_PAYLOAD);
          const granted = await this.#sf.reserve(want);
          const slice = chunk.subarray(off2, off2 + granted);
          try {
            await this.#drainLocal();
            this.#checkWritable();
            this.#ch.send(encodeData(slice));
          } catch (e) {
            this.#sf.release(granted);
            throw e;
          }
          this.#sf.commit(granted);
          off2 += granted;
        }
      }
      #checkWritable() {
        if (this.#peerStop)
          throw streamError(this.#peerStop);
        if (this.#localTerminal)
          throw streamError({ code: "closed", message: "kps: write half closed" });
        if (this.#channelClosed || !this.#ch.isOpen())
          throw new Error("kps: stream is closed");
      }
      // Local send-queue bound only — flow control is the credit reservation above.
      async #drainLocal() {
        while (this.#ch.isOpen() && this.#ch.bufferedAmount() >= LOCAL_SEND_BUFFER_LOW) {
          await this.#drainWake.wait();
        }
      }
      // ---- public stream operations ----
      /** Gracefully finish the local write half; the peer observes EOF after all written bytes. */
      async closeWrite() {
        if (this.#localTerminal)
          return;
        this.#localTerminal = "fin";
        this.#sf.failSend(streamError({ code: "closed", message: "kps: write half closed" }));
        if (this.#ch.isOpen())
          this.#ch.send(encodeFin());
        this.#maybeRetire();
      }
      /** Stop wanting inbound bytes (not EOF); the peer is told to stop sending. */
      async cancelRead(reason) {
        if (this.#readCancelled)
          return;
        this.#readCancelled = true;
        this.#readError = reason ?? { code: "cancelled" };
        this.#sf.markCancelled();
        this.#discardInbuf();
        if (!this.#peerFin && !this.#peerReset && this.#ch.isOpen()) {
          this.#ch.send(encodeCode(FRAME_STOP_SENDING, codeToNum(reason?.code ?? "cancelled")));
        }
        this.#readWake.wake();
        this.#maybeRetire();
      }
      /** Abort the local write half; the peer observes a stream error rather than EOF. */
      async resetWrite(reason) {
        if (this.#localTerminal)
          return;
        this.#localTerminal = "reset";
        this.#sf.failSend(streamError(reason ?? { code: "reset" }));
        if (this.#ch.isOpen())
          this.#ch.send(encodeCode(FRAME_RESET, codeToNum(reason?.code ?? "reset")));
        this.#maybeRetire();
      }
      /**
       * Tear down both halves. The channel itself closes at retirement — once the
       * peer's terminal frame (a conforming peer answers STOP_SENDING with RESET)
       * has arrived — because closing it earlier is a §6.5 protocol violation.
       */
      async close(reason) {
        try {
          await this.closeWrite();
        } catch {
        }
        try {
          await this.cancelRead(reason ?? { code: "closed" });
        } catch {
        }
      }
      /** Connection teardown: discard state, fail waiters, no wire activity. */
      destroy(reason) {
        this.#discardInbuf();
        this.#readCancelled = true;
        this.#readError = reason ?? { code: "closed", message: "kps: connection closed" };
        this.#sf.failSend(streamError(reason ?? { code: "closed", message: "kps: connection closed" }));
        this.#settleOpen(new Error("kps: connection closed"));
        this.#settle(reason ? { ok: false, reason } : { ok: true });
        this.#readWake.wake();
        this.#drainWake.wake();
      }
      // ---- lifecycle ----
      #discardInbuf() {
        if (this.#inbuf.length === 0)
          return;
        let n = 0;
        for (const c of this.#inbuf)
          n += c.length;
        this.#inbuf = [];
        this.#sf.onConsumed(n);
      }
      #maybeRetire() {
        const wireComplete = this.#localTerminal !== null && (this.#peerFin || this.#peerReset !== null);
        if (!wireComplete)
          return;
        const drained = this.#inbuf.length === 0;
        if (!drained)
          return;
        if (!this.#channelClosed) {
          this.#ch.close();
          return;
        }
        if (!this.#retiredFired) {
          this.#retiredFired = true;
          this.#hooks.retired();
        }
      }
      #settle(info3) {
        if (this.#closeSettled)
          return;
        this.#closeSettled = true;
        this.#closeResolve(info3);
      }
      #settleOpen(err) {
        if (this.#openSettled)
          return;
        this.#openSettled = true;
        if (err)
          this.#openReject(err);
        else
          this.#openResolve();
      }
    }, "KpsStream");
  }
});
function raceAbort(p, signal, message) {
  if (!signal)
    return p;
  if (signal.aborted)
    return Promise.reject(new Error(message));
  return new Promise((resolve, reject) => {
    const onAbort = /* @__PURE__ */ __name(() => reject(new Error(message)), "onAbort");
    signal.addEventListener("abort", onAbort, { once: true });
    p.then((v) => {
      signal.removeEventListener("abort", onAbort);
      resolve(v);
    }, (e) => {
      signal.removeEventListener("abort", onAbort);
      reject(e);
    });
  });
}
__name(raceAbort, "raceAbort");
var WEBRTC_MAX_DATAGRAM;
var CONTROL_LABEL;
var CONTROL_ID;
var DATAGRAM_LABEL;
var DATAGRAM_ID;
var DEFAULT_HELLO_TIMEOUT_MS;
var MAX_DATAGRAM_QUEUE;
var ConnCore;
var init_conn_core = __esm2({
  "node_modules/@kpstreams/core/dist/conn-core.js"() {
    "use strict";
    init_framing();
    init_control();
    init_flow();
    init_stream_core();
    init_errors();
    WEBRTC_MAX_DATAGRAM = 1200;
    CONTROL_LABEL = "_kps_control";
    CONTROL_ID = 0;
    DATAGRAM_LABEL = "_kps_datagrams";
    DATAGRAM_ID = 1;
    DEFAULT_HELLO_TIMEOUT_MS = 15e3;
    MAX_DATAGRAM_QUEUE = 256;
    ConnCore = /* @__PURE__ */ __name(class {
      closed;
      /** Resolves at mutual HELLO; rejects if the connection dies first. */
      established;
      flow;
      #host;
      #state = "connecting";
      #tearingDown = false;
      #helloSent = false;
      #peerHello = null;
      #establishedDone = false;
      #establishResolve;
      #establishReject;
      #helloTimer;
      #seq = 0;
      #streams = /* @__PURE__ */ new Set();
      #staged = [];
      #incoming = [];
      #acceptWaiters = [];
      #dgQueue = [];
      #dgWaiters = [];
      #closeResolve;
      #closeFired = false;
      constructor(host) {
        this.#host = host;
        this.closed = new Promise((res) => {
          this.#closeResolve = res;
        });
        this.established = new Promise((res, rej) => {
          this.#establishResolve = res;
          this.#establishReject = rej;
        });
        this.established.catch(() => {
        });
        this.flow = new ConnFlow(resolveLimits(host.limits), {
          sendMaxData: (v) => this.#trySendControl(encodeMaxData(v)),
          sendMaxStreams: (v) => this.#trySendControl(encodeMaxStreams(v))
        });
        host.control.onOpen(() => this.#sendHello());
        host.control.onMessage((d) => this.#onControl(d));
        host.control.onClose(() => this.#reservedChannelLost("control"));
        host.control.onError(() => this.#reservedChannelLost("control"));
        if (host.control.isOpen())
          this.#sendHello();
        host.datagram.onMessage((d) => this.#onDatagram(d));
        host.datagram.onClose(() => this.#reservedChannelLost("datagram"));
        this.#helloTimer = setTimeout(() => this.fatal({ code: "timeout", message: "kps: HELLO timeout" }), host.helloTimeoutMs ?? DEFAULT_HELLO_TIMEOUT_MS);
        this.#helloTimer.unref?.();
      }
      get state() {
        return this.#state;
      }
      // ---- control channel ----
      #sendHello() {
        if (this.#helloSent || this.#closeFired)
          return;
        this.#helloSent = true;
        this.#trySendControl(encodeHello(this.flow.local));
        this.#checkEstablished();
      }
      #onControl(data) {
        let m;
        try {
          m = decodeControl(data);
        } catch (e) {
          this.fatal({ code: "protocol-error", message: e.message });
          return;
        }
        switch (m.t) {
          case "hello": {
            if (this.#peerHello) {
              this.fatal({ code: "protocol-error", message: "duplicate HELLO" });
              return;
            }
            if (m.version !== WIRE_VERSION) {
              this.#trySendControl(encodeConnClose("unsupported"));
              this.#teardown({
                ok: false,
                reason: { code: "unsupported", message: `kps: peer wire version ${m.version} (want ${WIRE_VERSION})` }
              });
              return;
            }
            this.#peerHello = m.limits;
            this.flow.onPeerHello(m.limits);
            this.#checkEstablished();
            return;
          }
          case "close": {
            const reason = m.code === 0 ? void 0 : { code: numToCode(m.code) ?? "internal-error" };
            this.#teardown({ ok: m.code === 0, reason });
            return;
          }
          case "max-data":
            if (!this.#peerHello) {
              this.fatal({ code: "protocol-error", message: "control message before HELLO" });
              return;
            }
            this.flow.onPeerMaxData(m.value);
            return;
          case "max-streams":
            if (!this.#peerHello) {
              this.fatal({ code: "protocol-error", message: "control message before HELLO" });
              return;
            }
            this.flow.onPeerMaxStreams(m.value);
            return;
        }
      }
      #checkEstablished() {
        if (this.#establishedDone || this.#closeFired)
          return;
        if (!this.#helloSent || !this.#peerHello)
          return;
        this.#establishedDone = true;
        this.#state = "open";
        clearTimeout(this.#helloTimer);
        this.#establishResolve();
        const staged = this.#staged;
        this.#staged = [];
        for (const s of staged)
          this.#enqueueIncoming(s);
      }
      #trySendControl(msg) {
        try {
          if (this.#host.control.isOpen())
            this.#host.control.send(msg);
        } catch {
        }
      }
      #reservedChannelLost(which) {
        if (this.#tearingDown || this.#closeFired)
          return;
        this.fatal({ code: "protocol-error", message: `kps: reserved ${which} channel lost` });
      }
      // ---- streams ----
      /** The wrapper calls this for every incoming (DCEP) application channel. */
      handleIncomingChannel(ch) {
        try {
          this.flow.peerStreamOpened();
        } catch (e) {
          this.fatal({ code: "protocol-error", message: e.message });
          return;
        }
        const stream = this.#makeStream(ch, true);
        if (this.#establishedDone)
          this.#enqueueIncoming(stream);
        else
          this.#staged.push(stream);
      }
      #makeStream(ch, peerInitiated) {
        const stream = new KpsStream(ch, this.flow, {
          fatal: (r) => this.fatal(r),
          retired: () => {
            this.#streams.delete(stream);
            if (peerInitiated)
              this.flow.peerStreamRetired();
          },
          isTeardown: () => this.#tearingDown
        });
        this.#streams.add(stream);
        return stream;
      }
      #enqueueIncoming(stream) {
        const w = this.#acceptWaiters.shift();
        if (w)
          w.resolve(stream);
        else
          this.#incoming.push(stream);
      }
      async openStream(opts = {}) {
        if (opts.signal?.aborted)
          throw new Error("kps: openStream aborted");
        if (this.#state !== "open")
          throw new Error(`kps: connection is ${this.#state}`);
        await this.flow.reserveStreamSlot(opts.signal);
        let ch;
        try {
          ch = this.#host.openChannel(`kps-${++this.#seq}`);
        } catch (e) {
          this.flow.releaseStreamSlot();
          throw e;
        }
        this.flow.commitStreamSlot();
        const stream = this.#makeStream(ch, false);
        try {
          await raceAbort(stream.opened, opts.signal, "kps: openStream aborted");
        } catch (e) {
          stream.opened.then(() => {
            void stream.resetWrite({ code: "cancelled" });
            void stream.cancelRead({ code: "cancelled" });
          }).catch(() => {
          });
          throw e;
        }
        return stream;
      }
      acceptStream(opts = {}) {
        const ready = this.#incoming.shift();
        if (ready)
          return Promise.resolve(ready);
        if (opts.signal?.aborted)
          return Promise.reject(new Error("kps: acceptStream aborted"));
        if (this.#state === "closed")
          return Promise.reject(new Error("kps: connection is closed"));
        const signal = opts.signal;
        return new Promise((resolve, reject) => {
          const waiter = {
            resolve: (s) => {
              signal?.removeEventListener("abort", onAbort);
              resolve(s);
            },
            reject: (e) => {
              signal?.removeEventListener("abort", onAbort);
              reject(e);
            }
          };
          const onAbort = /* @__PURE__ */ __name(() => {
            const i = this.#acceptWaiters.indexOf(waiter);
            if (i >= 0)
              this.#acceptWaiters.splice(i, 1);
            reject(new Error("kps: acceptStream aborted"));
          }, "onAbort");
          this.#acceptWaiters.push(waiter);
          signal?.addEventListener("abort", onAbort, { once: true });
        });
      }
      // ---- datagrams (SPEC §7) ----
      #onDatagram(data) {
        const w = this.#dgWaiters.shift();
        if (w) {
          w.resolve(data);
          return;
        }
        this.#dgQueue.push(data);
        if (this.#dgQueue.length > MAX_DATAGRAM_QUEUE)
          this.#dgQueue.shift();
      }
      async sendDatagram(data, opts) {
        if (opts?.signal?.aborted)
          throw new Error("kps: sendDatagram aborted");
        if (data.length > WEBRTC_MAX_DATAGRAM) {
          const e = new Error(`kps: datagram exceeds limit (max ${WEBRTC_MAX_DATAGRAM} bytes)`);
          Object.assign(e, { code: "too-large", maxDatagramPayloadSize: WEBRTC_MAX_DATAGRAM });
          throw e;
        }
        if (!this.#host.datagram.isOpen())
          throw new Error("kps: datagram channel not open");
        this.#host.datagram.send(data);
      }
      receiveDatagram(opts) {
        const next = this.#dgQueue.shift();
        if (next)
          return Promise.resolve(next);
        if (this.#state === "closed")
          return Promise.reject(new Error("kps: connection closed"));
        if (opts?.signal?.aborted)
          return Promise.reject(new Error("kps: receiveDatagram aborted"));
        const signal = opts?.signal;
        return new Promise((resolve, reject) => {
          const waiter = {
            resolve: (v) => {
              signal?.removeEventListener("abort", onAbort);
              resolve(v);
            },
            reject: (e) => {
              signal?.removeEventListener("abort", onAbort);
              reject(e);
            }
          };
          const onAbort = /* @__PURE__ */ __name(() => {
            const i = this.#dgWaiters.indexOf(waiter);
            if (i >= 0)
              this.#dgWaiters.splice(i, 1);
            reject(new Error("kps: receiveDatagram aborted"));
          }, "onAbort");
          this.#dgWaiters.push(waiter);
          signal?.addEventListener("abort", onAbort, { once: true });
        });
      }
      // ---- close paths ----
      /** Graceful local close: best-effort CONNECTION_CLOSE, then teardown. */
      close(reason) {
        if (this.#closeFired)
          return;
        this.#tearingDown = true;
        this.#trySendControl(encodeConnClose(reason?.code));
        this.#teardown({ ok: true, reason });
      }
      /** A peer wire violation or local fatal condition: convey a code, tear down. */
      fatal(reason) {
        if (this.#closeFired)
          return;
        this.#tearingDown = true;
        this.#trySendControl(encodeConnClose(reason.code ?? "protocol-error"));
        this.#teardown({ ok: false, reason });
      }
      /** Transport-layer state changes, forwarded by the wrapper. */
      onTransportFailed(message = "peer connection failed") {
        this.#teardown({ ok: false, reason: { code: "network-error", message } });
      }
      onTransportClosed() {
        this.#teardown({ ok: this.#state !== "connecting" });
      }
      #teardown(info3) {
        if (this.#closeFired)
          return;
        this.#closeFired = true;
        this.#tearingDown = true;
        this.#state = "closed";
        clearTimeout(this.#helloTimer);
        const err = info3.reason ? streamError(info3.reason) : new Error("kps: connection closed");
        if (!this.#establishedDone)
          this.#establishReject(err);
        this.flow.fail(err);
        for (const s of [...this.#streams, ...this.#staged])
          s.destroy(info3.reason);
        this.#streams.clear();
        this.#staged = [];
        for (const w of this.#acceptWaiters)
          w.reject(new Error("kps: connection closed"));
        this.#acceptWaiters = [];
        for (const w of this.#dgWaiters)
          w.reject(new Error("kps: connection closed"));
        this.#dgWaiters = [];
        try {
          this.#host.closeTransport();
        } catch {
        }
        this.#closeResolve(info3);
      }
    }, "ConnCore");
  }
});
function generateUfrag() {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}
__name(generateUfrag, "generateUfrag");
async function deriveICEPwd(certhashDigest, ufrag) {
  const key = await crypto.subtle.importKey("raw", toArrayBuffer(certhashDigest), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const msg = new TextEncoder().encode("kps-ice-pwd-v1:" + ufrag);
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, toArrayBuffer(msg)));
  let bin = "";
  for (const b of sig)
    bin += String.fromCharCode(b);
  return btoa(bin).replace(/=+$/, "");
}
__name(deriveICEPwd, "deriveICEPwd");
function toArrayBuffer(u8) {
  return u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength);
}
__name(toArrayBuffer, "toArrayBuffer");
function rewriteOfferUfrag(sdp, ufrag, pwd) {
  const lines = sdp.split(/\r\n|\n/).map((line) => {
    if (line.startsWith("a=ice-ufrag:"))
      return `a=ice-ufrag:${ufrag}`;
    if (line.startsWith("a=ice-pwd:"))
      return `a=ice-pwd:${pwd}`;
    return line;
  });
  return lines.join("\r\n");
}
__name(rewriteOfferUfrag, "rewriteOfferUfrag");
function synthesizeAnswer(addr, ufrag, pwd) {
  const fingerprint = digestToSdpFingerprint(decodeCerthash(addr.certhash));
  const ip6 = addr.ip.includes(":");
  const fam = ip6 ? "IP6" : "IP4";
  const lines = [
    "v=0",
    `o=- 0 0 IN ${fam} ${ip6 ? "::" : "0.0.0.0"}`,
    "s=-",
    "t=0 0",
    "a=ice-lite",
    `m=application ${addr.port} UDP/DTLS/SCTP webrtc-datachannel`,
    `c=IN ${fam} ${addr.ip}`,
    "a=mid:0",
    `a=ice-ufrag:${ufrag}`,
    `a=ice-pwd:${pwd}`,
    `a=fingerprint:sha-256 ${fingerprint}`,
    "a=setup:passive",
    "a=sctp-port:5000",
    "a=max-message-size:1048576",
    `a=candidate:1 1 UDP 1 ${addr.ip} ${addr.port} typ host`
  ];
  return lines.join("\r\n") + "\r\n";
}
__name(synthesizeAnswer, "synthesizeAnswer");
var init_sdp = __esm2({
  "node_modules/@kpstreams/core/dist/sdp.js"() {
    "use strict";
    init_certhash();
  }
});
var init_webrtc = __esm2({
  "node_modules/@kpstreams/core/dist/webrtc.js"() {
    "use strict";
    init_conn_core();
    init_sdp();
  }
});
function toArrayBuffer2(u8) {
  return u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength);
}
__name(toArrayBuffer2, "toArrayBuffer2");
function dialAbortError(signal) {
  const reason = signal.reason;
  return new Error(reason?.name === "TimeoutError" ? "kps: dial timed out" : "kps: dial aborted");
}
__name(dialAbortError, "dialAbortError");
function dial(addr, opts) {
  return Connection.dial(addr, opts);
}
__name(dial, "dial");
var DEFAULT_TIMEOUT;
var RTCChannelAdapter;
var Connection;
var init_connection = __esm2({
  "node_modules/@kpstreams/webrtc-client/dist/connection.js"() {
    "use strict";
    init_dist();
    init_webrtc();
    DEFAULT_TIMEOUT = 15e3;
    RTCChannelAdapter = /* @__PURE__ */ __name(class {
      #dc;
      #message = null;
      #open = null;
      #close = null;
      #error = null;
      #bal = null;
      constructor(dc) {
        this.#dc = dc;
        dc.binaryType = "arraybuffer";
        dc.addEventListener("message", (e) => {
          const raw = e.data;
          const data = typeof raw === "string" ? new TextEncoder().encode(raw) : new Uint8Array(raw);
          this.#message?.(data);
        });
        dc.addEventListener("open", () => this.#open?.());
        dc.addEventListener("close", () => this.#close?.());
        dc.addEventListener("error", (e) => {
          this.#error?.(e.error?.message ?? "data channel error");
        });
        dc.addEventListener("bufferedamountlow", () => this.#bal?.());
      }
      isOpen() {
        return this.#dc.readyState === "open";
      }
      send(data) {
        this.#dc.send(toArrayBuffer2(data));
      }
      bufferedAmount() {
        return this.#dc.bufferedAmount;
      }
      setBufferedAmountLowThreshold(bytes) {
        this.#dc.bufferedAmountLowThreshold = bytes;
      }
      onBufferedAmountLow(cb) {
        this.#bal = cb;
      }
      onMessage(cb) {
        this.#message = cb;
      }
      onOpen(cb) {
        this.#open = cb;
      }
      onClose(cb) {
        this.#close = cb;
      }
      onError(cb) {
        this.#error = cb;
      }
      close() {
        try {
          this.#dc.close();
        } catch {
        }
      }
    }, "RTCChannelAdapter");
    Connection = /* @__PURE__ */ __name(class _Connection {
      // The dialed endpoint (see the core Connection.remoteAddress doc).
      remoteAddress;
      #pc;
      #core;
      // `control` is the reserved reliable channel (ID 0) dial() created before the
      // offer (to force the SCTP m-line).
      constructor(pc, control, remote) {
        this.#pc = pc;
        this.remoteAddress = remote;
        const dg = pc.createDataChannel(DATAGRAM_LABEL, {
          negotiated: true,
          id: DATAGRAM_ID,
          ordered: false,
          maxRetransmits: 0
        });
        this.#core = new ConnCore({
          control: new RTCChannelAdapter(control),
          datagram: new RTCChannelAdapter(dg),
          openChannel: (label) => new RTCChannelAdapter(pc.createDataChannel(label)),
          closeTransport: () => {
            try {
              pc.close();
            } catch {
            }
          }
        });
        pc.addEventListener("connectionstatechange", () => {
          const s = pc.connectionState;
          if (s === "failed")
            this.#core.onTransportFailed();
          else if (s === "closed")
            this.#core.onTransportClosed();
        });
        pc.addEventListener("datachannel", (e) => {
          const channel2 = e.channel;
          if (channel2.label === CONTROL_LABEL || channel2.label === DATAGRAM_LABEL)
            return;
          this.#core.handleIncomingChannel(new RTCChannelAdapter(channel2));
        });
      }
      get closed() {
        return this.#core.closed;
      }
      static async dial(addrStr, opts = {}) {
        const signal = opts.signal ?? AbortSignal.timeout(DEFAULT_TIMEOUT);
        if (signal.aborted)
          throw dialAbortError(signal);
        const addr = parseAddress2(addrStr);
        const digest = decodeCerthash(addr.certhash);
        const pc = new RTCPeerConnection({});
        const control = pc.createDataChannel(CONTROL_LABEL, { negotiated: true, id: CONTROL_ID });
        const offer = await pc.createOffer();
        const ufrag = generateUfrag();
        const pwd = await deriveICEPwd(digest, ufrag);
        await pc.setLocalDescription({ type: offer.type, sdp: rewriteOfferUfrag(offer.sdp ?? "", ufrag, pwd) });
        await pc.setRemoteDescription({ type: "answer", sdp: synthesizeAnswer(addr, ufrag, pwd) });
        const conn = new _Connection(pc, control, { ip: addr.ip, port: addr.port });
        await conn.#waitEstablished(signal);
        return conn;
      }
      #waitEstablished(signal) {
        return new Promise((resolve, reject) => {
          const onAbort = /* @__PURE__ */ __name(() => {
            try {
              this.#pc.close();
            } catch {
            }
            reject(dialAbortError(signal));
          }, "onAbort");
          signal.addEventListener("abort", onAbort, { once: true });
          this.#core.established.then(() => {
            signal.removeEventListener("abort", onAbort);
            resolve();
          }, (e) => {
            signal.removeEventListener("abort", onAbort);
            reject(e);
          });
        });
      }
      openStream(opts = {}) {
        return this.#core.openStream(opts);
      }
      acceptStream(opts = {}) {
        return this.#core.acceptStream(opts);
      }
      async close(reason) {
        this.#core.close(reason);
      }
      // Datagrams (SPEC §7) — unreliable, unordered, best-effort.
      sendDatagram(data, opts) {
        return this.#core.sendDatagram(data, opts);
      }
      receiveDatagram(opts) {
        return this.#core.receiveDatagram(opts);
      }
    }, "_Connection");
  }
});
async function openStream(addr, opts) {
  const conn = await dial(addr, opts);
  try {
    const stream = await conn.openStream({ signal: opts?.signal });
    void stream.closed.finally(() => {
      void conn.close();
    });
    return stream;
  } catch (err) {
    await conn.close();
    throw err;
  }
}
__name(openStream, "openStream");
var init_open_stream = __esm2({
  "node_modules/@kpstreams/webrtc-client/dist/open-stream.js"() {
    "use strict";
    init_connection();
  }
});
var dist_exports = {};
__export2(dist_exports, {
  dial: () => dial,
  formatAddress: () => formatAddress2,
  openStream: () => openStream,
  parseAddress: () => parseAddress2
});
var init_dist2 = __esm2({
  "node_modules/@kpstreams/webrtc-client/dist/index.js"() {
    "use strict";
    init_connection();
    init_open_stream();
    init_dist();
  }
});
var kpsDial_exports = {};
__export2(kpsDial_exports, {
  kpsDial: () => kpsDial
});
var kpsDial;
var init_kpsDial = __esm2({
  "src/kpsDial.ts"() {
    "use strict";
    kpsDial = /* @__PURE__ */ __name(async (address) => {
      if (typeof globalThis.RTCPeerConnection !== "undefined") {
        const { dial: dial2 } = await Promise.resolve().then(() => (init_dist2(), dist_exports));
        return dial2(address);
      }
      const quicClientPkg = "@kpstreams/quic-client";
      let mod;
      try {
        mod = await import(
          /* @vite-ignore */
          quicClientPkg
        );
      } catch {
        throw new Error(
          "kps: no transport available. Browsers need RTCPeerConnection; in Node, install the optional '@kpstreams/quic-client' package to reach a gateway over QUIC."
        );
      }
      return mod.dial(address);
    }, "kpsDial");
  }
});
Symbol.dispose ??= /* @__PURE__ */ Symbol("Symbol.dispose");
var IntoUnderlyingByteSource = /* @__PURE__ */ __name(class {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    IntoUnderlyingByteSourceFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_intounderlyingbytesource_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  get autoAllocateChunkSize() {
    const ret = wasm.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr);
    return ret >>> 0;
  }
  cancel() {
    const ptr = this.__destroy_into_raw();
    wasm.intounderlyingbytesource_cancel(ptr);
  }
  /**
   * @param {ReadableByteStreamController} controller
   * @returns {Promise<any>}
   */
  pull(controller) {
    const ret = wasm.intounderlyingbytesource_pull(this.__wbg_ptr, controller);
    return ret;
  }
  /**
   * @param {ReadableByteStreamController} controller
   */
  start(controller) {
    wasm.intounderlyingbytesource_start(this.__wbg_ptr, controller);
  }
  /**
   * @returns {ReadableStreamType}
   */
  get type() {
    const ret = wasm.intounderlyingbytesource_type(this.__wbg_ptr);
    return __wbindgen_enum_ReadableStreamType[ret];
  }
}, "IntoUnderlyingByteSource");
if (Symbol.dispose)
  IntoUnderlyingByteSource.prototype[Symbol.dispose] = IntoUnderlyingByteSource.prototype.free;
var IntoUnderlyingSink = /* @__PURE__ */ __name(class {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    IntoUnderlyingSinkFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_intounderlyingsink_free(ptr, 0);
  }
  /**
   * @param {any} reason
   * @returns {Promise<any>}
   */
  abort(reason) {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.intounderlyingsink_abort(ptr, reason);
    return ret;
  }
  /**
   * @returns {Promise<any>}
   */
  close() {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.intounderlyingsink_close(ptr);
    return ret;
  }
  /**
   * @param {any} chunk
   * @returns {Promise<any>}
   */
  write(chunk) {
    const ret = wasm.intounderlyingsink_write(this.__wbg_ptr, chunk);
    return ret;
  }
}, "IntoUnderlyingSink");
if (Symbol.dispose)
  IntoUnderlyingSink.prototype[Symbol.dispose] = IntoUnderlyingSink.prototype.free;
var IntoUnderlyingSource = /* @__PURE__ */ __name(class _IntoUnderlyingSource {
  static __wrap(ptr) {
    const obj = Object.create(_IntoUnderlyingSource.prototype);
    obj.__wbg_ptr = ptr;
    IntoUnderlyingSourceFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    IntoUnderlyingSourceFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_intounderlyingsource_free(ptr, 0);
  }
  cancel() {
    const ptr = this.__destroy_into_raw();
    wasm.intounderlyingsource_cancel(ptr);
  }
  /**
   * @param {ReadableStreamDefaultController} controller
   * @returns {Promise<any>}
   */
  pull(controller) {
    const ret = wasm.intounderlyingsource_pull(this.__wbg_ptr, controller);
    return ret;
  }
}, "_IntoUnderlyingSource");
if (Symbol.dispose)
  IntoUnderlyingSource.prototype[Symbol.dispose] = IntoUnderlyingSource.prototype.free;
var TorClient = /* @__PURE__ */ __name(class _TorClient {
  static __wrap(ptr) {
    const obj = Object.create(_TorClient.prototype);
    obj.__wbg_ptr = ptr;
    TorClientFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    TorClientFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_torclient_free(ptr, 0);
  }
  /**
   * Close the TorClient and release resources
   * @returns {Promise<any>}
   */
  close() {
    const ret = wasm.torclient_close(this.__wbg_ptr);
    return ret;
  }
  /**
   * Create a new TorClient with the given options.
   *
   * This is an async operation that returns a Promise.
   * The client will bootstrap and establish a connection to the Tor network.
   *
   * Usage from JS: `const client = await TorClient.create(options);`
   * @param {TorClientOptions} options
   * @returns {Promise<any>}
   */
  static create(options) {
    _assertClass(options, TorClientOptions);
    var ptr0 = options.__destroy_into_raw();
    const ret = wasm.torclient_create(ptr0);
    return ret;
  }
  /**
   * Make an HTTP fetch request through Tor
   *
   * Returns a Promise that resolves to a standard browser `Response` object
   * as soon as response headers are received. The body is a `ReadableStream`
   * that reads from the Tor circuit on demand.
   * @param {string} url
   * @param {any} init
   * @returns {Promise<any>}
   */
  fetch(url, init2) {
    const ptr0 = passStringToWasm0(url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.torclient_fetch(this.__wbg_ptr, ptr0, len0, init2);
    return ret;
  }
  /**
   * Wait until the client is ready for traffic (connection usable + valid directory).
   * @returns {Promise<any>}
   */
  ready() {
    const ret = wasm.torclient_ready(this.__wbg_ptr);
    return ret;
  }
}, "_TorClient");
if (Symbol.dispose)
  TorClient.prototype[Symbol.dispose] = TorClient.prototype.free;
var TorClientOptions = /* @__PURE__ */ __name(class _TorClientOptions {
  static __wrap(ptr) {
    const obj = Object.create(_TorClientOptions.prototype);
    obj.__wbg_ptr = ptr;
    TorClientOptionsFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    TorClientOptionsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_torclientoptions_free(ptr, 0);
  }
  /**
   * Create options with a connect function.
   *
   * The connect function receives a target address string (e.g. "198.51.100.1:9001")
   * and must return a Promise resolving to a socket object with:
   * - `send(data: Uint8Array)` — send binary data
   * - `onmessage: ((data: Uint8Array) => void) | null` — receive callback
   * - `onclose: (() => void) | null` — close notification
   * - `close()` — close the socket
   *
   * The TS wrapper provides this automatically via the Gateway class.
   * @param {Function} connect
   */
  constructor(connect2) {
    const ret = wasm.torclientoptions_new(connect2);
    this.__wbg_ptr = ret;
    TorClientOptionsFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * Set a callback that provides bootstrap.zip bytes for fast directory pre-population.
   *
   * The callback should be `() => Promise<Uint8Array>` returning the
   * bootstrap archive from a tor-js-gateway server — either raw zip bytes
   * or zstd-compressed (`bootstrap.zip.zst`); compression is auto-detected.
   *
   * When set and storage has no cached consensus, the zip is parsed and the
   * directory cache is pre-populated before bootstrap begins.
   * @param {Function} callback
   * @returns {TorClientOptions}
   */
  withFastBootstrap(callback) {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.torclientoptions_withFastBootstrap(ptr, callback);
    return _TorClientOptions.__wrap(ret);
  }
  /**
   * Set a custom storage implementation for persistent state.
   *
   * When set, the Tor client will persist guard selection and other state
   * to this storage, allowing faster reconnection across page reloads.
   *
   * If not set, in-memory storage is used (state lost on page reload).
   *
   * # Arguments
   * * `storage` - A JavaScript object implementing the TorStorage interface
   * @param {TorStorage} storage
   * @returns {TorClientOptions}
   */
  withStorage(storage) {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.torclientoptions_withStorage(ptr, storage);
    return _TorClientOptions.__wrap(ret);
  }
}, "_TorClientOptions");
if (Symbol.dispose)
  TorClientOptions.prototype[Symbol.dispose] = TorClientOptions.prototype.free;
function init(log_level) {
  var ptr0 = isLikeNone(log_level) ? 0 : passStringToWasm0(log_level, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  const ret = wasm.init(ptr0, len0);
  if (ret[1]) {
    throw takeFromExternrefTable0(ret[0]);
  }
}
__name(init, "init");
function setLogCallback(callback) {
  wasm.setLogCallback(callback);
}
__name(setLogCallback, "setLogCallback");
function setLogLevel(level) {
  const ptr0 = passStringToWasm0(level, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.setLogLevel(ptr0, len0);
  if (ret[1]) {
    throw takeFromExternrefTable0(ret[0]);
  }
}
__name(setLogLevel, "setLogLevel");
function __wbg_get_imports() {
  const import0 = {
    __proto__: null,
    __wbg_Error_ef53bc310eb298a0: function(arg0, arg1) {
      const ret = Error(getStringFromWasm0(arg0, arg1));
      return ret;
    },
    __wbg_String_8564e559799eccda: function(arg0, arg1) {
      const ret = String(arg1);
      const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      const len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    },
    __wbg___wbindgen_boolean_get_1a45e2c38d4d41b9: function(arg0) {
      const v = arg0;
      const ret = typeof v === "boolean" ? v : void 0;
      return isLikeNone(ret) ? 16777215 : ret ? 1 : 0;
    },
    __wbg___wbindgen_debug_string_0accd80f45e5faa2: function(arg0, arg1) {
      const ret = debugString(arg1);
      const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      const len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    },
    __wbg___wbindgen_in_70a403a56e771704: function(arg0, arg1) {
      const ret = arg0 in arg1;
      return ret;
    },
    __wbg___wbindgen_is_function_754e9f305ff6029e: function(arg0) {
      const ret = typeof arg0 === "function";
      return ret;
    },
    __wbg___wbindgen_is_null_87c3bfe968c6a5ad: function(arg0) {
      const ret = arg0 === null;
      return ret;
    },
    __wbg___wbindgen_is_object_56732c2bc353f41d: function(arg0) {
      const val = arg0;
      const ret = typeof val === "object" && val !== null;
      return ret;
    },
    __wbg___wbindgen_is_string_c236cabd84a4d769: function(arg0) {
      const ret = typeof arg0 === "string";
      return ret;
    },
    __wbg___wbindgen_is_undefined_67b456be8673d3d7: function(arg0) {
      const ret = arg0 === void 0;
      return ret;
    },
    __wbg___wbindgen_jsval_loose_eq_2c56564c75129511: function(arg0, arg1) {
      const ret = arg0 == arg1;
      return ret;
    },
    __wbg___wbindgen_number_get_9bb1761122181af2: function(arg0, arg1) {
      const obj = arg1;
      const ret = typeof obj === "number" ? obj : void 0;
      getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    },
    __wbg___wbindgen_string_get_72bdf95d3ae505b1: function(arg0, arg1) {
      const obj = arg1;
      const ret = typeof obj === "string" ? obj : void 0;
      var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    },
    __wbg___wbindgen_throw_1506f2235d1bdba0: function(arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1));
    },
    __wbg__wbg_cb_unref_61db23ac97f16c31: function(arg0) {
      arg0._wbg_cb_unref();
    },
    __wbg_aborted_3bd851834eb1ecce: function(arg0) {
      const ret = arg0.aborted;
      return ret;
    },
    __wbg_all_c90913b30f129d54: function(arg0) {
      const ret = Promise.all(arg0);
      return ret;
    },
    __wbg_append_e1746995edcb0170: function() {
      return handleError(function(arg0, arg1, arg2, arg3, arg4) {
        arg0.append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
      }, arguments);
    },
    __wbg_buffer_d370c8cae5692933: function(arg0) {
      const ret = arg0.buffer;
      return ret;
    },
    __wbg_byobRequest_2c89fb4ab478fa09: function(arg0) {
      const ret = arg0.byobRequest;
      return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    },
    __wbg_byteLength_2c6dc3b4b85d3547: function(arg0) {
      const ret = arg0.byteLength;
      return ret;
    },
    __wbg_byteOffset_349aa9bf0a183eca: function(arg0) {
      const ret = arg0.byteOffset;
      return ret;
    },
    __wbg_call_6e37a87ff352da3d: function() {
      return handleError(function(arg0, arg1, arg2, arg3, arg4) {
        const ret = arg0.call(arg1, arg2, arg3, arg4);
        return ret;
      }, arguments);
    },
    __wbg_call_8a89609d89f6608a: function() {
      return handleError(function(arg0, arg1) {
        const ret = arg0.call(arg1);
        return ret;
      }, arguments);
    },
    __wbg_call_9c758de292015997: function() {
      return handleError(function(arg0, arg1, arg2) {
        const ret = arg0.call(arg1, arg2);
        return ret;
      }, arguments);
    },
    __wbg_cancel_3dedc1c2245a59d4: function(arg0) {
      const ret = arg0.cancel();
      return ret;
    },
    __wbg_catch_17ae9c6dfb88ad8a: function(arg0, arg1) {
      const ret = arg0.catch(arg1);
      return ret;
    },
    __wbg_clearTimeout_113b1cde814ec762: function(arg0) {
      const ret = clearTimeout(arg0);
      return ret;
    },
    __wbg_close_314feea4ac97ebd4: function(arg0) {
      const ret = arg0.close();
      return ret;
    },
    __wbg_close_4859304bbf0f8208: function() {
      return handleError(function(arg0) {
        arg0.close();
      }, arguments);
    },
    __wbg_close_6f12196fe155e8d2: function() {
      return handleError(function(arg0) {
        arg0.close();
      }, arguments);
    },
    __wbg_crypto_38df2bab126b63dc: function(arg0) {
      const ret = arg0.crypto;
      return ret;
    },
    __wbg_delete_25a6c6b201f3624b: function() {
      return handleError(function(arg0, arg1, arg2) {
        const ret = arg0.delete(getStringFromWasm0(arg1, arg2));
        return ret;
      }, arguments);
    },
    __wbg_digest_4b82af169d4b4519: function() {
      return handleError(function(arg0, arg1, arg2, arg3) {
        const ret = arg0.digest(getStringFromWasm0(arg1, arg2), arg3);
        return ret;
      }, arguments);
    },
    __wbg_done_60cf307fcc680536: function(arg0) {
      const ret = arg0.done;
      return ret;
    },
    __wbg_enqueue_09035479e2081625: function() {
      return handleError(function(arg0, arg1) {
        arg0.enqueue(arg1);
      }, arguments);
    },
    __wbg_entries_04b37a02507f1713: function(arg0) {
      const ret = Object.entries(arg0);
      return ret;
    },
    __wbg_error_a6fa202b58aa1cd3: function(arg0, arg1) {
      let deferred0_0;
      let deferred0_1;
      try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.error(getStringFromWasm0(arg0, arg1));
      } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
      }
    },
    __wbg_from_d300fe49deab18f5: function(arg0) {
      const ret = Array.from(arg0);
      return ret;
    },
    __wbg_getAll_cdae12ee7798dc31: function() {
      return handleError(function(arg0, arg1, arg2) {
        const ret = arg0.getAll(getStringFromWasm0(arg1, arg2));
        return ret;
      }, arguments);
    },
    __wbg_getRandomValues_76dfc69825c9c552: function() {
      return handleError(function(arg0, arg1) {
        globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
      }, arguments);
    },
    __wbg_getRandomValues_c44a50d8cfdaebeb: function() {
      return handleError(function(arg0, arg1) {
        arg0.getRandomValues(arg1);
      }, arguments);
    },
    __wbg_getReader_186390151a19bc55: function(arg0) {
      const ret = arg0.getReader();
      return ret;
    },
    __wbg_getReader_b4b1868fbca77dbe: function() {
      return handleError(function(arg0) {
        const ret = arg0.getReader();
        return ret;
      }, arguments);
    },
    __wbg_getWriter_e5a67ff4a024ff3f: function() {
      return handleError(function(arg0) {
        const ret = arg0.getWriter();
        return ret;
      }, arguments);
    },
    __wbg_get_1f8f054ddbaa7db2: function() {
      return handleError(function(arg0, arg1) {
        const ret = Reflect.get(arg0, arg1);
        return ret;
      }, arguments);
    },
    __wbg_get_2b48c7d0d006a781: function(arg0, arg1) {
      const ret = arg0[arg1 >>> 0];
      return ret;
    },
    __wbg_get_de6a0f7d4d18a304: function() {
      return handleError(function(arg0, arg1) {
        const ret = Reflect.get(arg0, arg1);
        return ret;
      }, arguments);
    },
    __wbg_get_done_ea9eb315d4ec1e81: function(arg0) {
      const ret = arg0.done;
      return isLikeNone(ret) ? 16777215 : ret ? 1 : 0;
    },
    __wbg_get_unchecked_33f6e5c9e2f2d6b2: function(arg0, arg1) {
      const ret = arg0[arg1 >>> 0];
      return ret;
    },
    __wbg_get_value_c68fe2e1a76c69ca: function(arg0) {
      const ret = arg0.value;
      return ret;
    },
    __wbg_get_with_ref_key_6412cf3094599694: function(arg0, arg1) {
      const ret = arg0[arg1];
      return ret;
    },
    __wbg_instanceof_AbortSignal_62ae3458aa4f4cc6: function(arg0) {
      let result;
      try {
        result = arg0 instanceof AbortSignal;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_instanceof_ArrayBuffer_8f49811467741499: function(arg0) {
      let result;
      try {
        result = arg0 instanceof ArrayBuffer;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_instanceof_Crypto_54e8160d69c4f721: function(arg0) {
      let result;
      try {
        result = arg0 instanceof Crypto;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_instanceof_ReadableStream_2c636dff2749bea5: function(arg0) {
      let result;
      try {
        result = arg0 instanceof ReadableStream;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_instanceof_Uint8Array_86f30649f63ef9c2: function(arg0) {
      let result;
      try {
        result = arg0 instanceof Uint8Array;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_instanceof_WritableStream_e0d9f1cac23ab05a: function(arg0) {
      let result;
      try {
        result = arg0 instanceof WritableStream;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_iterator_8732428d309e270e: function() {
      const ret = Symbol.iterator;
      return ret;
    },
    __wbg_length_4a591ecaa01354d9: function(arg0) {
      const ret = arg0.length;
      return ret;
    },
    __wbg_length_66f1a4b2e9026940: function(arg0) {
      const ret = arg0.length;
      return ret;
    },
    __wbg_log_cf2e968649f3384e: function(arg0) {
      console.log(arg0);
    },
    __wbg_msCrypto_bd5a034af96bcba6: function(arg0) {
      const ret = arg0.msCrypto;
      return ret;
    },
    __wbg_new_227d7c05414eb861: function() {
      const ret = new Error();
      return ret;
    },
    __wbg_new_50bb5ebeecef71a8: function(arg0, arg1) {
      const ret = new Error(getStringFromWasm0(arg0, arg1));
      return ret;
    },
    __wbg_new_578aeef4b6b94378: function(arg0) {
      const ret = new Uint8Array(arg0);
      return ret;
    },
    __wbg_new_ce1ab61c1c2b300d: function() {
      const ret = new Object();
      return ret;
    },
    __wbg_new_e436d06bc8e77460: function() {
      return handleError(function() {
        const ret = new Headers();
        return ret;
      }, arguments);
    },
    __wbg_new_from_slice_18fa1f71286d66b8: function(arg0, arg1) {
      const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
      return ret;
    },
    __wbg_new_typed_bf31d18f92484486: function(arg0, arg1) {
      try {
        var state0 = { a: arg0, b: arg1 };
        var cb0 = /* @__PURE__ */ __name((arg02, arg12) => {
          const a = state0.a;
          state0.a = 0;
          try {
            return wasm_bindgen_389f18f337614014___convert__closures_____invoke___js_sys_19c10af861cdcb72___Function_fn_wasm_bindgen_389f18f337614014___JsValue_____wasm_bindgen_389f18f337614014___sys__Undefined___js_sys_19c10af861cdcb72___Function_fn_wasm_bindgen_389f18f337614014___JsValue_____wasm_bindgen_389f18f337614014___sys__Undefined_______true_(a, state0.b, arg02, arg12);
          } finally {
            state0.a = a;
          }
        }, "cb0");
        const ret = new Promise(cb0);
        return ret;
      } finally {
        state0.a = 0;
      }
    },
    __wbg_new_with_byte_offset_and_length_d836f26d916dd9ad: function(arg0, arg1, arg2) {
      const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
      return ret;
    },
    __wbg_new_with_into_underlying_source_b45133df5ff75afa: function(arg0, arg1) {
      const ret = new ReadableStream(IntoUnderlyingSource.__wrap(arg0), arg1);
      return ret;
    },
    __wbg_new_with_length_36a4998e27b014c5: function(arg0) {
      const ret = new Uint8Array(arg0 >>> 0);
      return ret;
    },
    __wbg_new_with_length_690552eb9e6aeac9: function(arg0) {
      const ret = new Array(arg0 >>> 0);
      return ret;
    },
    __wbg_new_with_opt_readable_stream_and_init_7aec441366f09b34: function() {
      return handleError(function(arg0, arg1) {
        const ret = new Response(arg0, arg1);
        return ret;
      }, arguments);
    },
    __wbg_next_9e03acdf51c4960d: function(arg0) {
      const ret = arg0.next;
      return ret;
    },
    __wbg_next_eb8ca7351fa27906: function() {
      return handleError(function(arg0) {
        const ret = arg0.next();
        return ret;
      }, arguments);
    },
    __wbg_node_84ea875411254db1: function(arg0) {
      const ret = arg0.node;
      return ret;
    },
    __wbg_now_190933fa139cc119: function() {
      const ret = Date.now();
      return ret;
    },
    __wbg_now_e7c6795a7f81e10f: function(arg0) {
      const ret = arg0.now();
      return ret;
    },
    __wbg_performance_3fcf6e32a7e1ed0a: function(arg0) {
      const ret = arg0.performance;
      return ret;
    },
    __wbg_process_44c7a14e11e9f69e: function(arg0) {
      const ret = arg0.process;
      return ret;
    },
    __wbg_prototypesetcall_3249fc62a0fafa30: function(arg0, arg1, arg2) {
      Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
    },
    __wbg_queueMicrotask_35c611f4a14830b2: function(arg0) {
      queueMicrotask(arg0);
    },
    __wbg_queueMicrotask_404ed0a58e0b63cc: function(arg0) {
      const ret = arg0.queueMicrotask;
      return ret;
    },
    __wbg_randomFillSync_6c25eac9869eb53c: function() {
      return handleError(function(arg0, arg1) {
        arg0.randomFillSync(arg1);
      }, arguments);
    },
    __wbg_read_282e152a24fd0856: function(arg0) {
      const ret = arg0.read();
      return ret;
    },
    __wbg_releaseLock_cd76770b7f82a961: function(arg0) {
      arg0.releaseLock();
    },
    __wbg_require_b4edbdcf3e2a1ef0: function() {
      return handleError(function() {
        const ret = module.require;
        return ret;
      }, arguments);
    },
    __wbg_resolve_25a7e548d5881dca: function(arg0) {
      const ret = Promise.resolve(arg0);
      return ret;
    },
    __wbg_respond_33b6f330b6d299fd: function() {
      return handleError(function(arg0, arg1) {
        arg0.respond(arg1 >>> 0);
      }, arguments);
    },
    __wbg_setTimeout_ef24d2fc3ad97385: function() {
      return handleError(function(arg0, arg1) {
        const ret = setTimeout(arg0, arg1);
        return ret;
      }, arguments);
    },
    __wbg_set_29c99a8aac1c01e5: function(arg0, arg1, arg2) {
      arg0.set(getArrayU8FromWasm0(arg1, arg2));
    },
    __wbg_set_6334637f8d338210: function() {
      return handleError(function(arg0, arg1, arg2, arg3, arg4) {
        const ret = arg0.set(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        return ret;
      }, arguments);
    },
    __wbg_set_6e30c9374c26414c: function() {
      return handleError(function(arg0, arg1, arg2) {
        const ret = Reflect.set(arg0, arg1, arg2);
        return ret;
      }, arguments);
    },
    __wbg_set_dca99999bba88a9a: function(arg0, arg1, arg2) {
      arg0[arg1 >>> 0] = arg2;
    },
    __wbg_set_headers_0aeb5c5487b062e9: function(arg0, arg1) {
      arg0.headers = arg1;
    },
    __wbg_set_high_water_mark_cf5739ae16ac842f: function(arg0, arg1) {
      arg0.highWaterMark = arg1;
    },
    __wbg_set_status_e6ce2f87423d0933: function(arg0, arg1) {
      arg0.status = arg1;
    },
    __wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {
      const ret = arg1.stack;
      const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      const len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    },
    __wbg_static_accessor_GLOBAL_9d53f2689e622ca1: function() {
      const ret = typeof global === "undefined" ? null : global;
      return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    },
    __wbg_static_accessor_GLOBAL_THIS_a1a35cec07001a8a: function() {
      const ret = typeof globalThis === "undefined" ? null : globalThis;
      return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    },
    __wbg_static_accessor_SELF_4c59f6c7ea29a144: function() {
      const ret = typeof self === "undefined" ? null : self;
      return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    },
    __wbg_static_accessor_WINDOW_e70ae9f2eb052253: function() {
      const ret = typeof window === "undefined" ? null : window;
      return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    },
    __wbg_subarray_4aa221f6a4f5ab22: function(arg0, arg1, arg2) {
      const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
      return ret;
    },
    __wbg_subtle_99cc9e2c28f0a5f8: function(arg0) {
      const ret = arg0.subtle;
      return ret;
    },
    __wbg_then_18f476d590e58992: function(arg0, arg1, arg2) {
      const ret = arg0.then(arg1, arg2);
      return ret;
    },
    __wbg_then_ac7b025999b52837: function(arg0, arg1) {
      const ret = arg0.then(arg1);
      return ret;
    },
    __wbg_torclient_new: function(arg0) {
      const ret = TorClient.__wrap(arg0);
      return ret;
    },
    __wbg_tryLock_51f4a4acb145724d: function() {
      return handleError(function(arg0) {
        const ret = arg0.tryLock();
        return ret;
      }, arguments);
    },
    __wbg_unlock_3efb60cf187168d0: function() {
      return handleError(function(arg0) {
        const ret = arg0.unlock();
        return ret;
      }, arguments);
    },
    __wbg_value_f3625092ee4b37f4: function(arg0) {
      const ret = arg0.value;
      return ret;
    },
    __wbg_versions_276b2795b1c6a219: function(arg0) {
      const ret = arg0.versions;
      return ret;
    },
    __wbg_view_d523e3b92648b62c: function(arg0) {
      const ret = arg0.view;
      return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    },
    __wbg_write_6d16f58ddd0cc861: function(arg0, arg1) {
      const ret = arg0.write(arg1);
      return ret;
    },
    __wbindgen_cast_0000000000000001: function(arg0, arg1) {
      const ret = makeMutClosure(arg0, arg1, wasm_bindgen_389f18f337614014___convert__closures_____invoke___wasm_bindgen_389f18f337614014___JsValue______true_);
      return ret;
    },
    __wbindgen_cast_0000000000000002: function(arg0, arg1) {
      const ret = makeMutClosure(arg0, arg1, wasm_bindgen_389f18f337614014___convert__closures_____invoke___wasm_bindgen_389f18f337614014___JsValue__core_9b3796e30d99ddb7___result__Result_____wasm_bindgen_389f18f337614014___JsError___true_);
      return ret;
    },
    __wbindgen_cast_0000000000000003: function(arg0, arg1) {
      const ret = makeMutClosure(arg0, arg1, wasm_bindgen_389f18f337614014___convert__closures_____invoke_______true_);
      return ret;
    },
    __wbindgen_cast_0000000000000004: function(arg0, arg1) {
      const ret = getArrayU8FromWasm0(arg0, arg1);
      return ret;
    },
    __wbindgen_cast_0000000000000005: function(arg0, arg1) {
      const ret = getStringFromWasm0(arg0, arg1);
      return ret;
    },
    __wbindgen_init_externref_table: function() {
      const table3 = wasm.__wbindgen_externrefs;
      const offset = table3.grow(4);
      table3.set(0, void 0);
      table3.set(offset + 0, void 0);
      table3.set(offset + 1, null);
      table3.set(offset + 2, true);
      table3.set(offset + 3, false);
    }
  };
  return {
    __proto__: null,
    "./tor_js_bg.js": import0
  };
}
__name(__wbg_get_imports, "__wbg_get_imports");
function wasm_bindgen_389f18f337614014___convert__closures_____invoke_______true_(arg0, arg1) {
  wasm.wasm_bindgen_389f18f337614014___convert__closures_____invoke_______true_(arg0, arg1);
}
__name(wasm_bindgen_389f18f337614014___convert__closures_____invoke_______true_, "wasm_bindgen_389f18f337614014___convert__closures_____invoke_______true_");
function wasm_bindgen_389f18f337614014___convert__closures_____invoke___wasm_bindgen_389f18f337614014___JsValue______true_(arg0, arg1, arg2) {
  wasm.wasm_bindgen_389f18f337614014___convert__closures_____invoke___wasm_bindgen_389f18f337614014___JsValue______true_(arg0, arg1, arg2);
}
__name(wasm_bindgen_389f18f337614014___convert__closures_____invoke___wasm_bindgen_389f18f337614014___JsValue______true_, "wasm_bindgen_389f18f337614014___convert__closures_____invoke___wasm_bindgen_389f18f337614014___JsValue______true_");
function wasm_bindgen_389f18f337614014___convert__closures_____invoke___wasm_bindgen_389f18f337614014___JsValue__core_9b3796e30d99ddb7___result__Result_____wasm_bindgen_389f18f337614014___JsError___true_(arg0, arg1, arg2) {
  const ret = wasm.wasm_bindgen_389f18f337614014___convert__closures_____invoke___wasm_bindgen_389f18f337614014___JsValue__core_9b3796e30d99ddb7___result__Result_____wasm_bindgen_389f18f337614014___JsError___true_(arg0, arg1, arg2);
  if (ret[1]) {
    throw takeFromExternrefTable0(ret[0]);
  }
}
__name(wasm_bindgen_389f18f337614014___convert__closures_____invoke___wasm_bindgen_389f18f337614014___JsValue__core_9b3796e30d99ddb7___result__Result_____wasm_bindgen_389f18f337614014___JsError___true_, "wasm_bindgen_389f18f337614014___convert__closures_____invoke___wasm_bindgen_389f18f337614014___JsValue__core_9b3796e30d99ddb7___result__Result_____wasm_bindgen_389f18f337614014___JsError___true_");
function wasm_bindgen_389f18f337614014___convert__closures_____invoke___js_sys_19c10af861cdcb72___Function_fn_wasm_bindgen_389f18f337614014___JsValue_____wasm_bindgen_389f18f337614014___sys__Undefined___js_sys_19c10af861cdcb72___Function_fn_wasm_bindgen_389f18f337614014___JsValue_____wasm_bindgen_389f18f337614014___sys__Undefined_______true_(arg0, arg1, arg2, arg3) {
  wasm.wasm_bindgen_389f18f337614014___convert__closures_____invoke___js_sys_19c10af861cdcb72___Function_fn_wasm_bindgen_389f18f337614014___JsValue_____wasm_bindgen_389f18f337614014___sys__Undefined___js_sys_19c10af861cdcb72___Function_fn_wasm_bindgen_389f18f337614014___JsValue_____wasm_bindgen_389f18f337614014___sys__Undefined_______true_(arg0, arg1, arg2, arg3);
}
__name(wasm_bindgen_389f18f337614014___convert__closures_____invoke___js_sys_19c10af861cdcb72___Function_fn_wasm_bindgen_389f18f337614014___JsValue_____wasm_bindgen_389f18f337614014___sys__Undefined___js_sys_19c10af861cdcb72___Function_fn_wasm_bindgen_389f18f337614014___JsValue_____wasm_bindgen_389f18f337614014___sys__Undefined_______true_, "wasm_bindgen_389f18f337614014___convert__closures_____invoke___js_sys_19c10af861cdcb72___Function_fn_wasm_bindgen_389f18f337614014___JsValue_____wasm_bindgen_389f18f337614014___sys__Undefined___js_sys_19c10af861cdcb72___Function_fn_wasm_bindgen_389f18f337614014___JsValue_____wasm_bindgen_389f18f337614014___sys__Undefined_______true_");
var __wbindgen_enum_ReadableStreamType = ["bytes"];
var IntoUnderlyingByteSourceFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_intounderlyingbytesource_free(ptr, 1));
var IntoUnderlyingSinkFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_intounderlyingsink_free(ptr, 1));
var IntoUnderlyingSourceFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_intounderlyingsource_free(ptr, 1));
var TorClientFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_torclient_free(ptr, 1));
var TorClientOptionsFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_torclientoptions_free(ptr, 1));
function addToExternrefTable0(obj) {
  const idx = wasm.__externref_table_alloc();
  wasm.__wbindgen_externrefs.set(idx, obj);
  return idx;
}
__name(addToExternrefTable0, "addToExternrefTable0");
function _assertClass(instance, klass) {
  if (!(instance instanceof klass)) {
    throw new Error(`expected instance of ${klass.name}`);
  }
}
__name(_assertClass, "_assertClass");
var CLOSURE_DTORS = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((state) => wasm.__wbindgen_destroy_closure(state.a, state.b));
function debugString(val) {
  const type2 = typeof val;
  if (type2 == "number" || type2 == "boolean" || val == null) {
    return `${val}`;
  }
  if (type2 == "string") {
    return `"${val}"`;
  }
  if (type2 == "symbol") {
    const description = val.description;
    if (description == null) {
      return "Symbol";
    } else {
      return `Symbol(${description})`;
    }
  }
  if (type2 == "function") {
    const name = val.name;
    if (typeof name == "string" && name.length > 0) {
      return `Function(${name})`;
    } else {
      return "Function";
    }
  }
  if (Array.isArray(val)) {
    const length = val.length;
    let debug3 = "[";
    if (length > 0) {
      debug3 += debugString(val[0]);
    }
    for (let i = 1; i < length; i++) {
      debug3 += ", " + debugString(val[i]);
    }
    debug3 += "]";
    return debug3;
  }
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches && builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    return toString.call(val);
  }
  if (className == "Object") {
    try {
      return "Object(" + JSON.stringify(val) + ")";
    } catch (_) {
      return "Object";
    }
  }
  if (val instanceof Error) {
    return `${val.name}: ${val.message}
${val.stack}`;
  }
  return className;
}
__name(debugString, "debugString");
function getArrayU8FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
__name(getArrayU8FromWasm0, "getArrayU8FromWasm0");
var cachedDataViewMemory0 = null;
function getDataViewMemory0() {
  if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === void 0 && cachedDataViewMemory0.buffer !== wasm.memory.buffer) {
    cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
  }
  return cachedDataViewMemory0;
}
__name(getDataViewMemory0, "getDataViewMemory0");
function getStringFromWasm0(ptr, len) {
  return decodeText(ptr >>> 0, len);
}
__name(getStringFromWasm0, "getStringFromWasm0");
var cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
  if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8ArrayMemory0;
}
__name(getUint8ArrayMemory0, "getUint8ArrayMemory0");
function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    const idx = addToExternrefTable0(e);
    wasm.__wbindgen_exn_store(idx);
  }
}
__name(handleError, "handleError");
function isLikeNone(x) {
  return x === void 0 || x === null;
}
__name(isLikeNone, "isLikeNone");
function makeMutClosure(arg0, arg1, f) {
  const state = { a: arg0, b: arg1, cnt: 1 };
  const real = /* @__PURE__ */ __name((...args) => {
    state.cnt++;
    const a = state.a;
    state.a = 0;
    try {
      return f(a, state.b, ...args);
    } finally {
      state.a = a;
      real._wbg_cb_unref();
    }
  }, "real");
  real._wbg_cb_unref = () => {
    if (--state.cnt === 0) {
      wasm.__wbindgen_destroy_closure(state.a, state.b);
      state.a = 0;
      CLOSURE_DTORS.unregister(state);
    }
  };
  CLOSURE_DTORS.register(real, state, state);
  return real;
}
__name(makeMutClosure, "makeMutClosure");
function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === void 0) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr2 = malloc(buf.length, 1) >>> 0;
    getUint8ArrayMemory0().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;
  const mem = getUint8ArrayMemory0();
  let offset = 0;
  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 127)
      break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
    const ret = cachedTextEncoder.encodeInto(arg, view);
    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }
  WASM_VECTOR_LEN = offset;
  return ptr;
}
__name(passStringToWasm0, "passStringToWasm0");
function takeFromExternrefTable0(idx) {
  const value = wasm.__wbindgen_externrefs.get(idx);
  wasm.__externref_table_dealloc(idx);
  return value;
}
__name(takeFromExternrefTable0, "takeFromExternrefTable0");
var cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
var MAX_SAFARI_DECODE_BYTES = 2146435072;
var numBytesDecoded = 0;
function decodeText(ptr, len) {
  numBytesDecoded += len;
  if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
    cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
    cachedTextDecoder.decode();
    numBytesDecoded = len;
  }
  return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}
__name(decodeText, "decodeText");
var cachedTextEncoder = new TextEncoder();
if (!("encodeInto" in cachedTextEncoder)) {
  cachedTextEncoder.encodeInto = function(arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
      read: arg.length,
      written: buf.length
    };
  };
}
var WASM_VECTOR_LEN = 0;
var wasmModule;
var wasmInstance;
var wasm;
function __wbg_finalize_init(instance, module2) {
  wasmInstance = instance;
  wasm = instance.exports;
  wasmModule = module2;
  cachedDataViewMemory0 = null;
  cachedUint8ArrayMemory0 = null;
  wasm.__wbindgen_start();
  return wasm;
}
__name(__wbg_finalize_init, "__wbg_finalize_init");
async function __wbg_load(module2, imports) {
  if (typeof Response === "function" && module2 instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(module2, imports);
      } catch (e) {
        const validResponse = module2.ok && expectedResponseType(module2.type);
        if (validResponse && module2.headers.get("Content-Type") !== "application/wasm") {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
        } else {
          throw e;
        }
      }
    }
    const bytes = await module2.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module2, imports);
    if (instance instanceof WebAssembly.Instance) {
      return { instance, module: module2 };
    } else {
      return instance;
    }
  }
  function expectedResponseType(type2) {
    switch (type2) {
      case "basic":
      case "cors":
      case "default":
        return true;
    }
    return false;
  }
  __name(expectedResponseType, "expectedResponseType");
}
__name(__wbg_load, "__wbg_load");
async function __wbg_init(module_or_path) {
  if (wasm !== void 0)
    return wasm;
  if (module_or_path !== void 0) {
    if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
      ({ module_or_path } = module_or_path);
    } else {
      console.warn("using deprecated parameters for the initialization function; pass a single object instead");
    }
  }
  if (module_or_path === void 0) {
    module_or_path = new URL("tor_js_bg.wasm", import.meta.url);
  }
  const imports = __wbg_get_imports();
  if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) {
    module_or_path = fetch(module_or_path);
  }
  const { instance, module: module2 } = await __wbg_load(await module_or_path, imports);
  return __wbg_finalize_init(instance, module2);
}
__name(__wbg_init, "__wbg_init");
var LEVEL_ORDER = ["trace", "debug", "info", "warn", "error"];
function levelIndex(level) {
  const idx = LEVEL_ORDER.indexOf(level);
  return idx === -1 ? 1 : idx;
}
__name(levelIndex, "levelIndex");
var logListeners = /* @__PURE__ */ new Map();
function syncWasmLogLevel() {
  let broadestIdx = LEVEL_ORDER.length - 1;
  for (const listener of logListeners.values()) {
    if (listener.levelIdx < broadestIdx) {
      broadestIdx = listener.levelIdx;
    }
  }
  setLogLevel(LEVEL_ORDER[broadestIdx]);
}
__name(syncWasmLogLevel, "syncWasmLogLevel");
function addLogListener(cb, level = "debug") {
  logListeners.set(cb, { callback: cb, levelIdx: levelIndex(level) });
  syncWasmLogLevel();
  return () => {
    logListeners.delete(cb);
    if (logListeners.size > 0) {
      syncWasmLogLevel();
    }
  };
}
__name(addLogListener, "addLogListener");
function setListenerLevel(cb, level) {
  const listener = logListeners.get(cb);
  if (listener) {
    listener.levelIdx = levelIndex(level);
    syncWasmLogLevel();
  }
}
__name(setListenerLevel, "setListenerLevel");
var initPromise = null;
var customWasmUrl;
var wasmSourceProvider;
function setWasmUrl(url) {
  if (initPromise) {
    throw new Error("setWasmUrl() must be called before any TorClient is created");
  }
  customWasmUrl = url;
}
__name(setWasmUrl, "setWasmUrl");
function setWasmSourceProvider(provider) {
  if (initPromise) {
    throw new Error("setWasmSourceProvider() must be called before any TorClient is created");
  }
  wasmSourceProvider = provider;
}
__name(setWasmSourceProvider, "setWasmSourceProvider");
async function ensureWasmInitialized() {
  if (initPromise)
    return initPromise;
  initPromise = doInit();
  return initPromise;
}
__name(ensureWasmInitialized, "ensureWasmInitialized");
async function doInit() {
  if (customWasmUrl) {
    await __wbg_init({ module_or_path: customWasmUrl });
  } else if (wasmSourceProvider) {
    await __wbg_init({ module_or_path: await wasmSourceProvider() });
  } else {
    throw new Error(
      "No WASM source configured. Import from a specific entry point (tor-js/wasm-base64, tor-js/wasm-cdn, or tor-js/wasm-file) or call setWasmUrl() before creating a TorClient."
    );
  }
  init();
  setLogCallback((level, target, message) => {
    const lvl = levelIndex(level);
    for (const listener of logListeners.values()) {
      if (lvl >= listener.levelIdx) {
        listener.callback(level, target, message);
      }
    }
  });
}
__name(doInit, "doInit");
var storage_exports = {};
__export2(storage_exports, {
  FilesystemStorage: () => FilesystemStorage,
  IndexedDBStorage: () => IndexedDBStorage,
  MemoryStorage: () => MemoryStorage,
  addLocking: () => addLocking,
  createAutoStorage: () => createAutoStorage
});
var MemoryStorage = /* @__PURE__ */ __name(class {
  data = /* @__PURE__ */ new Map();
  locked = false;
  async get(key) {
    return this.data.get(key) ?? null;
  }
  async set(key, value) {
    this.data.set(key, value);
  }
  async delete(key) {
    this.data.delete(key);
  }
  async keys(prefix) {
    return [...this.data.keys()].filter((k) => k.startsWith(prefix)).sort();
  }
  async getAll(prefix) {
    const result = [];
    for (const [key, value] of this.data) {
      if (key.startsWith(prefix)) {
        result.push([key, value]);
      }
    }
    return result;
  }
  async tryLock() {
    if (this.locked)
      return false;
    this.locked = true;
    return true;
  }
  async unlock() {
    this.locked = false;
  }
}, "MemoryStorage");
var IndexedDBStorage = /* @__PURE__ */ __name(class {
  dbName;
  storeName = "keyvalue";
  dbPromise = null;
  constructor(name = "tor-js") {
    this.dbName = name;
  }
  getDB() {
    if (!this.dbPromise) {
      this.dbPromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, 1);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName);
          }
        };
      });
    }
    return this.dbPromise;
  }
  async get(key) {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readonly");
      const store = tx.objectStore(this.storeName);
      const request = store.get(key);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        resolve(request.result === void 0 ? null : request.result);
      };
    });
  }
  async set(key, value) {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readwrite");
      const store = tx.objectStore(this.storeName);
      const request = store.put(value, key);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
  async delete(key) {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readwrite");
      const store = tx.objectStore(this.storeName);
      const request = store.delete(key);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
  async keys(prefix) {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readonly");
      const store = tx.objectStore(this.storeName);
      const request = store.getAllKeys();
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const allKeys = request.result;
        resolve(allKeys.filter((k) => k.startsWith(prefix)).sort());
      };
    });
  }
  async getAll(prefix) {
    const db = await this.getDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, "readonly");
      const store = tx.objectStore(this.storeName);
      const keysReq = store.getAllKeys();
      const valsReq = store.getAll();
      tx.onerror = () => reject(tx.error);
      tx.oncomplete = () => {
        const keys = keysReq.result;
        const vals = valsReq.result;
        const result = [];
        for (let i = 0; i < keys.length; i++) {
          if (keys[i].startsWith(prefix)) {
            result.push([keys[i], vals[i]]);
          }
        }
        resolve(result);
      };
    });
  }
}, "IndexedDBStorage");
var promise;
function getNodeDeps() {
  if (!promise) {
    promise = (async () => {
      const [fs, fsSync, os, path] = await Promise.all([
        Promise.resolve().then(() => (init_promises2(), promises_exports)).then((m) => m.default ?? m),
        Promise.resolve().then(() => (init_fs2(), fs_exports)).then((m) => m.default ?? m),
        Promise.resolve().then(() => (init_os(), os_exports)).then((m) => m.default ?? m),
        import("path").then((m) => m.default ?? m)
      ]);
      return { fs, fsSync, os, path };
    })();
  }
  return promise;
}
__name(getNodeDeps, "getNodeDeps");
function isNodeError(err) {
  return err instanceof Error && "code" in err;
}
__name(isNodeError, "isNodeError");
function mangleKey(key) {
  let result = "";
  for (let i = 0; i < key.length; i++) {
    const code = key.charCodeAt(i);
    if (code >= 97 && code <= 122 || // a-z
    code >= 65 && code <= 90 || // A-Z
    code >= 48 && code <= 57) {
      result += key[i];
    } else if (code <= 255) {
      result += "_" + code.toString(16).padStart(2, "0") + "_";
    } else {
      result += "_" + code.toString(16).padStart(4, "0") + "_";
    }
  }
  return result;
}
__name(mangleKey, "mangleKey");
function unmangleKey(filename) {
  let result = "";
  let i = 0;
  while (i < filename.length) {
    if (filename[i] === "_") {
      if (i + 5 < filename.length && filename[i + 5] === "_") {
        const hex = filename.slice(i + 1, i + 5);
        if (/^[0-9a-f]{4}$/i.test(hex)) {
          result += String.fromCharCode(parseInt(hex, 16));
          i += 6;
          continue;
        }
      }
      if (i + 3 < filename.length && filename[i + 3] === "_") {
        const hex = filename.slice(i + 1, i + 3);
        if (/^[0-9a-f]{2}$/i.test(hex)) {
          result += String.fromCharCode(parseInt(hex, 16));
          i += 4;
          continue;
        }
      }
      result += "_";
      i++;
    } else {
      result += filename[i];
      i++;
    }
  }
  return result;
}
__name(unmangleKey, "unmangleKey");
var FilesystemStorage = /* @__PURE__ */ __name(class _FilesystemStorage {
  dirPath;
  name;
  resolvedDirPath = null;
  initialized = false;
  constructor(dirPath) {
    this.dirPath = dirPath;
    this.name = null;
  }
  static localShare(name) {
    const s = new _FilesystemStorage("");
    s.dirPath = null;
    s.name = name;
    return s;
  }
  async resolvedDir() {
    if (!this.resolvedDirPath) {
      if (this.dirPath) {
        this.resolvedDirPath = this.dirPath;
      } else {
        const { os, path } = await getNodeDeps();
        this.resolvedDirPath = path.join(os.homedir(), ".local", "share", this.name);
      }
    }
    return this.resolvedDirPath;
  }
  async ensureDir() {
    if (!this.initialized) {
      const { fs } = await getNodeDeps();
      await fs.mkdir(await this.resolvedDir(), { recursive: true });
      this.initialized = true;
    }
  }
  async filePath(key) {
    const { path } = await getNodeDeps();
    return path.join(await this.resolvedDir(), mangleKey(key));
  }
  async get(key) {
    const { fs } = await getNodeDeps();
    await this.ensureDir();
    try {
      return await fs.readFile(await this.filePath(key), "utf-8");
    } catch (err) {
      if (isNodeError(err) && err.code === "ENOENT")
        return null;
      throw err;
    }
  }
  async set(key, value) {
    const { fs } = await getNodeDeps();
    await this.ensureDir();
    await fs.writeFile(await this.filePath(key), value, "utf-8");
  }
  async delete(key) {
    const { fs } = await getNodeDeps();
    await this.ensureDir();
    try {
      await fs.unlink(await this.filePath(key));
    } catch (err) {
      if (isNodeError(err) && err.code === "ENOENT")
        return;
      throw err;
    }
  }
  async keys(prefix) {
    const { fs } = await getNodeDeps();
    await this.ensureDir();
    try {
      const files = await fs.readdir(await this.resolvedDir());
      return files.map(unmangleKey).filter((k) => k.startsWith(prefix)).sort();
    } catch (err) {
      if (isNodeError(err) && err.code === "ENOENT")
        return [];
      throw err;
    }
  }
  async getAll(prefix) {
    const { fs } = await getNodeDeps();
    await this.ensureDir();
    try {
      const files = await fs.readdir(await this.resolvedDir());
      const keys = files.map(unmangleKey).filter((k) => k.startsWith(prefix));
      const entries = await Promise.all(
        keys.map(async (key) => {
          const value = await this.get(key);
          return value !== null ? [key, value] : null;
        })
      );
      return entries.filter((e) => e !== null);
    } catch (err) {
      if (isNodeError(err) && err.code === "ENOENT")
        return [];
      throw err;
    }
  }
}, "_FilesystemStorage");
function isNodeError2(err) {
  return err instanceof Error && "code" in err;
}
__name(isNodeError2, "isNodeError2");
function addLocking(inner, name) {
  let hasRealLock = false;
  let overlay = null;
  let releaseLock;
  let lockRequestDone;
  let lockPath = null;
  let exitHandler = null;
  let heartbeatTimer = null;
  const STALE_MS = 3e4;
  const HEARTBEAT_MS = 1e4;
  async function tryAcquireReal() {
    if (typeof navigator !== "undefined" && navigator.locks) {
      let resolveAcquired;
      const acquired = new Promise((r) => {
        resolveAcquired = r;
      });
      lockRequestDone = navigator.locks.request(
        `tor-js:${name}`,
        { ifAvailable: true },
        (lock) => {
          if (lock) {
            resolveAcquired(true);
            return new Promise((r) => {
              releaseLock = r;
            });
          }
          resolveAcquired(false);
        }
      );
      return acquired;
    }
    if (typeof process !== "undefined" && process.versions?.node) {
      try {
        const { fs, fsSync, path, os } = await getNodeDeps();
        const dir3 = path.join(os.homedir(), ".local", "share", name);
        await fs.mkdir(dir3, { recursive: true });
        const lp = path.join(dir3, ".lock");
        try {
          await fs.writeFile(lp, `${process.pid}`, { flag: "wx" });
        } catch (err) {
          if (!isNodeError2(err) || err.code !== "EEXIST")
            throw err;
          const stat3 = await fs.stat(lp);
          if (Date.now() - stat3.mtimeMs < STALE_MS)
            return false;
          await fs.writeFile(lp, `${process.pid}`);
        }
        lockPath = lp;
        heartbeatTimer = setInterval(async () => {
          try {
            const now = /* @__PURE__ */ new Date();
            await fs.utimes(lp, now, now);
          } catch {
          }
        }, HEARTBEAT_MS);
        if (heartbeatTimer.unref)
          heartbeatTimer.unref();
        exitHandler = /* @__PURE__ */ __name(() => {
          try {
            fsSync.unlinkSync(lp);
          } catch {
          }
        }, "exitHandler");
        process.on("exit", exitHandler);
        return true;
      } catch (err) {
        return false;
      }
    }
    throw new Error("Failed to detect suitable locking mechanism");
  }
  __name(tryAcquireReal, "tryAcquireReal");
  async function releaseReal() {
    if (releaseLock) {
      releaseLock();
      releaseLock = void 0;
      await lockRequestDone;
      lockRequestDone = void 0;
    }
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer);
      heartbeatTimer = null;
    }
    if (lockPath) {
      const { fs } = await getNodeDeps();
      try {
        await fs.unlink(lockPath);
      } catch (err) {
        if (!isNodeError2(err) || err.code !== "ENOENT")
          throw err;
      }
      lockPath = null;
    }
    if (exitHandler) {
      process.removeListener("exit", exitHandler);
      exitHandler = null;
    }
  }
  __name(releaseReal, "releaseReal");
  return {
    async get(key) {
      if (overlay?.has(key))
        return overlay.get(key);
      return inner.get(key);
    },
    async set(key, value) {
      if (overlay) {
        overlay.set(key, value);
        return;
      }
      return inner.set(key, value);
    },
    async delete(key) {
      if (overlay) {
        overlay.set(key, null);
        return;
      }
      return inner.delete(key);
    },
    async keys(prefix) {
      const base = await inner.keys(prefix);
      if (!overlay)
        return base;
      const result = new Set(base);
      for (const [k, v] of overlay) {
        if (!k.startsWith(prefix))
          continue;
        if (v !== null)
          result.add(k);
        else
          result.delete(k);
      }
      return [...result].sort();
    },
    async getAll(prefix) {
      const base = await inner.getAll(prefix);
      if (!overlay)
        return base;
      const merged = new Map(base);
      for (const [k, v] of overlay) {
        if (!k.startsWith(prefix))
          continue;
        if (v !== null)
          merged.set(k, v);
        else
          merged.delete(k);
      }
      return [...merged.entries()];
    },
    async tryLock() {
      if (hasRealLock)
        return false;
      const acquired = await tryAcquireReal();
      hasRealLock = acquired;
      overlay = acquired ? null : overlay ?? /* @__PURE__ */ new Map();
      return true;
    },
    async unlock() {
      await releaseReal();
      hasRealLock = false;
      overlay = null;
    }
  };
}
__name(addLocking, "addLocking");
function createAutoStorage(name = "tor-js") {
  if (typeof globalThis !== "undefined" && typeof globalThis.indexedDB !== "undefined") {
    return addLocking(new IndexedDBStorage(name), name);
  }
  if (typeof process !== "undefined" && process.versions?.node) {
    return addLocking(FilesystemStorage.localShare(name), name);
  }
  throw new Error(
    "No persistent storage available: need IndexedDB (browser) or filesystem (Node.js)"
  );
}
__name(createAutoStorage, "createAutoStorage");
var Log = /* @__PURE__ */ __name(class _Log {
  rawLog;
  parentStartTime;
  namePrefix;
  constructor(params = {}) {
    this.parentStartTime = params.parentStartTime ?? Date.now();
    this.namePrefix = params.namePrefix ?? "";
    this.rawLog = params.rawLog ?? this.defaultRawLog.bind(this);
  }
  child(name) {
    const newPrefix = this.namePrefix ? `${this.namePrefix}.${name}` : name;
    return new _Log({
      rawLog: this.rawLog,
      parentStartTime: this.parentStartTime,
      namePrefix: newPrefix
    });
  }
  trace(...args) {
    this.log("trace", ...args);
  }
  debug(...args) {
    this.log("debug", ...args);
  }
  info(...args) {
    this.log("info", ...args);
  }
  warn(...args) {
    this.log("warn", ...args);
  }
  error(...args) {
    this.log("error", ...args);
  }
  /** @internal Create a callback for WASM setLogCallback */
  _makeWasmCallback() {
    const levels = /* @__PURE__ */ new Set(["trace", "debug", "info", "warn", "error"]);
    return (level, target, message) => {
      if (!levels.has(level)) {
        this.log("error", `unexpected log level from WASM: ${JSON.stringify(level)}`);
        level = "debug";
      }
      this.child(target).log(level, message);
    };
  }
  log(level, ...args) {
    const elapsed = Date.now() - this.parentStartTime;
    const timestamp = formatTimestamp(elapsed);
    if (this.namePrefix) {
      this.rawLog(level, `[${timestamp}]`, `[${this.namePrefix}]`, ...args);
    } else {
      this.rawLog(level, `[${timestamp}]`, ...args);
    }
  }
  defaultRawLog(level, ...args) {
    console[level](...args);
  }
}, "_Log");
function formatTimestamp(elapsedMs) {
  const totalSeconds = Math.floor(elapsedMs / 1e3);
  const milliseconds = elapsedMs % 1e3;
  const ms = String(milliseconds).padStart(3, "0");
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor(totalSeconds % 86400 / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  const seconds = totalSeconds % 60;
  if (days > 0) {
    return `${days}d ${p2(hours)}:${p2(minutes)}:${p2(seconds)}.${ms}`;
  }
  if (hours > 0) {
    return `${p2(hours)}:${p2(minutes)}:${p2(seconds)}.${ms}`;
  }
  if (minutes > 0) {
    return `${p2(minutes)}:${p2(seconds)}.${ms}`;
  }
  return `${p2(seconds)}.${ms}`;
}
__name(formatTimestamp, "formatTimestamp");
function p2(n) {
  return String(n).padStart(2, "0");
}
__name(p2, "p2");
function parseAddress(s) {
  const malformed = /* @__PURE__ */ __name(() => new Error(
    `address: malformed (expected <ip>:<port>:<certhash> or [ipv6]:<port>:<certhash>): ${s}`
  ), "malformed");
  let ip;
  let rest;
  if (s.startsWith("[")) {
    const end = s.indexOf("]");
    if (end < 0 || s[end + 1] !== ":")
      throw malformed();
    ip = s.slice(1, end);
    rest = s.slice(end + 2);
  } else {
    const i = s.indexOf(":");
    if (i < 0)
      throw malformed();
    ip = s.slice(0, i);
    rest = s.slice(i + 1);
  }
  const j = rest.indexOf(":");
  if (j < 0)
    throw malformed();
  const portStr = rest.slice(0, j);
  const certhash = rest.slice(j + 1);
  if (!/^\d+$/.test(portStr))
    throw malformed();
  const port = Number(portStr);
  if (port < 1 || port > 65535)
    throw new Error("address: port out of range");
  if (!ip || !certhash)
    throw malformed();
  return { ip, port, certhash };
}
__name(parseAddress, "parseAddress");
var enc = new TextEncoder();
var dec = new TextDecoder();
var OPEN_STREAM_TIMEOUT_MS = 2e4;
function abortRace(p, signal, what) {
  if (!signal)
    return p;
  return new Promise((resolve, reject) => {
    const onAbort = /* @__PURE__ */ __name(() => reject(new Error(`${what}: timed out`)), "onAbort");
    if (signal.aborted)
      return onAbort();
    signal.addEventListener("abort", onAbort, { once: true });
    p.then(resolve, reject).finally(() => signal.removeEventListener("abort", onAbort));
  });
}
__name(abortRace, "abortRace");
async function readHead(reader) {
  let buf = new Uint8Array(0);
  for (; ; ) {
    const sep = findHeadEnd(buf);
    if (sep !== -1) {
      const head = dec.decode(buf.subarray(0, sep));
      const lines = head.split("\r\n");
      const m = lines[0].match(/^HTTP\/1\.1 (\d{3})\s*(.*)$/);
      if (!m)
        throw new Error(`malformed status line: ${lines[0]}`);
      const headers = {};
      for (const line of lines.slice(1)) {
        const i = line.indexOf(":");
        if (i === -1)
          continue;
        headers[line.slice(0, i).toLowerCase()] = line.slice(i + 1).trim();
      }
      return {
        status: parseInt(m[1], 10),
        statusText: m[2],
        headers,
        extra: buf.subarray(sep + 4)
      };
    }
    const { done, value } = await reader.read();
    if (done)
      throw new Error("stream ended before response head");
    const next = new Uint8Array(buf.length + value.length);
    next.set(buf, 0);
    next.set(value, buf.length);
    buf = next;
  }
}
__name(readHead, "readHead");
function findHeadEnd(buf) {
  for (let i = 0; i + 3 < buf.length; i++) {
    if (buf[i] === 13 && buf[i + 1] === 10 && buf[i + 2] === 13 && buf[i + 3] === 10) {
      return i;
    }
  }
  return -1;
}
__name(findHeadEnd, "findHeadEnd");
function concat(chunks, length) {
  const out = new Uint8Array(length);
  let off2 = 0;
  for (const c of chunks) {
    out.set(c, off2);
    off2 += c.length;
  }
  return out;
}
__name(concat, "concat");
var KpsGateway = /* @__PURE__ */ __name(class {
  #address;
  #certhash;
  #connPromise = null;
  // Per-connection teardown callbacks. The JS kps client does not reliably
  // settle streams when the connection dies (kps ISSUES #4) — a reader
  // blocked on stream.readable can hang forever — so every socket/exchange
  // registers a teardown that conn.closed triggers.
  #teardowns = /* @__PURE__ */ new Map();
  #closed = false;
  #dial;
  /**
   * @param address KPS address (`ip:port:certhash`).
   * @param options Optional {@link KpsGatewayOptions} (e.g. a custom `dial`).
   */
  constructor(address, options = {}) {
    this.#address = address.trim();
    this.#certhash = parseAddress(this.#address).certhash;
    this.#dial = options.dial;
  }
  get address() {
    return this.#address;
  }
  /** Dial (or reuse) the KPS connection, optionally bounding this caller's wait. */
  async #connection(signal) {
    if (this.#closed)
      throw new Error("KpsGateway is closed");
    if (!this.#connPromise) {
      const dialP = this.#dial ? Promise.resolve(this.#dial) : Promise.resolve().then(() => (init_kpsDial(), kpsDial_exports)).then((m) => this.#dial = m.kpsDial);
      const p = dialP.then((dial2) => dial2(this.#address)).then(
        (conn) => {
          this.#teardowns.set(conn, /* @__PURE__ */ new Set());
          const onClosed = /* @__PURE__ */ __name(() => {
            if (this.#connPromise === p)
              this.#connPromise = null;
            const teardowns = this.#teardowns.get(conn);
            this.#teardowns.delete(conn);
            for (const fn of teardowns ?? [])
              fn();
          }, "onClosed");
          conn.closed.then(onClosed, onClosed);
          return conn;
        },
        (err) => {
          if (this.#connPromise === p)
            this.#connPromise = null;
          throw err;
        }
      );
      this.#connPromise = p;
    }
    return abortRace(this.#connPromise, signal, `dial ${this.#address}`);
  }
  #addTeardown(conn, fn) {
    const set = this.#teardowns.get(conn);
    if (!set) {
      queueMicrotask(fn);
      return () => {
      };
    }
    set.add(fn);
    return () => set.delete(fn);
  }
  async #openStream(conn, signal) {
    return conn.openStream({ signal: signal ?? AbortSignal.timeout(OPEN_STREAM_TIMEOUT_MS) });
  }
  /**
   * One KPS-HTTP/1 GET exchange (PROTOCOL.md §3): write the request, FIN,
   * then read the response; the body ends at EOF.
   *
   * @param path Absolute request path (e.g. "/bootstrap.zip.zst").
   * @param opts Optional `signal` bounding the whole exchange.
   */
  async fetch(path, opts = {}) {
    const { signal } = opts;
    const conn = await this.#connection(signal);
    const stream = await this.#openStream(conn, signal);
    const reader = stream.readable.getReader();
    const removeTeardown = this.#addTeardown(conn, () => {
      reader.cancel(new Error("kps connection closed")).catch(() => {
      });
      stream.close().catch(() => {
      });
    });
    try {
      const writer = stream.writable.getWriter();
      await writer.write(enc.encode(`GET ${path} HTTP/1.1\r
Host: ${this.#certhash}\r
\r
`));
      await writer.close();
      const { status, statusText, headers, extra } = await abortRace(
        readHead(reader),
        signal,
        `GET ${path}`
      );
      const chunks = [];
      let length = 0;
      if (extra.length) {
        chunks.push(extra);
        length += extra.length;
      }
      for (; ; ) {
        const { done, value } = await reader.read();
        if (done)
          break;
        if (value?.length) {
          chunks.push(value);
          length += value.length;
        }
      }
      return { status, statusText, headers, body: concat(chunks, length) };
    } finally {
      removeTeardown();
      stream.close().catch(() => {
      });
    }
  }
  /**
   * Open a TCP tunnel to a Tor relay via CONNECT (PROTOCOL.md §4). After
   * the gateway's 200 the stream is the raw byte pipe to the target.
   *
   * @param target Relay address as "ip:port" (consensus relays only).
   * @param opts Optional `signal` bounding setup (dial, stream, CONNECT reply);
   *   it does not affect the tunnel once established.
   */
  async connect(target, opts = {}) {
    const { signal } = opts;
    const conn = await this.#connection(signal);
    const stream = await this.#openStream(conn, signal);
    const reader = stream.readable.getReader();
    const writer = stream.writable.getWriter();
    await writer.write(enc.encode(`CONNECT ${target} HTTP/1.1\r
Host: ${target}\r
\r
`));
    let head;
    try {
      head = await abortRace(readHead(reader), signal, `CONNECT ${target}`);
    } catch (e) {
      stream.close().catch(() => {
      });
      throw e;
    }
    if (head.status !== 200) {
      let text = dec.decode(head.extra);
      try {
        for (; ; ) {
          const { done, value } = await reader.read();
          if (done)
            break;
          text += dec.decode(value, { stream: true });
        }
      } catch {
      }
      stream.close().catch(() => {
      });
      throw new Error(`CONNECT ${target}: ${head.status} ${text.trim() || head.statusText}`);
    }
    writer.releaseLock();
    const readable = new ReadableStream({
      start(controller) {
        if (head.extra.length)
          controller.enqueue(new Uint8Array(head.extra));
      },
      async pull(controller) {
        try {
          const { done, value } = await reader.read();
          if (done)
            controller.close();
          else if (value?.length)
            controller.enqueue(new Uint8Array(value));
        } catch (e) {
          controller.error(e);
        }
      },
      cancel(reason) {
        reader.cancel(reason).catch(() => {
        });
      }
    });
    const closed = stream.closed.then(
      (info3) => ({ ok: info3.ok, reason: info3.ok ? void 0 : info3.reason?.code ?? "error" }),
      (err) => ({ ok: false, reason: err?.code ?? err?.message ?? "closed" })
    );
    const removeTeardown = this.#addTeardown(conn, () => {
      reader.cancel(new Error("kps connection closed")).catch(() => {
      });
      stream.close().catch(() => {
      });
    });
    stream.closed.then(removeTeardown, removeTeardown);
    return new ArtiSocket({
      readable,
      writable: stream.writable,
      closed,
      closeWrite: () => stream.closeWrite(),
      close: () => {
        stream.close().catch(() => {
        });
      }
    });
  }
  /** Close the underlying KPS connection (all streams/tunnels with it). */
  close() {
    this.#closed = true;
    const p = this.#connPromise;
    this.#connPromise = null;
    if (p) {
      p.then((conn) => conn.close()).catch(() => {
      });
    }
  }
}, "KpsGateway");
var HAS_DENO = typeof globalThis.Deno !== "undefined";
var HAS_NODE = typeof globalThis.process?.versions?.node !== "undefined";
function defaultStrategies(hasGateway) {
  const s = [];
  if (HAS_DENO || HAS_NODE)
    s.push("direct");
  if (hasGateway)
    s.push("kps");
  return s;
}
__name(defaultStrategies, "defaultStrategies");
var PREFERRED_GATEWAYS = 2;
var DEFAULT_TIMING = {
  attemptTimeoutMs: 15e3,
  cooldownBaseMs: 2e3,
  cooldownMaxMs: 6e4
};
function shuffled(items) {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
__name(shuffled, "shuffled");
var ArtiSocket = /* @__PURE__ */ __name(class _ArtiSocket {
  /** Inbound bytes. Pull-based: reading drives the transport's network pull. */
  readable;
  /** Outbound bytes. The writer's backpressure reflects the transport buffer. */
  writable;
  /** Resolves when the socket is fully closed. */
  closed;
  #closeWrite;
  #close;
  constructor(parts) {
    this.readable = parts.readable;
    this.writable = parts.writable;
    this.closed = parts.closed;
    this.#closeWrite = parts.closeWrite;
    this.#close = parts.close;
  }
  /** Half-close the write side (the peer sees a TCP FIN); reads continue. */
  closeWrite() {
    return this.#closeWrite();
  }
  /** Tear down both halves of the socket. */
  close() {
    this.#close();
  }
  // -- Transport factories --------------------------------------------------
  /** Wrap a Node.js net.Socket (already connected) as WHATWG streams. */
  static async fromNodeSocket(socket) {
    const { Duplex } = await import("stream");
    const { readable, writable } = Duplex.toWeb(socket);
    return new _ArtiSocket({
      readable,
      writable,
      closed: new Promise((resolve) => {
        socket.once("close", (hadError) => resolve({ ok: !hadError }));
      }),
      closeWrite: () => new Promise((resolve) => socket.end(resolve)),
      close: () => socket.destroy()
    });
  }
  /** Wrap a Deno TCP connection (whose readable/writable are already WHATWG). */
  static fromDenoConn(conn) {
    let onClosed;
    const closed = new Promise((resolve) => {
      onClosed = /* @__PURE__ */ __name(() => resolve({ ok: true }), "onClosed");
    });
    return new _ArtiSocket({
      readable: conn.readable,
      writable: conn.writable,
      closed,
      closeWrite: () => conn.closeWrite ? conn.closeWrite() : Promise.resolve(),
      close: () => {
        try {
          conn.close();
        } catch {
        }
        onClosed();
      }
    });
  }
}, "_ArtiSocket");
var ArtiSocketProvider = /* @__PURE__ */ __name(class {
  #states = [];
  #strategies;
  #timing;
  constructor(options = {}) {
    const addresses = options.gateway == null ? [] : Array.isArray(options.gateway) ? options.gateway : [options.gateway];
    for (const address of shuffled(addresses)) {
      if (/^(https?|wss?):\/\//.test(address)) {
        throw new Error(
          `gateway is now a KPS address ("ip:port:certhash"), not a URL \u2014 got "${address}". Gateways expose their address at startup and in /metadata.json.`
        );
      }
      this.#states.push({
        gw: new KpsGateway(address, { dial: options.dial }),
        inFlight: 0,
        failures: 0,
        notBefore: 0
      });
    }
    this.#strategies = options.strategies ?? defaultStrategies(this.#states.length > 0);
    this.#timing = { ...DEFAULT_TIMING, ...options.timing };
  }
  /**
   * The gateway currently preferred for single-gateway work, or null if none is
   * configured. Prefer {@link gatewayFetch} for requests — it falls over.
   */
  get gateway() {
    return this.#candidates()[0]?.gw ?? null;
  }
  /**
   * Gateways in the order to try them for one operation; the first is the pick,
   * the rest are fallbacks.
   *
   * Least-outstanding decides between members of the preferred set, and is the
   * whole latency story here: a slow or stalled gateway accumulates in-flight
   * work and stops being chosen, with no probing or RTT bookkeeping. Because
   * the sort is stable, equal load keeps the construction-time shuffle — so a
   * client whose tunnels don't overlap reuses one gateway (and fast bootstrap
   * contacts exactly one), while concurrent load spreads across the set.
   */
  #candidates() {
    const now = Date.now();
    const ready = this.#states.filter((s) => s.notBefore <= now);
    const preferred = ready.slice(0, PREFERRED_GATEWAYS).sort((a, b) => a.inFlight - b.inFlight);
    const rest = ready.slice(PREFERRED_GATEWAYS);
    const cooling = this.#states.filter((s) => s.notBefore > now).sort((a, b) => a.notBefore - b.notBefore);
    return [...preferred, ...rest, ...cooling];
  }
  #onSuccess(s) {
    s.failures = 0;
    s.notBefore = 0;
  }
  /** Cool a failed gateway off for min(base·2^(n-1), max), 50-100% jittered. */
  #onFailure(s) {
    s.failures += 1;
    const { cooldownBaseMs, cooldownMaxMs } = this.#timing;
    const exp = Math.min(cooldownMaxMs, cooldownBaseMs * 2 ** (s.failures - 1));
    s.notBefore = Date.now() + Math.round(exp * (0.5 + Math.random() * 0.5));
  }
  /**
   * Open a relay socket to the given target (e.g. "198.51.100.1:9001").
   * Tries each configured strategy in order until one succeeds.
   */
  async connect(target) {
    const errors = [];
    for (const strategy of this.#strategies) {
      try {
        switch (strategy) {
          case "direct":
            return await this.#connectDirect(target);
          case "kps":
            return await this.#connectKps(target);
          default:
            throw new Error(`unknown strategy: ${strategy}`);
        }
      } catch (e) {
        errors.push(`${strategy}: ${e.message}`);
      }
    }
    throw new Error(`all strategies failed for ${target}: ${errors.join("; ")}`);
  }
  /** Close all KPS gateway connections and release resources. */
  close() {
    for (const s of this.#states)
      s.gw.close();
  }
  // -- Direct TCP strategy (Node.js / Deno) ---------------------------------
  async #connectDirect(target) {
    const [host, portStr] = target.split(":");
    const port = parseInt(portStr, 10);
    if (HAS_DENO) {
      const conn = await globalThis.Deno.connect({ hostname: host, port });
      return ArtiSocket.fromDenoConn(conn);
    }
    if (HAS_NODE) {
      const net = await import("net");
      const socket = net.createConnection({ host, port });
      await new Promise((resolve, reject) => {
        socket.once("connect", resolve);
        socket.once("error", reject);
      });
      return ArtiSocket.fromNodeSocket(socket);
    }
    throw new Error("direct TCP not available in this environment");
  }
  // -- KPS gateway strategy -------------------------------------------------
  async #connectKps(target) {
    if (!this.#states.length)
      throw new Error("kps strategy requires a gateway address");
    const errors = [];
    for (const s of this.#candidates()) {
      s.inFlight += 1;
      try {
        const sock = await s.gw.connect(target, {
          signal: AbortSignal.timeout(this.#timing.attemptTimeoutMs)
        });
        this.#onSuccess(s);
        const release3 = /* @__PURE__ */ __name(() => {
          s.inFlight -= 1;
        }, "release");
        sock.closed.then(release3, release3);
        return sock;
      } catch (e) {
        s.inFlight -= 1;
        this.#onFailure(s);
        errors.push(`${s.gw.address}: ${e.message}`);
      }
    }
    throw new Error(`all gateways failed for ${target}: ${errors.join("; ")}`);
  }
  /**
   * One KPS-HTTP/1 GET against a gateway (used for fast bootstrap), falling
   * over to the next candidate on failure. The happy path contacts exactly one
   * gateway — bootstrap is not raced.
   */
  async gatewayFetch(path) {
    if (!this.#states.length)
      throw new Error("no gateway configured");
    const errors = [];
    for (const s of this.#candidates()) {
      try {
        const res = await s.gw.fetch(path, {
          signal: AbortSignal.timeout(this.#timing.attemptTimeoutMs)
        });
        this.#onSuccess(s);
        return res;
      } catch (e) {
        this.#onFailure(s);
        errors.push(`${s.gw.address}: ${e.message}`);
      }
    }
    throw new Error(`all gateways failed for ${path}: ${errors.join("; ")}`);
  }
}, "ArtiSocketProvider");
function isBrowser() {
  const g = globalThis;
  const hasNode = typeof g.process?.versions?.node !== "undefined";
  const hasDeno = typeof g.Deno !== "undefined";
  return !hasNode && !hasDeno && typeof g.window !== "undefined";
}
__name(isBrowser, "isBrowser");
var TorClient2 = /* @__PURE__ */ __name(class {
  log;
  clientPromise;
  removeLogListener = null;
  wasmCallback = null;
  closed = false;
  readyPromise = null;
  socketProvider = null;
  constructor(options = {}) {
    const hasGateway = Array.isArray(options.gateway) ? options.gateway.length > 0 : !!options.gateway;
    if (isBrowser() && !hasGateway && !options.socketProvider) {
      throw new Error(
        `TorClient: in the browser, you must configure a gateway (KPS address "ip:port:certhash") because browsers can't open regular TCP sockets.`
      );
    }
    this.log = options.log ?? new Log({ rawLog: () => {
    } });
    this.clientPromise = this.bootstrap(options);
    this.clientPromise.catch(() => {
    });
  }
  async bootstrap(options) {
    await ensureWasmInitialized();
    this.wasmCallback = this.log._makeWasmCallback();
    this.removeLogListener = addLogListener(this.wasmCallback, options.logLevel);
    this.socketProvider = options.socketProvider ?? new ArtiSocketProvider({ gateway: options.gateway });
    const sp = this.socketProvider;
    let wasmOptions = new TorClientOptions(
      (addr) => sp.connect(addr)
    );
    const storage = options.storage ?? createAutoStorage();
    wasmOptions = wasmOptions.withStorage(storage);
    if (sp.gateway) {
      wasmOptions = wasmOptions.withFastBootstrap(async () => {
        this.log.info("Fast bootstrap: fetching bootstrap.zip.zst...");
        const res = await sp.gatewayFetch("/bootstrap.zip.zst");
        if (res.status !== 200) {
          throw new Error(`Fast bootstrap fetch failed: ${res.status} ${res.statusText}`);
        }
        this.log.info(`Fast bootstrap: received ${res.body.byteLength} bytes (compressed)`);
        return res.body;
      });
    }
    this.log.info("Bootstrapping...");
    const client = await TorClient.create(wasmOptions);
    this.log.info("Bootstrap complete");
    return client;
  }
  /**
   * Make an HTTP fetch request through Tor.
   * Returns a standard browser Response object.
   */
  async fetch(url, init2) {
    if (this.closed)
      throw new Error("TorClient is closed");
    const client = await this.clientPromise;
    await this.ready();
    this.log.info(`Fetching ${url}`);
    return client.fetch(url, init2);
  }
  /**
   * Wait for the Tor client to be ready for traffic
   * (guard connected, usable consensus, and sufficient microdescs).
   *
   * Parallel callers share the same underlying promise — a single WS
   * connection failure rejects all waiters. The cached promise is cleared
   * on settle so the next call creates a fresh attempt.
   */
  async ready() {
    if (this.closed)
      throw new Error("TorClient is closed");
    if (this.readyPromise)
      return this.readyPromise;
    const p = (async () => {
      const startTime = Date.now();
      this.log.info("Waiting for client");
      const client = await this.clientPromise;
      this.log.info("Waiting for client to be ready");
      await client.ready();
      this.log.info(`Client ready in ${Date.now() - startTime}ms`);
    })();
    this.readyPromise = p;
    const clear3 = /* @__PURE__ */ __name(() => {
      this.readyPromise = null;
    }, "clear");
    p.then(clear3, clear3);
    return p;
  }
  /**
   * Change the log level for this client's listener.
   * Also re-syncs the global WASM filter to the broadest level across all clients.
   */
  setLogLevel(level) {
    if (this.wasmCallback) {
      setListenerLevel(this.wasmCallback, level);
    }
  }
  /**
   * Close the TorClient and release resources.
   */
  close() {
    if (this.closed)
      return;
    this.closed = true;
    this.removeLogListener?.();
    this.removeLogListener = null;
    this.wasmCallback = null;
    this.socketProvider?.close();
    this.socketProvider = null;
    this.clientPromise.then((client) => client.close()).catch(() => {
    });
  }
  [Symbol.dispose]() {
    this.close();
  }
}, "TorClient2");
var CACHE_KEY = "wasm";
function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}
__name(hexToBytes, "hexToBytes");
function bytesToBase64(bytes) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64");
  }
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
__name(bytesToBase64, "bytesToBase64");
function base64ToBytes(base64) {
  if (typeof Buffer !== "undefined") {
    return new Uint8Array(Buffer.from(base64, "base64"));
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
__name(base64ToBytes, "base64ToBytes");
async function sha256hex(bytes) {
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const buf = bytes instanceof Uint8Array ? bytes.buffer : bytes;
    const hashBuf = await crypto.subtle.digest("SHA-256", buf);
    return [...new Uint8Array(hashBuf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  const { createHash: createHash2 } = await Promise.resolve().then(() => (init_crypto2(), crypto_exports));
  return createHash2("sha256").update(new Uint8Array(bytes)).digest("hex");
}
__name(sha256hex, "sha256hex");
async function decryptAesGcm(encrypted, keyBytes) {
  const iv = keyBytes.slice(0, 12);
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const key = await crypto.subtle.importKey("raw", keyBytes.buffer, "AES-GCM", false, ["decrypt"]);
    return crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, encrypted);
  }
  const { createDecipheriv: createDecipheriv2 } = await Promise.resolve().then(() => (init_crypto2(), crypto_exports));
  const data = new Uint8Array(encrypted);
  const authTag = data.slice(-16);
  const ciphertext = data.slice(0, -16);
  const decipher = createDecipheriv2("aes-256-gcm", keyBytes, iv);
  decipher.setAuthTag(authTag);
  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return decrypted.buffer.slice(decrypted.byteOffset, decrypted.byteOffset + decrypted.byteLength);
}
__name(decryptAesGcm, "decryptAesGcm");
setWasmSourceProvider(async () => {
  let cache;
  try {
    cache = createAutoStorage("tor-js-wasm");
  } catch {
  }
  if (cache) {
    try {
      const cached = await cache.get(CACHE_KEY);
      if (cached) {
        const bytes = base64ToBytes(cached);
        const hash2 = await sha256hex(bytes);
        if (hash2 === "952bf7f4efcd5b4e97be0e3a9f0dd93e16003891ca90600e0bac7eaa407faecb") {
          return bytes;
        }
        await cache.delete(CACHE_KEY);
      }
    } catch {
    }
  }
  const hashBytes = hexToBytes("952bf7f4efcd5b4e97be0e3a9f0dd93e16003891ca90600e0bac7eaa407faecb");
  const hashHash = await sha256hex(hashBytes);
  const hashHashPrefix = hashHash.slice(0, 2);
  const githubBase = `https://raw.githubusercontent.com/voltrevo/arti/hash-artifacts/`;
  const sources = [
    { urls: [`https://cdn.jsdelivr.net/npm/tor-js@${"0.4.1"}/dist/tor_js_bg.wasm`], encrypted: false },
    { urls: [`https://unpkg.com/tor-js@${"0.4.1"}/dist/tor_js_bg.wasm`], encrypted: false },
    { urls: [`${githubBase}${hashHashPrefix}/${hashHash}`, `${githubBase}tmp/${hashHash}`], encrypted: true }
  ];
  for (let i = sources.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sources[i], sources[j]] = [sources[j], sources[i]];
  }
  const errors = [];
  for (const source of sources) {
    for (const url of source.urls) {
      try {
        const resp = await fetch(url);
        if (!resp.ok)
          throw new Error(`HTTP ${resp.status}`);
        let bytes = await resp.arrayBuffer();
        if (source.encrypted) {
          bytes = await decryptAesGcm(bytes, hashBytes);
        }
        const hash2 = await sha256hex(bytes);
        if (hash2 !== "952bf7f4efcd5b4e97be0e3a9f0dd93e16003891ca90600e0bac7eaa407faecb") {
          throw new Error(`SHA256 mismatch: expected ${"952bf7f4efcd5b4e97be0e3a9f0dd93e16003891ca90600e0bac7eaa407faecb"}, got ${hash2}`);
        }
        const result = new Uint8Array(bytes);
        if (cache) {
          cache.set(CACHE_KEY, bytesToBase64(result)).catch(() => {
          });
        }
        return result;
      } catch (err) {
        errors.push(`${url}: ${err instanceof Error ? err.message : err}`);
      }
    }
  }
  throw new Error(`Failed to load WASM from any CDN:
  ${errors.join("\n  ")}`);
});

// src/lib/route.ts
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var ONION_HOST_RE = /^(?:[a-z0-9-]+\.)*onion$/i;
var SCHEME_RE = /^[a-z][a-z0-9+.-]*:/i;
var SKIP_URL_RE = /^(?:#|about:|blob:|data:|javascript:|mailto:|tel:)/i;
var URL_ATTRIBUTES = [
  "action",
  "background",
  "cite",
  "data",
  "formaction",
  "href",
  "longdesc",
  "manifest",
  "ping",
  "poster",
  "src"
];
function isOnionHostname(hostname2) {
  return ONION_HOST_RE.test(hostname2.toLowerCase());
}
__name(isOnionHostname, "isOnionHostname");
function normalizeTargetUrl(input) {
  const trimmed = input.trim();
  if (!trimmed) {
    return "";
  }
  const candidate = SCHEME_RE.test(trimmed) ? trimmed : looksLikeOnionUrl(trimmed) ? `http://${trimmed}` : `https://${trimmed}`;
  const url = new URL(candidate);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Only HTTP and HTTPS URLs are supported.");
  }
  if (url.username || url.password) {
    throw new Error("URLs with embedded credentials are not supported.");
  }
  return url.toString();
}
__name(normalizeTargetUrl, "normalizeTargetUrl");
function resolveLoadUrl(input, viewerOrigin = "") {
  const normalized = normalizeTargetUrl(input);
  if (!normalized) {
    return "";
  }
  const target = new URL(normalized);
  if (!isOnionHostname(target.hostname)) {
    return target.toString();
  }
  return makeViewerUrl(target.toString(), viewerOrigin);
}
__name(resolveLoadUrl, "resolveLoadUrl");
function makeViewerPath(targetUrl) {
  const target = new URL(normalizeTargetUrl(targetUrl));
  const scheme = target.protocol.slice(0, -1);
  return `/view/${scheme}/${target.host}${target.pathname}${target.search}${target.hash}`;
}
__name(makeViewerPath, "makeViewerPath");
function makeViewerUrl(targetUrl, viewerOrigin = "") {
  const path = makeViewerPath(targetUrl);
  return viewerOrigin ? new URL(path, viewerOrigin).toString() : path;
}
__name(makeViewerUrl, "makeViewerUrl");
function parseViewerTarget(requestUrl) {
  if (requestUrl.pathname === "/view" && requestUrl.searchParams.has("url")) {
    return new URL(normalizeTargetUrl(requestUrl.searchParams.get("url") ?? ""));
  }
  const mirroredTarget = parseMirroredViewerTarget(requestUrl);
  if (mirroredTarget) {
    return mirroredTarget;
  }
  if (requestUrl.pathname.startsWith("/view/")) {
    return parseLegacyEncodedViewerTarget(requestUrl.pathname.slice("/view/".length));
  }
  const legacyPath = decodeURIComponent(requestUrl.pathname.slice(1));
  if (/^https?:\/\//i.test(legacyPath)) {
    return new URL(normalizeTargetUrl(`${legacyPath}${requestUrl.search}`));
  }
  return null;
}
__name(parseViewerTarget, "parseViewerTarget");
function rewriteOnionHtml(html, baseTargetUrl, viewerOrigin = "") {
  let rewritten = html;
  const urlAttributePattern = new RegExp(`\\b(${URL_ATTRIBUTES.join("|")})\\s*=\\s*("([^"]*)"|'([^']*)')`, "gi");
  rewritten = rewritten.replace(urlAttributePattern, (match, attribute, quotedValue, doubleValue, singleValue) => {
    const value = doubleValue ?? singleValue ?? "";
    const quote = quotedValue[0];
    const nextValue = rewriteMaybeOnionUrl(value, baseTargetUrl, viewerOrigin);
    return `${attribute}=${quote}${escapeAttribute(nextValue)}${quote}`;
  });
  const unquotedUrlAttributePattern = new RegExp(`\\b(${URL_ATTRIBUTES.join("|")})\\s*=\\s*([^\\s"'=<>]+)`, "gi");
  rewritten = rewritten.replace(unquotedUrlAttributePattern, (match, attribute, value) => {
    return `${attribute}=${escapeAttribute(rewriteMaybeOnionUrl(value, baseTargetUrl, viewerOrigin))}`;
  });
  rewritten = rewritten.replace(/\bsrcset\s*=\s*("([^"]*)"|'([^']*)')/gi, (match, quotedValue, doubleValue, singleValue) => {
    const value = doubleValue ?? singleValue ?? "";
    const quote = quotedValue[0];
    const nextValue = rewriteSrcset(value, baseTargetUrl, viewerOrigin);
    return `srcset=${quote}${escapeAttribute(nextValue)}${quote}`;
  });
  rewritten = rewritten.replace(/\bstyle\s*=\s*("([^"]*)"|'([^']*)')/gi, (match, quotedValue, doubleValue, singleValue) => {
    const value = doubleValue ?? singleValue ?? "";
    const quote = quotedValue[0];
    const nextValue = rewriteCssUrls(value, baseTargetUrl, viewerOrigin);
    return `style=${quote}${escapeAttribute(nextValue)}${quote}`;
  });
  rewritten = rewritten.replace(/(<style\b[^>]*>)([\s\S]*?)(<\/style>)/gi, (match, open3, css, close2) => {
    return `${open3}${rewriteCssUrls(css, baseTargetUrl, viewerOrigin)}${close2}`;
  });
  rewritten = rewritten.replace(/(<meta\b[^>]*http-equiv\s*=\s*["']?refresh["']?[^>]*content\s*=\s*["'])([^"']*)(["'][^>]*>)/gi, (match, open3, content, close2) => {
    const nextContent = content.replace(/;\s*url=(.+)$/i, (_part, urlPart) => {
      return `; url=${rewriteMaybeOnionUrl(urlPart.trim(), baseTargetUrl, viewerOrigin)}`;
    });
    return `${open3}${escapeAttribute(nextContent)}${close2}`;
  });
  return rewritten;
}
__name(rewriteOnionHtml, "rewriteOnionHtml");
function rewriteMaybeOnionUrl(rawValue, baseTargetUrl, viewerOrigin = "") {
  const value = rawValue.trim();
  if (!value || SKIP_URL_RE.test(value)) {
    return rawValue;
  }
  let resolved;
  try {
    resolved = new URL(value, baseTargetUrl);
  } catch {
    return rawValue;
  }
  if (resolved.protocol !== "http:" && resolved.protocol !== "https:" || !isOnionHostname(resolved.hostname)) {
    return rawValue;
  }
  return makeViewerUrl(resolved.toString(), viewerOrigin);
}
__name(rewriteMaybeOnionUrl, "rewriteMaybeOnionUrl");
function rewriteSrcset(value, baseTargetUrl, viewerOrigin = "") {
  return value.split(",").map((candidate) => {
    const trimmed = candidate.trim();
    if (!trimmed) {
      return "";
    }
    const parts = trimmed.split(/\s+/);
    const url = parts.shift();
    if (!url) {
      return trimmed;
    }
    return [rewriteMaybeOnionUrl(url, baseTargetUrl, viewerOrigin), ...parts].join(" ");
  }).filter(Boolean).join(", ");
}
__name(rewriteSrcset, "rewriteSrcset");
function rewriteCssUrls(css, baseTargetUrl, viewerOrigin = "") {
  return css.replace(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)"']*))\s*\)/gi, (match, doubleValue, singleValue, bareValue) => {
    const value = doubleValue ?? singleValue ?? bareValue ?? "";
    const rewritten = rewriteMaybeOnionUrl(value, baseTargetUrl, viewerOrigin);
    return `url("${rewritten.replace(/"/g, "%22")}")`;
  });
}
__name(rewriteCssUrls, "rewriteCssUrls");
function looksLikeOnionUrl(input) {
  const firstSegment = input.split(/[/?#]/, 1)[0] ?? "";
  return isOnionHostname(firstSegment.split(":", 1)[0] ?? "");
}
__name(looksLikeOnionUrl, "looksLikeOnionUrl");
function parseMirroredViewerTarget(requestUrl) {
  const match = /^\/view\/(https?)\/([^/]+)(\/.*)?$/i.exec(requestUrl.pathname);
  if (!match) {
    return null;
  }
  const [, scheme, host, path = "/"] = match;
  return new URL(normalizeTargetUrl(`${scheme}://${host}${path}${requestUrl.search}`));
}
__name(parseMirroredViewerTarget, "parseMirroredViewerTarget");
function parseLegacyEncodedViewerTarget(encoded) {
  try {
    return new URL(normalizeTargetUrl(decodeTargetUrl(encoded)));
  } catch {
    return null;
  }
}
__name(parseLegacyEncodedViewerTarget, "parseLegacyEncodedViewerTarget");
function decodeTargetUrl(encoded) {
  const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(encoded.length / 4) * 4, "=");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return new TextDecoder().decode(bytes);
}
__name(decodeTargetUrl, "decodeTargetUrl");
function escapeAttribute(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}
__name(escapeAttribute, "escapeAttribute");

// src/lib/tor.ts
var DEFAULT_MAX_RESPONSE_BYTES = 10 * 1024 * 1024;
var DEFAULT_FETCH_TIMEOUT_MS = 12e4;
setWasmUrl(torWasmModule);
var sharedTorStorage = new storage_exports.MemoryStorage();
async function fetchThroughTor(request, targetUrl, env2, viewerOrigin) {
  const client = createClient(env2);
  let closeClient = true;
  const timeoutMs = readPositiveInteger(env2.FETCH_TIMEOUT_MS, DEFAULT_FETCH_TIMEOUT_MS);
  try {
    const response = await client.fetch(targetUrl.toString(), await buildTorFetchInit(request, targetUrl, viewerOrigin, timeoutMs));
    const headers = buildResponseHeaders(response.headers);
    rewriteLocationHeader(headers, targetUrl.toString(), viewerOrigin);
    headers.set("x-onion-viewer-target", targetUrl.toString());
    if (request.method === "HEAD") {
      return {
        response: new Response(null, {
          status: response.status,
          statusText: response.statusText,
          headers
        }),
        targetUrl: targetUrl.toString()
      };
    }
    if (isHtml(headers)) {
      const html = await readLimitedText(response, readPositiveInteger(env2.MAX_RESPONSE_BYTES, DEFAULT_MAX_RESPONSE_BYTES));
      headers.set("content-type", ensureUtf8HtmlContentType(headers.get("content-type")));
      headers.delete("content-length");
      return {
        response: new Response(rewriteOnionHtml(html, targetUrl.toString(), viewerOrigin), {
          status: response.status,
          statusText: response.statusText,
          headers
        }),
        targetUrl: targetUrl.toString()
      };
    }
    headers.delete("content-length");
    if (!response.body) {
      return {
        response: new Response(null, {
          status: response.status,
          statusText: response.statusText,
          headers
        }),
        targetUrl: targetUrl.toString()
      };
    }
    closeClient = false;
    return {
      response: new Response(closeWhenStreamEnds(response.body, () => client.close()), {
        status: response.status,
        statusText: response.statusText,
        headers
      }),
      targetUrl: targetUrl.toString()
    };
  } finally {
    if (closeClient) {
      client.close();
    }
  }
}
__name(fetchThroughTor, "fetchThroughTor");
function createClient(env2) {
  const gateway = splitGateways(env2.TOR_GATEWAY);
  const socketProvider = new CloudflareArtiSocketProvider();
  return new TorClient2({
    gateway: gateway.length > 0 ? gateway : void 0,
    log: new Log(),
    logLevel: env2.TOR_LOG_LEVEL ?? "warn",
    socketProvider,
    storage: sharedTorStorage
  });
}
__name(createClient, "createClient");
async function buildTorFetchInit(request, targetUrl, viewerOrigin, timeoutMs) {
  const headers = {};
  for (const [name, value] of request.headers) {
    if (shouldForwardRequestHeader(name)) {
      headers[name] = value;
    }
  }
  headers["accept-encoding"] = "identity";
  rewriteOriginHeader(headers, targetUrl);
  rewriteRefererHeader(headers, targetUrl, viewerOrigin);
  headers["user-agent"] = headers["user-agent"] ?? "Cloudflare TOR-js Onion Viewer";
  const init2 = {
    method: request.method,
    headers,
    signal: AbortSignal.timeout(timeoutMs)
  };
  if (request.method !== "GET" && request.method !== "HEAD") {
    init2.body = new Uint8Array(await request.arrayBuffer());
  }
  return init2;
}
__name(buildTorFetchInit, "buildTorFetchInit");
var CloudflareArtiSocketProvider = class {
  get gateway() {
    return null;
  }
  async connect(target) {
    const { hostname: hostname2, port } = parseTargetAddress(target);
    const socket = connect({ hostname: hostname2, port }, { allowHalfOpen: true });
    await socket.opened;
    return new ArtiSocket({
      readable: socket.readable,
      writable: socket.writable,
      closed: socket.closed.then(
        () => ({ ok: true }),
        (error3) => ({ ok: false, reason: error3 instanceof Error ? error3.message : String(error3) })
      ),
      closeWrite: async () => {
        await socket.writable.getWriter().close();
      },
      close: () => {
        socket.close().catch(() => void 0);
      }
    });
  }
  async gatewayFetch() {
    throw new Error("KPS gateway bootstrap is not available when Cloudflare direct TCP sockets are used.");
  }
  close() {
  }
};
__name(CloudflareArtiSocketProvider, "CloudflareArtiSocketProvider");
function closeWhenStreamEnds(body, onClose) {
  const reader = body.getReader();
  let closed = false;
  const closeOnce = /* @__PURE__ */ __name(() => {
    if (!closed) {
      closed = true;
      reader.releaseLock();
      onClose();
    }
  }, "closeOnce");
  return new ReadableStream({
    async pull(controller) {
      try {
        const { done, value } = await reader.read();
        if (done) {
          closeOnce();
          controller.close();
          return;
        }
        if (value) {
          controller.enqueue(value);
        }
      } catch (error3) {
        closeOnce();
        controller.error(error3);
      }
    },
    async cancel(reason) {
      try {
        await reader.cancel(reason);
      } finally {
        closeOnce();
      }
    }
  });
}
__name(closeWhenStreamEnds, "closeWhenStreamEnds");
async function readLimitedText(response, maxBytes) {
  const body = response.body;
  if (!body) {
    return "";
  }
  const reader = body.getReader();
  const chunks = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      if (value) {
        total += value.byteLength;
        if (total > maxBytes) {
          await reader.cancel(`Response body exceeds the ${maxBytes} byte limit.`);
          throw new Error(`Response body exceeds the ${maxBytes} byte limit.`);
        }
        chunks.push(value);
      }
    }
  } finally {
    reader.releaseLock();
  }
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(merged);
}
__name(readLimitedText, "readLimitedText");
function buildResponseHeaders(upstreamHeaders) {
  const headers = new Headers();
  for (const [name, value] of upstreamHeaders) {
    if (shouldForwardResponseHeader(name)) {
      headers.set(name, value);
    }
  }
  headers.delete("content-length");
  headers.set("cache-control", "no-store");
  headers.set("content-security-policy", "default-src 'self' 'unsafe-inline' data: blob:; img-src 'self' data: blob:; media-src 'self' data: blob:; form-action 'self'; frame-ancestors 'none'");
  headers.set("referrer-policy", "no-referrer");
  headers.set("x-content-type-options", "nosniff");
  return headers;
}
__name(buildResponseHeaders, "buildResponseHeaders");
function shouldForwardRequestHeader(name) {
  return ![
    "accept-encoding",
    "cf-connecting-ip",
    "cf-ipcountry",
    "cf-ray",
    "cf-visitor",
    "connection",
    "content-length",
    "host",
    "sec-fetch-dest",
    "sec-fetch-mode",
    "sec-fetch-site",
    "sec-fetch-user",
    "upgrade",
    "x-forwarded-for",
    "x-forwarded-proto"
  ].includes(name.toLowerCase());
}
__name(shouldForwardRequestHeader, "shouldForwardRequestHeader");
function shouldForwardResponseHeader(name) {
  return ![
    "connection",
    "content-encoding",
    "content-length",
    "keep-alive",
    "te",
    "trailer",
    "transfer-encoding",
    "upgrade"
  ].includes(name.toLowerCase());
}
__name(shouldForwardResponseHeader, "shouldForwardResponseHeader");
function rewriteLocationHeader(headers, baseTargetUrl, viewerOrigin) {
  const location = headers.get("location");
  if (!location) {
    return;
  }
  const html = `<a href="${location.replace(/"/g, "&quot;")}"></a>`;
  const match = /href="([^"]+)"/.exec(rewriteOnionHtml(html, baseTargetUrl, viewerOrigin));
  if (match) {
    headers.set("location", match[1].replace(/&amp;/g, "&"));
  }
}
__name(rewriteLocationHeader, "rewriteLocationHeader");
function isHtml(headers) {
  return (headers.get("content-type") ?? "").toLowerCase().includes("text/html");
}
__name(isHtml, "isHtml");
function ensureUtf8HtmlContentType(contentType) {
  if (!contentType) {
    return "text/html; charset=utf-8";
  }
  return /charset=/i.test(contentType) ? contentType : `${contentType}; charset=utf-8`;
}
__name(ensureUtf8HtmlContentType, "ensureUtf8HtmlContentType");
function rewriteOriginHeader(headers, targetUrl) {
  if (headers.origin) {
    headers.origin = targetUrl.origin;
  }
}
__name(rewriteOriginHeader, "rewriteOriginHeader");
function rewriteRefererHeader(headers, targetUrl, viewerOrigin) {
  const referer = headers.referer;
  if (!referer) {
    return;
  }
  try {
    const refererUrl = new URL(referer);
    if (refererUrl.origin === viewerOrigin) {
      headers.referer = targetUrl.toString();
    }
  } catch {
    delete headers.referer;
  }
}
__name(rewriteRefererHeader, "rewriteRefererHeader");
function readPositiveInteger(rawValue, fallback) {
  const value = Number(rawValue);
  return Number.isInteger(value) && value > 0 ? value : fallback;
}
__name(readPositiveInteger, "readPositiveInteger");
function splitGateways(rawValue) {
  return rawValue?.split(",").map((value) => value.trim()).filter(Boolean) ?? [];
}
__name(splitGateways, "splitGateways");
function parseTargetAddress(target) {
  if (target.startsWith("[")) {
    const endBracket = target.indexOf("]");
    if (endBracket <= 1 || target[endBracket + 1] !== ":") {
      throw new Error(`Invalid Tor relay address: ${target}`);
    }
    const hostname3 = target.slice(1, endBracket);
    const port2 = Number(target.slice(endBracket + 2));
    if (!hostname3 || !Number.isInteger(port2) || port2 < 1 || port2 > 65535) {
      throw new Error(`Invalid Tor relay address: ${target}`);
    }
    return { hostname: hostname3, port: port2 };
  }
  const lastColon = target.lastIndexOf(":");
  if (lastColon <= 0) {
    throw new Error(`Invalid Tor relay address: ${target}`);
  }
  const hostname2 = target.slice(0, lastColon);
  const port = Number(target.slice(lastColon + 1));
  if (!hostname2 || !Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid Tor relay address: ${target}`);
  }
  return { hostname: hostname2, port };
}
__name(parseTargetAddress, "parseTargetAddress");

// src/worker.ts
var INDEX_PATHS = /* @__PURE__ */ new Set(["/", "/index.html"]);
var VIEWER_METHODS = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
var worker_default = {
  async fetch(request, env2) {
    const url = new URL(request.url);
    if (url.pathname === "/api/resolve") {
      return handleResolve(request, url);
    }
    const targetUrl = parseViewerTarget(url);
    if (targetUrl) {
      return handleViewerRequest(request, targetUrl, env2, url.origin);
    }
    if (INDEX_PATHS.has(url.pathname)) {
      return serveIndex(request, env2);
    }
    return env2.ASSETS.fetch(request);
  }
};
async function handleResolve(request, url) {
  if (request.method !== "GET") {
    return json({ error: "Method not allowed." }, 405);
  }
  try {
    const target = normalizeTargetUrl(url.searchParams.get("url") ?? "");
    if (!target) {
      return json({ error: "Missing url parameter." }, 400);
    }
    return json({ url: resolveLoadUrl(target, url.origin) });
  } catch (error3) {
    return json({ error: getErrorMessage(error3) }, 400);
  }
}
__name(handleResolve, "handleResolve");
async function handleViewerRequest(request, targetUrl, env2, viewerOrigin) {
  if (!VIEWER_METHODS.has(request.method)) {
    return json({ error: "Method not allowed." }, 405);
  }
  if (!isOnionHostname(targetUrl.hostname)) {
    return Response.redirect(targetUrl.toString(), 302);
  }
  try {
    const { response } = await fetchThroughTor(request, targetUrl, env2, viewerOrigin);
    return response;
  } catch (error3) {
    return renderGatewayError(targetUrl, getErrorMessage(error3));
  }
}
__name(handleViewerRequest, "handleViewerRequest");
function serveIndex(request, env2) {
  return env2.ASSETS.fetch(request);
}
__name(serveIndex, "serveIndex");
function renderGatewayError(targetUrl, message) {
  const safeTarget = escapeHtml(targetUrl.toString());
  const safeMessage = escapeHtml(message);
  return new Response(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Onion Viewer Error</title>
    <style>
      body { margin: 0; min-height: 100vh; font-family: Arial, Helvetica, sans-serif; background: #101820; color: #eef4f8; display: grid; place-items: center; padding: 24px; }
      main { width: min(760px, 100%); border: 1px solid rgba(255,255,255,.16); border-radius: 8px; padding: 24px; background: #17232d; }
      h1 { margin: 0 0 12px; font-size: 1.5rem; }
      p { margin: 0 0 14px; line-height: 1.5; color: #bed0dc; }
      code { overflow-wrap: anywhere; color: #c7f5df; }
      a { color: #8fd3ff; }
    </style>
  </head>
  <body>
    <main>
      <h1>Unable to load onion page</h1>
      <p><code>${safeTarget}</code></p>
      <p>${safeMessage}</p>
      <p>This Worker uses <code>tor-js</code> over Cloudflare outbound TCP sockets. Try again if the hidden service or Tor bootstrap is temporarily unavailable.</p>
      <p><a href="/">Return to viewer</a></p>
    </main>
  </body>
</html>`, {
    status: 502,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}
__name(renderGatewayError, "renderGatewayError");
function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}
__name(json, "json");
function getErrorMessage(error3) {
  return error3 instanceof Error ? error3.message : String(error3);
}
__name(getErrorMessage, "getErrorMessage");
function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
__name(escapeHtml, "escapeHtml");

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e) {
    const error3 = reduceError(e);
    return Response.json(error3, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-DCrqMO/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// node_modules/wrangler/templates/middleware/common.ts
init_strip_cf_connecting_ip_header();
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-DCrqMO/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type2, init2) {
        if (type2 === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init2.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type2, init2) => {
      if (type2 === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init2.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=worker.js.map
