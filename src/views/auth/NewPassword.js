import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const scheme = yup
  .object()
  .shape({
    Email: yup.string().email().required("Please enter the email."),
    Password: yup
      .string()
      .required("Please enter the passowrd.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must contain 8 Letters and atleast 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Character."
      ),
  })
  .required();

const NewPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(scheme),
  });

  const submitForm = (data) => {
    console.log(data);
  };

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
                      name="Email"
                      className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
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
                      name="Password"
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
                      to="/auth/forgetPass"
                      className="text-yellow-600 font-bold"
                    >
                      <small>Forget Password?</small>
                    </Link>
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
