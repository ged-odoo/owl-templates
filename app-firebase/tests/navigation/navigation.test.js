import { App } from "../../src/components/App";
import { makeTestEnv, makeTestFixture } from "../helpers";

let fixture;
let env;

beforeEach(async () => {
  fixture = makeTestFixture();
});

afterEach(() => {
  fixture.remove();
  if (env) {
    env.cleanup();
  }
});

describe("Various navigation flows", () => {
  test("is redirected to landing page if unknown page", async () => {
    window.history.pushState({}, "asf", "/asdf/asdf");
    expect(document.location.pathname).toBe("/asdf/asdf");
    env = await makeTestEnv();

    const app = new App(env);
    await app.mount(fixture);

    // we should be in the landing page
    expect(document.location.pathname).toBe("/");
  });
});
