import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const TestForm = () => {
  return (
    <>
      <form className="w-full">
        <div className="flex flex-wrap p-7 w-9/12">
          <div className="w-full ml-3 mt-3 mb-10">
            <h1 className="text-2xl">Fill the form below!</h1>
          </div>

          <div className="w-96 m-2">
            <input
              type="text"
              name="FirstName"
              className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
              placeholder="First Name"
              // {...register("Email")}
            />
            {/* <small className="text-red-600">{errors.Email?.message}</small> */}
          </div>
          <div className="w-96 m-2">
            <input
              type="text"
              name="LastName"
              className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
              placeholder="Last Name"
              // {...register("Email")}
            />
            {/* <small className="text-red-600">{errors.Email?.message}</small> */}
          </div>

          <div className="w-96 m-2">
            <input
              type="text"
              name="DateofBirth"
              className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
              placeholder="Date of Birth"
              // {...register("Email")}
            />
            {/* <small className="text-red-600">{errors.Email?.message}</small> */}
          </div>
          <div className="w-96 m-2">
            <input
              type="text"
              name="PassportNumber"
              className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
              placeholder="Passport Number"
              // {...register("Email")}
            />
            {/* <small className="text-red-600">{errors.Email?.message}</small> */}
          </div>

          <div className="w-96 m-2">
            <input
              type="text"
              name="SampleDate"
              className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
              placeholder="Sample Date"
              // {...register("Email")}
            />
            {/* <small className="text-red-600">{errors.Email?.message}</small> */}
          </div>
          <div className="w-96 m-2">
            <input
              type="text"
              name="SampleTime"
              className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
              placeholder="Sample Time"
              // {...register("Email")}
            />
            {/* <small className="text-red-600">{errors.Email?.message}</small> */}
          </div>

          <div className="w-96 m-2">
            <input
              type="text"
              name="ResultDate"
              className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
              placeholder="Result Date"
              // {...register("Email")}
            />
            {/* <small className="text-red-600">{errors.Email?.message}</small> */}
          </div>
          <div className="w-96 m-2">
            <input
              type="text"
              name="ResultTime"
              className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
              placeholder="Result Time"
              // {...register("Email")}
            />
            {/* <small className="text-red-600">{errors.Email?.message}</small> */}
          </div>

          <div className="w-96 m-2">
            <input
              type="text"
              name="OrderID"
              className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
              placeholder="Order ID"
              // {...register("Email")}
            />
            {/* <small className="text-red-600">{errors.Email?.message}</small> */}
          </div>
          <div className="w-96 m-2">
            <input
              type="text"
              name="Result"
              className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
              placeholder="Result"
              // {...register("Email")}
            />
            {/* <small className="text-red-600">{errors.Email?.message}</small> */}
          </div>

          <div className="justify-start w-full m-2">
            <button
              className="bg-blue-900 text-white text-sm px-8 py-3 rounded-xl shadow hover:bg-yellow-600 outline-none focus:outline-none mr-1 mb-1 w-auto transition duration-500 ease-in-out"
              type="submit"
              name="loginButton"
            >
              Confirm
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default TestForm;
