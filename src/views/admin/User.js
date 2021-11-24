import React from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { BASE_URL } from "../../environment";

const axios = require("axios");

let theme = createTheme();
theme = responsiveFontSizes(theme);

const User = () => {
  let history = useHistory();

  const adminData = useSelector((state) => state.adminData);

  const columns = [
    "id",
    "first_name",
    "last_name",
    "middle_name",
    "email",
    "mobile",
    "passport_number",
    "gender",
    "company",
    "roleid_fk",
    "address",
    "image",
    "code",
    "confirmed",
    "dob",
  ];
  const options = {
    filterType: "checkbox",
  };

  const [userData, setUserData] = useState();
  useEffect(() => {
    if (localStorage.getItem("access_token") != null) {
      var config = {
        method: "get",
        url: BASE_URL + "admin/all-users",
        headers: {},
      };
      axios(config)
        .then(function (response) {
          console.log(
            "user page response data",
            JSON.stringify(response.data.data)
          );
          setUserData(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      // history.push("/");
      console.log("redirected to login page from user page");
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <MUIDataTable
          title={"Users Details"}
          // data={dataTable}
          data={userData}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </>
  );
};

export default User;
