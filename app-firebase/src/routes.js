import { Account } from "./components/Account";
import { Admin } from "./components/Admin";
import { Home } from "./components/Home";
import { Landing } from "./components/Landing";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { PasswordForget } from "./components/PasswordForget";

async function protectRoute({ env, to, from }) {
  if (!env.session.authUser) {
    env.session.setNextRoute(to.name);
    return { to: "SIGN_IN" };
  }
  return true;
}

export const ROUTES = [
  { name: "LANDING", path: "/", component: Landing },
  { name: "SIGN_UP", path: "/signup", component: SignUp },
  { name: "SIGN_IN", path: "/signin", component: SignIn },
  { name: "PASSWORD_FORGET", path: "/pw-forget", component: PasswordForget },
  {
    name: "HOME",
    path: "/home",
    component: Home,
    beforeRouteEnter: protectRoute
  },
  {
    name: "ADMIN",
    path: "/admin",
    component: Admin,
    beforeRouteEnter: protectRoute
  },
  {
    name: "ACCOUNT",
    path: "/account",
    component: Account,
    beforeRouteEnter: protectRoute
  },
  {
    name: "UNKNOWN",
    path: "*",
    redirect: { to: "LANDING" }
  }
];
