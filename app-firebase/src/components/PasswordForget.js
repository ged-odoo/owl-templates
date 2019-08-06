import { Component, router } from "../../lib/owl";

const INITIAL_STATE = {
  email: "",
  error: null
};

export class PasswordForget extends Component {
  template = "PasswordForget";
  state = Object.assign({}, INITIAL_STATE);

  async onSubmit(event) {
    event.preventDefault();
    try {
      const state = this.state;
      await this.env.firebase.resetPassword(state.email);
      this.state = Object.assign({}, INITIAL_STATE);
    } catch (error) {
      this.state.error = error;
    }
  }
}

export class PasswordForgetLink extends Component {
  template = "PasswordForgetLink";
  components = { Link: router.Link };
}
