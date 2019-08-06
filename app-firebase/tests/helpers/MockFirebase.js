export class MockFirebase {
  constructor() {}

  async createUser(email, password) {
    if (this.userListenerCB) {
      this.userListenerCB({ some: "user" });
    }
  }

  async signIn(email, password) {
    if (this.userListenerCB) {
      this.userListenerCB({ some: "user" });
    }
  }

  onAuthUserListener(cb) {
    this.userListenerCB = cb;
  }

  async signOut() {
    if (this.userListenerCB) {
      this.userListenerCB(null);
    }
  }
}
