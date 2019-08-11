import { QWeb, utils } from "./owl";
import { App } from "./app";

/**
 * Setup
 */
async function start() {
  const TEMPLATES = await utils.loadTemplates("/templates.xml");
  const qweb = new QWeb(TEMPLATES);
  const env = { qweb };
  const app = new App(env);
  app.mount(document.body);
  (window as any).app = app;
}

start();
