import { Navigation } from "../../src/components/Navigation";
import { makeTestEnv, makeTestFixture } from "../helpers";

let fixture;
let env;

beforeEach(async () => {
  fixture = makeTestFixture();
  env = await makeTestEnv();
});

afterEach(() => {
  fixture.remove();
  env.cleanup();
});

describe("Navigation", () => {
  test("normal rendering with no user", async () => {
    const navigation = new Navigation(env);
    await navigation.mount(fixture);
    expect(fixture.innerHTML).toMatchSnapshot();
  });

  test("normal rendering with logged user", async () => {
    env.session.authUser = true;
    const navigation = new Navigation(env);
    await navigation.mount(fixture);
    expect(fixture.innerHTML).toMatchSnapshot();
  });
});
