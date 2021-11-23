import React from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const axios = require("axios");

let theme = createTheme();
theme = responsiveFontSizes(theme);

const User = () => {
  const adminData = useSelector((state) => state.adminData);
  console.log("admin dataaaa", adminData);
  console.log("access token", adminData.user.payload.accessToken);
  console.log("access token length", adminData.user.payload.accessToken.length);

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

  // const config = {
  // method: "get",
  // url: "http://192.168.18.62/api/admin/all-users",
  // headers: {},
  // };

  const [userData, setUserData] = useState();

  // axios(config)
  // .then((response) => {
  // console.log("api feedback");
  // console.log(response.data.data);
  // setUserData(response.data.data);
  // })
  // .catch(function (error) {
  // console.log(error);
  // });

  // console.log("dataaa", userData);

  if (adminData.user.payload.accessToken.length > 0) {
    console.log("Redirect to login page");
  } else {
    var config = {
      method: "get",
      url: "http://192.168.18.62/api/admin/all-users",
      headers: {},
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.data));
        setUserData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    // console.log("state change");
  }, [userData]);

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
