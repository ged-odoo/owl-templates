import { Component } from "../../lib/owl";

export class SignOutButton extends Component {
  template = "SignOutButton";

  signOut() {
      this.env.firebase.signOut();
  }
}
