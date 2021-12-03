import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import Test from "views/admin/Test.js";
import User from "views/admin/User.js";
import CustomReport from "views/admin/CustomReport";

import ForgetPassword from "views/auth/ForgetPassword";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="md:ml-64 bg-blueGray-50">
        <AdminNavbar />
        {/* <HeaderStats /> */}
        <div className="px-4 md:px-10 mx-auto w-full">
          <Switch>
            {/* <Route path="/admin/dashboard" exact component={Dashboard} /> */}
            {/* <Route path="/admin/settings" exact component={Settings} /> */}
            {/* <Route path="/admin/tables" exact component={Tables} /> */}
            <Route path="/admin/test" exact component={Test} />
            <Route path="/admin/user" exact component={User} />
            <Route path="/admin/customreport" exact component={CustomReport} />

            <Redirect from="/admin" to="/admin/test" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
