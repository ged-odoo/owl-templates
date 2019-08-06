import { Component, router } from "../../lib/owl";
import { PasswordForgetLink } from "./PasswordForget";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

export class SignIn extends Component {
  template = "SignIn";
  components = { Link: router.Link, PasswordForgetLink };
  state = Object.assign({}, INITIAL_STATE);

  get isInvalid() {
    return this.state.password === "" || this.state.email === "";
  }

  async onSubmit(event) {
    event.preventDefault();
    try {
      const state = this.state;
      await this.env.firebase.signIn(state.email, state.password);
      this.state = Object.assign({}, INITIAL_STATE);
    } catch (error) {
      this.state.error = error;
    }
  }
}
