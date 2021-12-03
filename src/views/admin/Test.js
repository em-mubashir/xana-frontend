import React from "react";

import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { BASE_URL } from "../../environment";
import TestForm from "components/Form/TestForm";
import axios from "axios";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const Test = () => {
  const adminData = useSelector((state) => state.adminData);
  // console.log("test page redux data", adminData);

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
    "overflow-y": "scroll",
  };

  const [open, setOpen] = React.useState(false);

  const [selectedOption, setSelectedOption] = React.useState([]);
  const [option, setOption] = React.useState();

  // const [dropDownValue, setDropDownValue] = React.useState();
  // const [dropDownId, setDropDownId] = React.useState();

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const onChangeHandleResult = (passedValue, passedId) => {
    console.log(selectedOption);
    const changeSelectedValueOnUI = [...passedValue.target.value];
    changeSelectedValueOnUI[passedId] = passedValue.target.value;
    setSelectedOption(changeSelectedValueOnUI);

    console.log(selectedOption);

    var data = JSON.stringify({
      result: passedValue.target.value,
      id: passedId,
    });

    var config = {
      method: "put",
      url: BASE_URL + "admin/update-report-status",
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
  };

  // axios

  // mui datatable
  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: false,
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
      name: "test_description",
      label: "Test Description",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "test_performance",
      label: "Test Performance",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "test_authorisation",
      label: "Test Authorisation",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "date_register",
      label: "Test Registeration Date",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "date_conduct",
      label: "Test Conduct Date",
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
              <select
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
              </select>
            </React.Fragment>
          );
        },
      },
    },
    {
      name: "userId",
      label: "User ID",
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
      name: "qr_id",
      label: "QR ID",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "video",
      label: "Video",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "report_url",
      label: "Report URL",
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const [dataTable, setDataTable] = useState([]);
  const [token, setToken] = useState(true);

  const [totalTests, setTotalTests] = useState([]);
  const [incompleteReports, setIncompleteReport] = useState([]);
  const [positiveNegative, setPositiveNegative] = useState([]);

  const transformData = (testData) => {
    var selectedValue = [];
    testData.map((data, index) => {
      console.log(data.id);
      selectedValue[data.id] = data.result ? data.result : "No Result";
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
        url: BASE_URL + "admin/test",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          // console.log(
          //   "FETCHING ALL TESTTTTTTTTTTTTTTT",
          //   JSON.stringify(response.data)
          // );

          // console.log("Result Data jo save kiya varaible myn", resultData);
          transformData(response.data.data);
          setDataTable(response.data.data);

          // console.log(
          //   "Total Tests",
          //   response.data.data.reduce((count, val) => {
          //     count++;
          //     return count;
          //   }, 0)
          // );
          setTotalTests(
            response.data.data.reduce((count, val) => {
              count++;
              return count;
            }, 0)
          );

          // console.log(
          //   "Pending Reports",
          //   response.data.data.reduce((count, val) => {
          //     console.log(val.test_image);
          //     if (val.test_image != null) {
          //       count++;
          //     }
          //     return count;
          //   }, 0)
          // );
          setIncompleteReport(
            response.data.data.reduce((count, val) => {
              // console.log(val.test_image);
              if (val.test_image == null && val.video == null) {
                count++;
              }
              return count;
            }, 0)
          );

          // console.log(
          //   "Positive/Negative",
          //   response.data.data.reduce((count, val) => {
          //     console.log(val.result);
          //     if (val.result != null) {
          //       count++;
          //     }
          //     return count;
          //   }, 0)
          // );
          setPositiveNegative(
            response.data.data.reduce((count, val) => {
              // console.log(val.result);
              if (val.result != null) {
                count++;
              }
              return count;
            }, 0)
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setToken(false);
      // console.log("redirected to login page from test page");
    }
  }, [totalTests, incompleteReports, positiveNegative]);

  // console.log("test page mui data table", dataTable);

  return (
    <>
      {token ? (
        <React.Fragment>
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
              <div className="text-base text-white">Incomplete Reports</div>
              <div className="text-5xl text-white">{incompleteReports}</div>
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
              title={"Tests Details"}
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

export default Test;
