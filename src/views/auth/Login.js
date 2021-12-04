import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { getLoginAsync } from "../../redux/admin/admin.thunk";
import { useDispatch } from "react-redux";

import { BASE_URL } from "../../environment";

// for yup
const scheme = yup
  .object()
  .shape({
    Email: yup.string().email().required("Please enter the email."),
    Password: yup
      .string()
      .required("Please enter the password.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must contain 8 Letters and atleast 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Character."
      ),
  })
  .required();

export default function Login() {
  let history = useHistory();
  const dispatch = useDispatch();

  const [invalidLogin, setInvalidLogin] = useState("");

  if (localStorage.getItem("access_token") != null) {
    history.push("/admin/test");
  }

  // for yup and react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(scheme),
  });

  // sendind form fields data to api
  const submitForm = (formData) => {
    const getFormData = JSON.stringify({
      email: watch("Email"),
      password: watch("Password"),
    });
    const config = {
      method: "post",
      url: BASE_URL + "admin/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: getFormData,
    };

    axios(config)
      .then(function (response) {
        console.log("response data", response.data);
        if (response.data.success) {
          console.log("response success", response.data.success);

          if (response?.data?.data.length > 0) {
            localStorage.setItem(
              "First_Name",
              response.data.data[0].first_name
            );

            dispatch(getLoginAsync(response.data));
            localStorage.setItem(
              "access_token",
              response.data.payload.accessToken
            );
            localStorage.setItem(
              "refresh_token",
              response.data.payload.refreshToken
            );
            console.log(
              "token set on local storage from login page",
              localStorage.getItem("access_token")
            );

            history.push("/admin/test");
          }
        } else {
          setInvalidLogin(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //

  return (
    <>
      <div className="mx-auto px-4 h-auto">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full h-full lg:w-4/12 md:w-9/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full h-full mb-6 rounded-lg bg-trueGray-200 border-0">
              <div className="rounded-t flex justify-center mb-12 px-6 py-6 mt-8">
                <img
                  alt="..."
                  className="mr-1 w-auto h-auto"
                  src={require("assets/img/xana-login.svg").default}
                />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-black text-center mb-6 font-bold text-lg">
                  <h1>Log in as Admin</h1>
                </div>
                <form onSubmit={handleSubmit(submitForm)}>
                  <div className="relative w-full mb-3">
                    <input
                      type="email"
                      // name="Email"
                      className="px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
                      placeholder="User name/Email"
                      {...register("Email")}
                    />
                    <small className="text-red-600">
                      {errors.Email?.message}
                    </small>
                  </div>
                  <div className="relative w-full mb-3">
                    <input
                      type="password"
                      // name="Password"
                      className="px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
                      placeholder="Password"
                      {...register("Password")}
                    />
                    <small className="text-red-600">
                      {errors.Password?.message}
                    </small>
                  </div>
                  <div className="w-full text-right">
                    <Link
                      to="/auth/forgetpassword"
                      className="text-yellow-600 font-bold"
                    >
                      <small>Forget Password?</small>
                    </Link>
                  </div>
                  <div
                    className={
                      invalidLogin.length > 0
                        ? " text-center text-red-600 border-2 border-red-600 my-8 py-2"
                        : "invisible"
                    }
                  >
                    {invalidLogin}
                  </div>
                  <div className="text-center mt-4">
                    <button
                      className="bg-blue-900 text-white text-sm px-12 py-3 rounded-xl shadow hover:bg-yellow-600 outline-none focus:outline-none mr-1 mb-1 w-auto transition duration-500 ease-in-out"
                      type="submit"
                      name="loginButton"
                    >
                      Log In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="px-3 py-3 flex align-bottom relative mt-20 justify-center lg:w-full">
              <p className="text-blue-900 font-semibold text-sm">
                Copyright © {new Date().getFullYear()} All Rights Reserved.
                Powered By Codistan
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
