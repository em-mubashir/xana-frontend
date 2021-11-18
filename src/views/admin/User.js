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

  var config = {
    method: "get",
    url: "http://192.168.18.62/api/admin/all-users",
    headers: {},
  };

  const [dataTable, setDataTable] = useState([]);

  axios(config)
    .then((response) => {
      setDataTable(response.data.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  console.log("dataaa", dataTable);

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
