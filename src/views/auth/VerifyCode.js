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
    Field1: yup.string().required(),
    Field2: yup.number().required(),
    Field3: yup.number().required(),
    Field4: yup.number().required(),
  })
  .required();

const VerifyCode = () => {
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
    var axios = require("axios");
    var getData =
      watch("Field1") + watch("Field2") + watch("Field3") + watch("Field4");

    console.log("code concatenated", getData);

    var config = {
      method: "get",
      url: BASE_URL + "user/reset-password/" + getData,
      headers: {
        "Content-Type": "application/json",
      },
      data: getData,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        console.log(response.data.success);
        console.log(response.data.data);
        if (response.data.success === true) {
          localStorage.setItem("User_Id_Token", response.data.data);
          history.push("/auth/newpassword");
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

              <div className="flex-auto flex-wrap px-4 lg:px-10 py-10 pt-0">
                <div className="text-black text-center font-bold text-lg">
                  <h1>Verify Code</h1>
                </div>
                <div className="text-blue-900 text-center mb-7 font-semibold text-xs">
                  <p>Enter your 4 digit code below.</p>
                </div>

                <form onSubmit={handleSubmit(submitForm)}>
                  <div className="relative w-1/4 mb-3">
                    <input
                      type="text"
                      name="Field1"
                      className="px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
                      placeholder="0"
                      {...register("Field1")}
                    />
                  </div>

                  <div className="relative w-1/4 mb-3">
                    <input
                      type="text"
                      name="Field2"
                      className="px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
                      placeholder="0"
                      {...register("Field2")}
                    />
                  </div>

                  <div className="relative w-1/4 mb-3">
                    <input
                      type="text"
                      name="Field3"
                      className="px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
                      placeholder="0"
                      {...register("Field3")}
                    />
                  </div>

                  <div className="relative w-1/4 mb-3">
                    <input
                      type="text"
                      name="Field4"
                      className="px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
                      placeholder="0"
                      {...register("Field4")}
                    />
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

export default VerifyCode;
