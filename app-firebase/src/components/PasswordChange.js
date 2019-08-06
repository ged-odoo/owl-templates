import { Component } from "../../lib/owl";

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};

export class PasswordChange extends Component {
  template = "PasswordChange";

  constructor(parent, props) {
    super(parent, props);
    this.state = Object.assign({}, INITIAL_STATE);
  }

  async onSubmit(event) {
    event.preventDefault();
    try {
      const state = this.state;
      await this.env.firebase.updatePassword(state.passwordOne);
      this.state = Object.assign({}, INITIAL_STATE);
    } catch (error) {
      this.state.error = error;
    }
  }

  get isInvalid() {
    const state = this.state;
    return state.passwordOne !== state.passwordTwo || state.passwordTwo === "";
  }
}
