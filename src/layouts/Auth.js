import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// views

import Login from "views/auth/Login.js";
import NewPassword from "views/auth/NewPassword";
import ForgetPassword from "views/auth/ForgetPassword";
import Register from "views/auth/Register.js";
import TokenVerification from "views/user/TokenVerification";

export default function Auth() {
  return (
    <>
      <main>
        <section className="relative w-full h-full min-h-screen">
          <div className="absolute top-0 w-full h-full bg-trueGray-200 bg-no-repeat bg-full"></div>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/auth/newpassword" exact component={NewPassword} />
            <Route
              path="/auth/forgetpassword"
              exact
              component={ForgetPassword}
            />

            <Route path="/auth/register" exact component={Register} />
            <Route
              path="/token-verification"
              exact
              component={TokenVerification}
            />
            {/* <Redirect from="/auth" to="/auth/login" /> */}
            <Redirect from="/" to="/auth" />
          </Switch>
        </section>
      </main>
    </>
  );
}
