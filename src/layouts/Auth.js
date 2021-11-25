import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// views

import Login from "views/auth/Login.js";
import ForgetPassword from "views/auth/ForgetPassword";
import VerifyCode from "views/auth/VerifyCode";
import NewPassword from "views/auth/NewPassword";
// import Register from "views/auth/Register.js";
import TokenVerification from "views/user/TokenVerification";

export default function Auth() {
  return (
    <>
      <main>
        <section className="relative w-full h-full min-h-screen">
          <div className="absolute top-0 w-full h-full bg-trueGray-200 bg-no-repeat bg-full"></div>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route
              path="/auth/forgetpassword"
              exact
              component={ForgetPassword}
            />
            <Route path="/auth/verifycode" exact component={VerifyCode} />
            <Route path="/auth/newpassword" exact component={NewPassword} />

            <Route
              path="/token-verification"
              exact
              component={TokenVerification}
            />

            <Redirect from="/auth" to="/auth/forgetpassword" />
          </Switch>
        </section>
      </main>
    </>
  );
}
