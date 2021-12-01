import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "../src/CSS/Style.css";
// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import User from "layouts/User.jsx";

import AddCustomReport from "./components/Report/Report";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          {/* add routes with layouts */}
          <Route path="/admin" component={Admin} />
          <Route path="/user" component={User} />
          <Route path="/auth" component={Auth} />

          <Route
            path="/reports/add-custom-report"
            exact
            component={AddCustomReport}
          />

          {/* add routes without layouts */}
          <Route path="/" exact component={Auth} />
          {/* add redirect for first page */}
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </>
  );
}
