import React from "react";

import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { BASE_URL } from "../../environment";
import axios from "axios";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const CustomReport = () => {
  const [selectedOption, setSelectedOption] = React.useState([]);

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
              <select
                style={{ width: "90px" }}
                className="form-control"
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
          <ThemeProvider theme={theme}>
            <MUIDataTable
              title={"Custom Report Details"}
              // data={dataTable}
              data={dataTable}
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

export default CustomReport;
