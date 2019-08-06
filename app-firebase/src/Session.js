export class Session {
  next = null;

  constructor(env) {
    this.authUser = JSON.parse(localStorage.getItem("authUser"));
    this.env = env;

    // Session setup
    env.firebase.onAuthUserListener(authUser => this.onUserChange(authUser));
  }

  setNextRoute(routeName) {
    this.next = routeName;
  }

  async onUserChange(authUser) {
    const didNotChange =
      (this.authUser && authUser) || (!this.authUser && !authUser);

    if (didNotChange) {
      return;
    }

    this.authUser = authUser;
    let target;
    if (authUser) {
      localStorage.setItem("authUser", JSON.stringify(authUser));
      target = this.next ? {to: this.next } : { to: "HOME" };
      this.next = null;
    } else {
      localStorage.removeItem("authUser");
      target = { to: "LANDING" };
    }
    const result = await this.env.router.navigate(target);
    if (result === false) {
      this.env.qweb.forceUpdate();
    }
  }
}
