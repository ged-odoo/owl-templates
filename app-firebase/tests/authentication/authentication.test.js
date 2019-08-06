import { App } from "../../src/components/App";
import { makeTestEnv, makeTestFixture, nextTick, editInput } from "../helpers";

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

describe("Various authentication flows", () => {
  test("can sign up", async () => {
    const app = new App(env);
    await app.mount(fixture);

    // we should be in the landing page
    expect(fixture.innerHTML).toMatchSnapshot();
    expect(document.location.pathname).toBe("/");

    // clicking on Sign In
    const signIn = fixture.querySelector('a[href="/signin"]');
    signIn.click();
    await nextTick();
    expect(document.location.pathname).toBe("/signin");
    expect(fixture.innerHTML).toMatchSnapshot();

    // there is now a link to Sign up
    const signUp = fixture.querySelector('a[href="/signup"]');
    signUp.click();
    await nextTick();
    expect(document.location.pathname).toBe("/signup");
    expect(fixture.innerHTML).toMatchSnapshot();

    // filling the form
    const signUpButton = fixture.querySelector('button[type="submit"');
    expect(signUpButton.disabled).toBe(true);
    await editInput(fixture.querySelector('input[name="username"]'), "aaron");
    await editInput(
      fixture.querySelector('input[name="email"]'),
      "myemail@gmail.com"
    );
    await editInput(
      fixture.querySelector('input[name="passwordOne"]'),
      "abcdef"
    );
    expect(signUpButton.disabled).toBe(true);
    await editInput(
      fixture.querySelector('input[name="passwordTwo"]'),
      "abcdef"
    );
    expect(signUpButton.disabled).toBe(false);

    // and finally click on Sign Up
    expect(env.session.authUser).toBe(null);
    signUpButton.click();
    await nextTick();

    expect(document.location.pathname).toBe("/home");
    expect(env.session.authUser).not.toBe(null);
    expect(fixture.innerHTML).toMatchSnapshot();
  });

  test("can sign in", async () => {
    const app = new App(env);
    await app.mount(fixture);

    // we should be in the landing page
    expect(document.location.pathname).toBe("/");

    // clicking on Sign In
    const signIn = fixture.querySelector('a[href="/signin"]');
    signIn.click();
    await nextTick();
    expect(document.location.pathname).toBe("/signin");
    expect(fixture.innerHTML).toMatchSnapshot();

    const signInButton =  fixture.querySelector('button[type="submit"');
    expect(signInButton.disabled).toBe(true);

    await editInput(fixture.querySelector('input[name="email"]'), "abc@email.com");
    expect(signInButton.disabled).toBe(true);
    await editInput(
      fixture.querySelector('input[name="password"]'),
      "123456"
    );
    expect(signInButton.disabled).toBe(false);
    expect(env.session.authUser).toBe(null);
    signInButton.click();
    await nextTick();

    expect(env.session.authUser).not.toBe(null);
    expect(document.location.pathname).toBe("/home");
    expect(fixture.innerHTML).toMatchSnapshot();
  });

  test("can sign out from home page", async () => {
    env.session.authUser = { some: "user" };
    await env.router.navigate({ to: "HOME" });
    const app = new App(env);
    await app.mount(fixture);

    // we should be in the landing page, signed in
    expect(fixture.innerHTML).toMatchSnapshot();
    expect(document.location.pathname).toBe("/home");
    expect(env.session.authUser).not.toBe(null);

    // clicking on Sign Out button
    const signout = fixture.querySelector("button");
    signout.click();
    await nextTick();

    expect(fixture.innerHTML).toMatchSnapshot();
    expect(document.location.pathname).toBe("/");
    expect(env.session.authUser).toBe(null);
  });

  test("can sign out from landing page", async () => {
    env.session.authUser = { some: "user" };
    const app = new App(env);
    await app.mount(fixture);

    // we should be in the landing page, signed in
    expect(fixture.innerHTML).toMatchSnapshot();
    expect(document.location.pathname).toBe("/");
    expect(env.session.authUser).not.toBe(null);

    // clicking on Sign Out button
    const signout = fixture.querySelector("button");
    signout.click();
    await nextTick();

    expect(fixture.innerHTML).toMatchSnapshot();
    expect(document.location.pathname).toBe("/");
    expect(env.session.authUser).toBe(null);
  });

  test("can load page", async () => {
    env.session.authUser = { some: "user" };
    await env.router.navigate({ to: "LANDING" });
    const app = new App(env);
    await app.mount(fixture);

    // we should be in the landing page, signed in
    expect(fixture.innerHTML).toMatchSnapshot();

    // we simulate here the answer from firebase
    env.firebase.userListenerCB(env.session.authUser);

    await nextTick();
    // we should still be in landing page
    expect(fixture.innerHTML).toMatchSnapshot();
  });

  test("is redirected to sign in page, then to correct page", async () => {
    window.history.pushState({}, "blabla", "/account");
    expect(document.location.pathname).toBe("/account");

    // we restart the router to take the url into account, no pun intended
    await env.router.start();

    // should have been redirected to /signin
    expect(document.location.pathname).toBe("/signin");
    const app = new App(env);
    await app.mount(fixture);

    // filling the form
    await editInput(fixture.querySelector('input[name="email"]'), "abc@email.com");
    await editInput(
      fixture.querySelector('input[name="password"]'),
      "123456"
    );
    fixture.querySelector('button[type="submit"').click();
    await nextTick();
    // should have been redirected to /account
    expect(document.location.pathname).toBe("/account");
  });
});
