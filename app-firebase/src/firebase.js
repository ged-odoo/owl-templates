import app from "firebase/app";
import "firebase/auth";

export class Firebase {
  constructor(config) {
    app.initializeApp(config);
    this.app = app;
    this.auth = app.auth();
  }

  createUser(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.auth.signOut();
  }

  resetPassword(email) {
    return this.auth.sendPasswordResetEmail(email);
  }

  updatePassword(password) {
    return this.auth.currentUser.updatePassword(password);
  }

  onAuthUserListener(callback) {
    return this.auth.onAuthStateChanged(callback);
  }
}
