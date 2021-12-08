import React from "react";

import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { BASE_URL, IMAGE_DETECTION_BASE_URL } from "../../environment";
import axios from "axios";

import TestForm from "components/Form/TestForm";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const CustomReport = () => {
  const [selectedOption, setSelectedOption] = React.useState([]);

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
    "overflow-y": "scroll",
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const onChangeHandleResult = (passedValue, passedId) => {
    console.log(selectedOption);
    const changeSelectedValueOnUI = [...selectedOption];
    changeSelectedValueOnUI[passedId] = passedValue.target.value;
    setSelectedOption(changeSelectedValueOnUI);

    console.log(selectedOption);

    var data = JSON.stringify({
      result: passedValue.target.value,
      id: passedId,
    });

    var config = {
      method: "put",
      url: BASE_URL + "admin/update-custom-report-status",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    // setSelectedResult(passedValue);

    var dataChangePdf = JSON.stringify({
      test_id: passedId,
    });

    var configChangePdf = {
      method: "post",
      url: IMAGE_DETECTION_BASE_URL + "get_test_report",
      headers: {
        "Content-Type": "application/json",
      },
      data: dataChangePdf,
    };

    axios(configChangePdf)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const columns = [
    {
      name: "custom_report_id",
      label: "ID",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "first_name",
      label: "First Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "last_name",
      label: "Last Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "dob",
      label: "Date Of Birth",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "passport",
      label: "Passport Number",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "sample_date",
      label: "Sample Date",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "sample_time",
      label: "Sample Time",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "result_date",
      label: "Result Date",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "result_time",
      label: "Result Time",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "order_id",
      label: "Order ID",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "result",
      label: "Result",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          // setDropDownId(tableMeta.rowData[0]);
          // setDropDownValue(value);
          return (
            <React.Fragment>
              {/* <select
                style={{ width: "100px" }}
                className="form-control border-2 rounded-md text-xs px-2 py-2 text-center "
                onChange={(event) =>
                  onChangeHandleResult(event, tableMeta.rowData[0])
                }
                // onChange={onChangeHandleResult(tableMeta.rowData[0], value)}
                value={selectedOption[tableMeta.rowData[0]]}
              >
                <option value="Positive">Positive</option>
                <option value="No Result">No Result</option>
                <option value="Negative">Negative</option>
                <option value="Invalid">Invalid</option>
              </select> */}
              <Select
                style={{ width: "110px", height: "30px", fontSize: "14px" }}
                className="form-control"
                onChange={(event) =>
                  onChangeHandleResult(event, tableMeta.rowData[0])
                }
                // onChange={onChangeHandleResult(tableMeta.rowData[0], value)}
                value={selectedOption[tableMeta.rowData[0]]}
              >
                <MenuItem value="Positive">Positive</MenuItem>
                <MenuItem value="No Result">No Result</MenuItem>
                <MenuItem value="Negative">Negative</MenuItem>
                <MenuItem value="Invalid">Invalid</MenuItem>
              </Select>
            </React.Fragment>
          );
        },
      },
    },
    {
      name: "test_name",
      label: "Test Name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "test_manufacturer",
      label: "Test Manufacturer",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "test_authorization",
      label: "Test Authorization",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "test_description",
      label: "Test Description",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "test_image",
      label: "Test Image",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "reportURL",
      label: "Report URL",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const [dataTable, setDataTable] = useState([]);
  const [token, setToken] = useState(true);

  const transformData = (testData) => {
    var selectedValue = [];
    testData.map((data, index) => {
      console.log(data.custom_report_id);
      selectedValue[data.custom_report_id] = data.result
        ? data.result
        : "No Result";
    });
    setSelectedOption(selectedValue);
  };

  useEffect(() => {
    // console.log(
    //   "token get from local storage ",
    //   localStorage.getItem("access_token")
    // );
    if (localStorage.getItem("access_token") != null) {
      var data = "";
      var config = {
        method: "get",
        url: BASE_URL + "admin/customreport",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          transformData(response.data.data);
          setDataTable(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setToken(false);
      // console.log("redirected to login page from test page");
    }
  }, []);

  return (
    <>
      {token ? (
        <React.Fragment>
          <div class="mb-3 mr-2 flex flex-wrap justify-end items-center">
            <Button onClick={handleOpen} size="small" color="inherit">
              <img alt="" src={require("../../assets/img/plus.svg").default} />
              <p className="font-bold ml-2">Add new test</p>
            </Button>
            <Modal open={open}>
              <div style={modalStyle}>
                <div className="mt-3 mr-3 text-right">
                  <Button
                    onClick={handleClose}
                    color="inherit"
                    style={{
                      maxWidth: "30px",
                      maxHeight: "30px",
                      minWidth: "30px",
                      minHeight: "30px",
                      borderRadius: "50%",
                      padding: "0",
                    }}
                  >
                    <img
                      alt=""
                      src={require("../../assets/img/closeButton.svg").default}
                    />
                  </Button>
                </div>
                <TestForm />
              </div>
            </Modal>
          </div>

          <ThemeProvider theme={theme}>
            <MUIDataTable
              title={"Custom Report Details"}
              data={dataTable}
              columns={columns}
              options={{
                selectableRows: false,
              }}
            />
          </ThemeProvider>
        </React.Fragment>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default CustomReport;
