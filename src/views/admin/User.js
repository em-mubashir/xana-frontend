import React from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { BASE_URL } from "../../environment";

const axios = require("axios");

let theme = createTheme();
theme = responsiveFontSizes(theme);

const User = () => {
  const adminData = useSelector((state) => state.adminData);

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "first_name",
      label: "First Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "last_name",
      label: "Last Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "middle_name",
      label: "Middle Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "mobile",
      label: "Mobile",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "passport_number",
      label: "Passport Number",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "gender",
      label: "Gender",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "company",
      label: "Company",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "roleid_fk",
      label: "Roleid fk",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "address",
      label: "Address",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "image",
      label: "Image",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "code",
      label: "Code",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "confirmed",
      label: "Confirmed",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "dob",
      label: "Date of Birth",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  // const columns = [
  //   "id",
  //   "first_name",
  //   "last_name",
  //   "middle_name",
  //   "email",
  //   "mobile",
  //   "passport_number",
  //   "gender",
  //   "company",
  //   "roleid_fk",
  //   "address",
  //   "image",
  //   "code",
  //   "confirmed",
  //   "dob",
  // ];
  // const options = {
  //   filterType: "checkbox",
  // };

  const [token, settoken] = useState(true);

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
      settoken(false);
      console.log("redirected to login page from user page");
    }
  }, []);

  return (
    <>
      {token ? (
        <React.Fragment>
          <ThemeProvider theme={theme}>
            <MUIDataTable
              title={"Users Details"}
              // data={dataTable}
              data={userData}
              columns={columns}
              // options={options}
            />
          </ThemeProvider>
        </React.Fragment>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default User;
