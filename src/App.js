import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import User from "layouts/User.jsx";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          {/* add routes with layouts */}
          <Route path="/" component={Auth} />
          <Route path="/admin" exact component={Admin} />
          <Route path="/user" exact component={User} />
          {/* <Route path='/auth' component={Auth} /> */}
          {/* add routes without layouts */}
          {/* add redirect for first page */}
          {/* <Redirect from="*" to="/" /> */}
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </>
  );
}
