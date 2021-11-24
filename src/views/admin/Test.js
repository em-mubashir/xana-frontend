import React from "react";

import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../../environment";

import TestForm from "components/Form/TestForm";

const axios = require("axios");

let theme = createTheme();
theme = responsiveFontSizes(theme);

const Test = () => {
  let history = useHistory();

  const adminData = useSelector((state) => state.adminData);
  console.log("test page redux data", adminData);

  // Mui Modal functions
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    height: "100%",
    boxShadow: 24,
    backgroundColor: "white",
    borderRadius: "15px",
    overflow: "scroll",
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  // mui datatable
  const columns = [
    "id",
    "test_name",
    "test_manufacturer",
    "test_description",
    "test_performance",
    "test_authorisation",
    "date_register",
    "date_conduct",
    "result",
    "userId",
    "test_image",
    "qr_id",
  ];
  const options = {
    filterType: "checkbox",
  };
  //

  const [dataTable, setDataTable] = useState([]);
  const [totalTests, setTotalTests] = useState([]);
  const [pendingReports, setPendingReports] = useState([]);
  const [positiveNegative, setPositiveNegative] = useState([]);
  useEffect(() => {
    console.log(
      "token get from local storage ",
      localStorage.getItem("access_token")
    );
    if (localStorage.getItem("access_token") != null) {
      var data = "";
      var config = {
        method: "get",
        url: BASE_URL + "admin/test/",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setDataTable(response.data.data);
          console.log("Total Tests", response.data.data.length);
          setTotalTests(response.data.data.length);
          console.log("Pending Reports", response.data);
          setPendingReports(response.data.data.length);
          console.log("Positive/Negative", response.data);
          setPositiveNegative(response.data.data.length);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      // history.push("/");
      console.log("redirected to login page from test page");
    }
  }, [totalTests, pendingReports, positiveNegative]);

  console.log("test page mui data table", dataTable);

  return (
    <>
      <div className="flex flex-wrap w-full h-auto p-1">
        <div className="xl:w-52 lg:w-3/12 md:w-6/12 sm:w-full h-44 p-3 mr-4 mb-3 rounded-xl bg-blue-900">
          <div className="text-base text-white">Total Tests</div>
          <div className="text-5xl text-white">{totalTests}</div>
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
          <div className="text-5xl text-white">{pendingReports}</div>
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
          <div className="text-5xl text-white">{positiveNegative}</div>
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
        <Button onClick={handleOpen} size="small" color="inherit">
          <img alt="" src={require("../../assets/img/plus.svg").default} />
          <p className="font-bold ml-2">Add new test</p>
        </Button>
        <Modal open={open} onClose={handleClose}>
          <div style={modalStyle}>
            <TestForm />
          </div>
        </Modal>
      </div>

      <ThemeProvider theme={theme}>
        <MUIDataTable
          title={"Tests Details"}
          data={dataTable}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </>
  );
};

export default Test;
