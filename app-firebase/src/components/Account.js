import { PasswordChange } from "./PasswordChange";
import { Component } from "../../lib/owl";

export class Account extends Component {
  template = "Account";
  components = { PasswordChange };
}
