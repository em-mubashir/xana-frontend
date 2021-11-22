import React from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";

const axios = require("axios");

let theme = createTheme();
theme = responsiveFontSizes(theme);

const User = () => {
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

  var config = {
    method: "get",
    url: "http://192.168.18.62/api/admin/all-users",
    headers: {},
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data.data));
      let user_data = response.data.data;
      setUserData(user_data);
      console.log(user_data);
      console.log(userData);
    })
    .catch(function (error) {
      console.log(error);
    });

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
