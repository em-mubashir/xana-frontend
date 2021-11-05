import React from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const User = () => {
  const columns = [
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

  const data = [
    [
      "Joe James",
      "Test Corp",
      "Yonkers",
      "NY",
      "Joe James",
      "Test Corp",
      "Yonkers",
      "NY",
      "Joe James",
      "Test Corp",
      "Yonkers",
      "NY",
      "Joe James",
      "Test Corp",
      "Yonkers",
      "NY",
      "NY",
    ],
    [
      "Joe James",
      "Test Corp",
      "Yonkers",
      "NY",
      "Joe James",
      "Test Corp",
      "Yonkers",
      "NY",
      "Joe James",
      "Test Corp",
      "Yonkers",
      "NY",
      "Joe James",
      "Test Corp",
      "Yonkers",
      "NY",
      "NY",
    ],
    [
      "Joe James",
      "Test Corp",
      "Yonkers",
      "NY",
      "Joe James",
      "Test Corp",
      "Yonkers",
      "NY",
      "Joe James",
      "Test Corp",
      "Yonkers",
      "NY",
      "Joe James",
      "Test Corp",
      "Yonkers",
      "NY",
      "NY",
    ],
    [
      "Joe James",
      "Test Corp",
      "Yonkers",
      "NY",
      "Joe James",
      "Test Corp",
      "Yonkers",
      "NY",
      "Joe James",
      "Test Corp",
      "Yonkers",
      "NY",
      "Joe James",
      "Test Corp",
      "Yonkers",
      "NY",
      "NY",
    ],
  ];

  const options = {
    filterType: "checkbox",
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <MUIDataTable
          title={"Users Details"}
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </>
  );
};

export default User;
