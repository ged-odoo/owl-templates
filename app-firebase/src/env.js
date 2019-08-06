import { QWeb, router, utils } from "../lib/owl";
import { Firebase } from "./Firebase";
import { ROUTES } from "./routes";
import { Session } from "./Session";

/**
 * We prepare here the environment for the application. The most important
 * part of an environment is an instance of QWeb with the templates.
 */

export async function makeEnvironment() {
  const TEMPLATES = await utils.loadTemplates("/templates.xml");
  const qweb = new QWeb(TEMPLATES);
  const env = { qweb };

  env.firebase = new Firebase(fireBaseConfig);
  env.session = new Session(env);
  env.router = new router.Router(env, ROUTES);
  await env.router.start();

  return env;
}
