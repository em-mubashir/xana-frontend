import React from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const Test = () => {
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
      <div className="flex flex-wrap w-full h-auto p-1">
        <div className="xl:w-52 h-44 p-3 mr-4 mb-4 rounded-xl bg-blue-900">
          <div className="text-base text-white">Total Tests</div>
          <div className="text-5xl text-white">120</div>
          <div className="flex justify-end mt-8">
            <img
              className="w-10 h-10"
              alt=""
              src={require("assets/img/totalTest.svg").default}
            ></img>
          </div>
        </div>
        <div className="xl:w-52 lg:w-3/12 md:w-6/12 sm:w-full h-44 p-3 mr-4 mb-3 rounded-xl bg-yellow-600">
          <div className="text-base text-white">Pending Reports</div>
          <div className="text-5xl text-white">44</div>
          <div className="flex justify-end mt-8">
            <img
              className="w-10 h-10"
              alt=""
              src={require("assets/img/pendingReports.svg").default}
            ></img>
          </div>
        </div>
        <div className="xl:w-52 lg:w-3/12 md:w-6/12 sm:w-full h-44 p-3 mr-4 mb-3 rounded-xl bg-blue-400">
          <div className="text-base text-white">Positive/Negative</div>
          <div className="text-5xl text-white">244</div>
          <div className="flex justify-end mt-8">
            <img
              className="w-10 h-10"
              alt=""
              src={require("assets/img/positiveNegative.svg").default}
            ></img>
          </div>
        </div>
      </div>
      <ThemeProvider theme={theme}>
        <MUIDataTable
          title={"Tests Details"}
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </>
  );
};

export default Test;
