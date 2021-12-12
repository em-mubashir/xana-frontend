import React from 'react';
import { ThemeProvider } from '@mui/styles';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { BASE_URL } from '../../environment';
import axios from 'axios';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const User = () => {
  const adminData = useSelector((state) => state.adminData);

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
      name: 'mobile',
      label: 'Mobile',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'passport_number',
      label: 'Passport Number',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'gender',
      label: 'Gender',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'company',
      label: 'Company',
      options: {
        filter: true,
        sort: false,
      },
    },
    // {
    //   name: "roleid_fk",
    //   label: "Roleid fk",
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    {
      name: 'address',
      label: 'Address',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'image',
      label: 'Image',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'code',
      label: 'Code',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'confirmed',
      label: 'Confirmed',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'dob',
      label: 'Date of Birth',
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const [token, settoken] = useState(true);

  const [userData, setUserData] = useState();
  useEffect(() => {
    if (localStorage.getItem('access_token') != null) {
      var config = {
        method: 'get',
        url: BASE_URL + 'admin/all-users',
        headers: {},
      };
      axios(config)
        .then(function (response) {
          setUserData(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      settoken(false);
      console.log('redirected to login page from user page');
    }
  }, []);

  return (
    <>
      {token ? (
        <React.Fragment>
          <ThemeProvider theme={theme}>
            <MUIDataTable
              title={'Users Details'}
              data={userData}
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

export default User;
