import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import TokenVerification from "../views/user/TokenVerification";

export default function User() {
  return (
    <>
      <Switch>
        <Route
          path='/user/verification/:token'
          exact
          component={TokenVerification}
        />

        {/* <Redirect from='/auth' to='/auth/login' /> */}
      </Switch>
    </>
  );
}
