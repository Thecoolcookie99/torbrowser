// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: ["/*"],
  exclude: [
    "/static/*",
    "/images/*",
    "/css/*",
    "/js/*",
    "/*.png",
    "/*.jpg",
    "/*.jpeg",
    "/*.gif",
    "/*.svg",
    "/*.ico",
    "/*.css",
    "/*.js",
    "/*.map"
  ]
};

// node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "C:\\Users\\theSEAT\\Desktop\\Coding\\Github Projects\\torbrowser\\.wrangler\\tmp\\pages-5BgW5L\\functionsWorker-0.5693531564327259.mjs";
import { isRoutingRuleMatch } from "C:\\Users\\theSEAT\\Desktop\\Coding\\Github Projects\\torbrowser\\node_modules\\wrangler\\templates\\pages-dev-util.ts";
export * from "C:\\Users\\theSEAT\\Desktop\\Coding\\Github Projects\\torbrowser\\.wrangler\\tmp\\pages-5BgW5L\\functionsWorker-0.5693531564327259.mjs";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = worker;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=jr5dmbxpjgj.js.map
