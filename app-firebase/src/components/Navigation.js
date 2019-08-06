import { Component, router } from "../../lib/owl";
import { SignOutButton } from "./SignOut";

export class Navigation extends Component {
  template = "Navigation";
  components = { Link: router.Link, SignOutButton };
}
