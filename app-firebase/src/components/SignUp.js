import { Component } from "../../lib/owl";

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

export class SignUp extends Component {
  template = "SignUp";
  state = Object.assign({}, INITIAL_STATE);

  get isInvalid() {
    return (
      this.state.passwordOne !== this.state.passwordTwo ||
      this.state.passwordTwo === "" ||
      this.state.email === "" ||
      this.state.username === ""
    );
  }

  async onSubmit(event) {
    event.preventDefault();
    try {
      const state = this.state;
      await this.env.firebase.createUser(state.email, state.passwordOne);
      this.state = Object.assign({}, INITIAL_STATE);
    } catch (error) {
      this.state.error = error;
    }
  }
}
