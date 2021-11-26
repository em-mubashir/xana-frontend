import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { BASE_URL } from "../../environment";

const scheme = yup
  .object()
  .shape({
    NewPassword: yup
      .string()
      .required("Please enter password.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must contain 8 Letters and atleast 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Character."
      ),

    ConfirmPassword: yup
      .string()
      .required("Please enter password.")
      .oneOf([yup.ref("NewPassword"), null], "Passwords must match!"),
  })
  .required();

const NewPassword = () => {
  let history = useHistory();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(scheme),
  });

  const submitForm = (data) => {
    const userId = localStorage.getItem("User_Id_Token");
    console.log("User Id", userId);

    var getData = JSON.stringify({
      id: userId,
      password: watch("NewPassword"),
    });

    var config = {
      method: "put",
      url: BASE_URL + "user/update-password",
      headers: {
        "Content-Type": "application/json",
      },
      data: getData,
    };

    axios(config)
      .then(function (response) {
        console.log("response data", JSON.stringify(response.data));
        console.log(response.data.success);
        if (response.data.success === true) {
          localStorage.removeItem("User_Id_Token");
          history.push("/");
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log("form data", data);
  };

  return (
    <>
      <div className="relative justify-start ml-3 mt-3">
        <button
          className="bg-white rounded-full "
          type="type"
          name="backButton"
        >
          <img
            alt=""
            src={require("../../assets/img/backIcon.svg").default}
          ></img>
        </button>
      </div>
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
                <div className="text-black text-center font-bold text-lg">
                  <h1>Create new password</h1>
                </div>
                <div className="text-blue-900 text-center mb-7 font-semibold text-xs">
                  <p>Enter your new password.</p>
                </div>

                <form onSubmit={handleSubmit(submitForm)}>
                  <div className="relative w-full mb-3">
                    <input
                      type="password"
                      // name="NewPassword"
                      className="px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
                      placeholder="New Password"
                      {...register("NewPassword")}
                    />
                    <small className="text-red-600">
                      {errors.NewPassword?.message}
                    </small>
                  </div>

                  <div className="relative w-full mb-3">
                    <input
                      type="password"
                      // name="ConfirmPassword"
                      className="px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
                      placeholder="Confirm Password"
                      {...register("ConfirmPassword")}
                    />
                    <small className="text-red-600">
                      {errors.ConfirmPassword?.message}
                    </small>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blue-900 text-white text-sm px-12 py-3 rounded-xl shadow hover:bg-yellow-600 outline-none focus:outline-none mr-1 mb-1 w-auto transition duration-500 ease-in-out"
                      type="submit"
                      name="continueButton"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="px-3 py-3 flex align-bottom relative mt-20 justify-center lg:w-full">
              {/* <img
                alt="..."
                className="mr-1"
                src={require("assets/img/copyright.svg").default}
              /> */}
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
};

export default NewPassword;
