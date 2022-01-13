import React from 'react';
import { ThemeProvider } from '@mui/styles';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { BASE_URL, IMAGE_DETECTION_BASE_URL } from '../../environment';
import axios from 'axios';
import TestForm from 'components/Form/TestForm';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let theme = createTheme();
theme = responsiveFontSizes(theme);

const CustomReport = () => {
  const [selectedOption, setSelectedOption] = React.useState([]);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    height: '100%',
    boxShadow: 24,
    backgroundColor: 'white',
    borderRadius: '15px',
    overflowY: 'scroll',
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const onChangeHandleResult = (passedValue, passedId) => {
    const changeSelectedValueOnUI = [...selectedOption];
    changeSelectedValueOnUI[passedId] = passedValue.target.value;
    setSelectedOption(changeSelectedValueOnUI);
    var data = JSON.stringify({
      result: passedValue.target.value,
      id: passedId,
      uDate: new Date(),
    });

    var config = {
      method: 'put',
      url: BASE_URL + 'admin/update-custom-report-status',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.status == 200) {
          var dataChangePdf = JSON.stringify({
            test_id: passedId,
            test_type: 1,
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
              // console.log(JSON.stringify(response.data));
              toast.success('Result Updated Successfully', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })
      .catch(function (error) {
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

    // var dataChangePdf = JSON.stringify({
    //   test_id: passedId,
    //   test_type: 1,
    // });

    // var configChangePdf = {
    //   method: "post",
    //   url: IMAGE_DETECTION_BASE_URL + "get_test_report",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: dataChangePdf,
    // };

    // axios(configChangePdf)
    //   .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

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
      name: 'first_name',
      label: 'First Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'last_name',
      label: 'Last Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'dob',
      label: 'Date Of Birth',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <React.Fragment>{value.split('T')[0]}</React.Fragment>;
        },
      },
    },
    {
      name: 'passport',
      label: 'Passport Number',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'sample_date',
      label: 'Sample Date',
      options: {
        filter: true,
        sort: false,

        customBodyRender: (value, tableMeta, updateValue) => {
          return <React.Fragment>{value.split('T')[0]}</React.Fragment>;
        },
      },
    },
    {
      name: 'sample_time',
      label: 'Sample Time',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'result_date',
      label: 'Result Date',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <React.Fragment>{value.split('T')[0]}</React.Fragment>;
        },
      },
    },
    {
      name: 'result_time',
      label: 'Result Time',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'order_id',
      label: 'Order ID',
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
            </React.Fragment>
          );
        },
      },
    },
    {
      name: 'test_name',
      label: 'Test Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'type',
      label: 'Test Type',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'test_manufacturer',
      label: 'Test Manufacturer',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'test_authorization',
      label: 'Test Authorization',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'test_description',
      label: 'Test Description',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'test_image',
      label: 'User Profile Image',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <React.Fragment>
              {value && value != 'null' && value != 'undefined' ? (
                <a href={value} target="_blank">
                  <button class=" orange-btn  hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
                    View Image
                  </button>
                </a>
              ) : (
                ''
              )}
            </React.Fragment>
          );
        },
      },
    },
    {
      name: 'reportURL',
      label: 'Report',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <React.Fragment>
              {value && value != 'null' && value != 'undefined' ? (
                <a href={value} target="_blank">
                  <button class=" orange-btn  hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
                    Download
                  </button>
                </a>
              ) : (
                ''
              )}
            </React.Fragment>
          );
        },
      },
    },
  ];

  const [dataTable, setDataTable] = useState([]);
  const [testData, setTestData] = useState([]);
  const [token, setToken] = useState(true);

  const transformData = (testData) => {
    var selectedValue = [];
    var test_data = [];
    testData.map((data, index) => {
      test_data[index] = {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        dob: data.dob,
        passport: data.passport,
        sample_date: data.sample_date,
        sample_time: data.sample_time,
        result_date: data.result_date,
        result_time: data.result_time,
        order_id: data.order_id,
        test_name: data.test_name,
        type:data.type,
        test_manufacturer: data.test_manufacturer,
        test_authorization: data.test_authorization,
        test_description: data.test_description,
        reportURL: data.reportURL,
        test_image: data.test_image,
      };
      selectedValue[data.id] = data.result ? data.result : 'No Result';
    });
    setSelectedOption(selectedValue);
    setTestData(test_data);
  };

  useEffect(() => {
    if (localStorage.getItem('access_token') != null) {
      var data = '';
      var config = {
        method: 'get',
        url: BASE_URL + 'admin/customreport',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
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
          if (error.response.status == 401) {
            setToken(false);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('First_Name');
          }
        });
    } else {
      setToken(false);
    }
  }, []);

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
          <div class="mb-3 mr-2 flex flex-wrap justify-end items-center">
            <Button onClick={handleOpen} size="small" color="inherit">
              <img alt="" src={require('../../assets/img/plus.svg').default} />
              <p className="font-bold ml-2">Generate Report</p>
            </Button>
            <Modal open={open}>
              <div style={modalStyle}>
                <div className="mt-3 mr-3 text-right">
                  <Button
                    onClick={handleClose}
                    color="inherit"
                    style={{
                      maxWidth: '30px',
                      maxHeight: '30px',
                      minWidth: '30px',
                      minHeight: '30px',
                      borderRadius: '50%',
                      padding: '0',
                    }}
                  >
                    <img
                      alt=""
                      src={require('../../assets/img/closeButton.svg').default}
                    />
                  </Button>
                </div>
                <TestForm />
              </div>
            </Modal>
          </div>

          <ThemeProvider theme={theme}>
            <MUIDataTable
              title={'Custom Report Details'}
              data={testData}
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
