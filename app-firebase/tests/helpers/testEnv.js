import { readFileSync } from "fs";
import { QWeb, router } from "../../lib/owl";
import { ROUTES } from "../../src/routes";
import { Session } from "../../src/Session";
const TEMPLATES = readFileSync("src/components/templates.xml", {
  encoding: "utf8"
});
import { MockFirebase } from "./MockFirebase";

export async function makeTestEnv() {
  window.history.pushState({}, "/", "/");
  const env = {
    qweb: new QWeb(TEMPLATES)
  };
  env.router = new router.Router(env, ROUTES);
  env.firebase = new MockFirebase(env);
  env.session = new Session(env);
  env.cleanup = function() {
    localStorage.removeItem("authUser");
    window.history.pushState({}, "/", "/");
    clearRouter(env.router);
  };
  await env.router.start();
  return env;
}

function clearRouter(router) {
  window.removeEventListener("popstate", router._listener);
  delete QWeb.DIRECTIVE_NAMES.routecomponent;
  QWeb.DIRECTIVES = QWeb.DIRECTIVES.filter(d => d.name !== "routecomponent");

  // remove component defined inroutes
  for (let key in QWeb.components) {
    if (key.startsWith("__component__")) {
      delete QWeb.components[key];
    }
  }
}
