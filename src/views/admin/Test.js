import React from 'react';
import { ThemeProvider } from '@mui/styles';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { BASE_URL, IMAGE_DETECTION_BASE_URL } from '../../environment';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const Test = () => {
  const adminData = useSelector((state) => state.adminData);
  // console.log("test page redux data", adminData);

  const [selectedOption, setSelectedOption] = React.useState([]);
  const [option, setOption] = React.useState();

  // const [dropDownValue, setDropDownValue] = React.useState();
  // const [dropDownId, setDropDownId] = React.useState();

  const onChangeHandleResult = (passedValue, passedId) => {
    console.log(selectedOption);

    //TODO:
    const valueID = selectedOption.filter((value) => value.id != null);
    console.log(valueID);
    //

    const changeSelectedValueOnUI = [...selectedOption];
    changeSelectedValueOnUI[passedId] = passedValue.target.value;
    setSelectedOption(changeSelectedValueOnUI);

    console.log(selectedOption);

    var data = JSON.stringify({
      result: passedValue.target.value,
      id: passedId,
    });

    var config = {
      method: 'put',
      url: BASE_URL + 'admin/update-report-status',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response.status == 200) {
          toast.success('Result Updated Successfully', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });

    // setSelectedResult(passedValue);

    var dataChangePdf = JSON.stringify({
      test_id: passedId,
    });

    var configChangePdf = {
      method: 'post',
      url: IMAGE_DETECTION_BASE_URL + 'get_test_report',
      headers: {
        'Content-Type': 'application/json',
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

  // axios

  // mui datatable
  const columns = [
    {
      name: 'id',
      label: 'ID',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'test_name',
      label: ' Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'test_manufacturer',
      label: ' Manufacturer',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'test_description',
      label: ' Description',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'test_performance',
      label: ' Performance',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'test_authorisation',
      label: 'Authorisation',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'date_register',
      label: 'Registeration Date',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'date_conduct',
      label: 'Conduct Date',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'result',
      label: 'Result',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <React.Fragment>
              <FormControl>
                <Select
                  style={{ width: '110px', height: '30px', fontSize: '14px' }}
                  className="form-control"
                  onChange={(event) =>
                    onChangeHandleResult(event, tableMeta.rowData[0])
                  }
                  value={selectedOption[tableMeta.rowData[0]]}
                >
                  <MenuItem value="Positive">Positive</MenuItem>
                  <MenuItem value="No Result">No Result</MenuItem>
                  <MenuItem value="Negative">Negative</MenuItem>
                  <MenuItem value="Invalid">Invalid</MenuItem>
                </Select>
              </FormControl>
            </React.Fragment>
          );
        },
      },
    },
    {
      name: 'userId',
      label: 'User ID',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'test_image',
      label: ' Image',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'qr_id',
      label: 'QR ID',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'video',
      label: 'Video',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'report_url',
      label: 'Report URL',
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
      selectedValue[data.id] = data.result ? data.result : 'No Result';
    });
    setSelectedOption(selectedValue);
  };
  useEffect(() => {
    // console.log(
    //   "token get from local storage ",
    //   localStorage.getItem("access_token")
    // );
    if (localStorage.getItem('access_token') != null) {
      var data = '';
      var config = {
        method: 'get',
        url: BASE_URL + 'admin/test',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          transformData(response.data.data);
          setDataTable(response.data.data);

          setTotalTests(
            response.data.data.reduce((count, val) => {
              count++;
              return count;
            }, 0)
          );

          setIncompleteReport(
            response.data.data.reduce((count, val) => {
              // console.log(val.test_image);
              if (val.video === null || val.test_image === null) {
                count++;
              }
              return count;
            }, 0)
          );

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
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div className="flex flex-wrap w-full h-auto p-1">
            <div className="xl:w-52 lg:w-3/12 md:w-6/12 sm:w-full h-44 p-3 mr-4 mb-3 rounded-xl bg-blue-900">
              <div className="text-base text-white">Total Tests</div>
              <div className="text-5xl text-white">{totalTests}</div>
              <div className="flex justify-end mt-8">
                <img
                  className="w-10 h-10"
                  alt=""
                  src={require('assets/img/totalTest.svg').default}
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
                  src={require('assets/img/pendingReports.svg').default}
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
                  src={require('assets/img/positiveNegative.svg').default}
                ></img>
              </div>
            </div>
          </div>

          <ThemeProvider theme={theme}>
            <MUIDataTable
              title={'Tests Details'}
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
