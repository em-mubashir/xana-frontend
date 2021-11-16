import React from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import { useState } from "react";

var axios = require("axios");

let theme = createTheme();
theme = responsiveFontSizes(theme);

const User = () => {
  const columns = [
    "id",
    "name",
    "Report Id",
    "User Id",
    "First Name",
    "Last Name",
    "DOB",
    "Passport Number",
    "Test Name",
    "Test Manufacturer",
    "Test Description",
    "Test Performance",
    "Test Authorization",
    "Sample Date",
    "Sample Time",
    "Result Date",
    "Result Time",
    "Result",
    "Status",
  ];

  var config = {
    method: "get",
    url: "http://192.168.18.62/api/admin/all-users",
    headers: {},
  };

  const [dataTable, setDataTable] = useState([]);

  axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .then((response) => {
      setDataTable(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  const options = {
    filterType: "checkbox",
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <MUIDataTable
          title={"Users Details"}
          data={dataTable}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </>
  );
};

export default User;
