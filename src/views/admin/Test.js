import React from "react";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TestForm from "components/Form/TestForm";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const Test = () => {
  // mui datatable
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

  // popover functions
  const [anchorEl, setAnchorE1] = React.useState(null);

  const handleClick = (event) => {
    setAnchorE1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorE1(null);
  };

  const open = Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;

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

      <div class="mb-3 mr-2 flex flex-wrap justify-end items-center">
        <Button
          aria-describedby={id}
          onClick={handleClick}
          size="small"
          color="inherit"
        >
          <img alt="" src={require("../../assets/img/plus.svg").default} />
        </Button>
        <p className="font-bold">Add new test</p>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <div>
            <TestForm />
          </div>
        </Popover>
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
