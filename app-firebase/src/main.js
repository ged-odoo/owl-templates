import { App } from "./components/app";
import { makeEnvironment } from "./env";

/**
 * Setup
 */
async function start() {
  const env = await makeEnvironment();
  const app = new App(env);
  app.mount(document.body);
  window.app = app;
}

start();
