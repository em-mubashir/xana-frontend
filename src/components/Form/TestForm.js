import React, { useState, useCallback } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TimePicker from "react-time-picker";
import DatePicker from "react-date-picker";

import { useDropzone } from "react-dropzone";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Link, Redirect, useHistory } from "react-router-dom";
import { BASE_URL } from "../../environment";
import Report from "../../components/Report/Report";

import TestConfirmForm from "./TestConfirmForm";

const scheme = yup
  .object()
  .shape({
    FirstName: yup.string().required("Field is required."),
    LastName: yup.string().required("Field is required."),
    Email: yup.string().email().required("Field is required."),
    PassportNumber: yup.string().required("Field is required."),
    OrderID: yup.string().required("Field is required."),
    Selector: yup.string().required("Field is required."),
  })
  .required();

const TestForm = () => {
  let history = useHistory();

  const [result, setResult] = useState();
  const handleSelectChange = (event) => {
    setResult(event.target.value);
  };
  // react-hook-form and yup
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(scheme),
  });
  //
  console.log(handleSubmit);

  // Mui Modal functions
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "white",
    boxShadow: 24,
    backgroundColor: "white",
    borderRadius: "10px",
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //

  const [value, onChange] = useState(new Date());

  const [dob, setDob] = useState(new Date());
  const [sampleDate, setSampleDate] = useState(new Date());
  const [sampleTime, setSampleTime] = useState(new Date());
  const [resultDate, setResultDate] = useState(new Date());
  const [resultTime, setResultTime] = useState(new Date());

  const [status, setStatus] = useState(false);

  console.log("status of pdf and form", status);

  const [finalReportData, setFinalReportData] = useState();

  const submitForm = (formData) => {
    console.log(formData);
    console.log("sample date:", sampleDate);
    console.log("sample time:", sampleTime);
    console.log("result date:", resultDate);
    console.log("result time:", resultTime);

    var data = JSON.stringify({
      first_name: formData.FirstName,
      last_name: formData.LastName,
      email: formData.Email,
      dob: dob,
      passport: formData.PassportNumber,
      sample_date: sampleDate,
      sample_time: sampleTime,
      result_date: resultDate,
      result_time: resultTime,
      order_id: formData.OrderID,
      test_name: "Coronavirus Ag Rapid Test Cassette (Swab)",
      test_manufacturer: "Xana",
      test_authorization:
        "CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered",
      test_description:
        "Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigennasopharyngeal swab",
      address: "Hughes Healthcare-Acon Flowflex",
      test_performance: "Sensitivity: 97.1% Specificity: 99.5% Accuracy: 98.8%",
      test_result: result,
    });
    console.log(data);
    setFinalReportData(JSON.parse(data));

    var config = {
      method: "post",
      url: BASE_URL + "reports/add-custom-report",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setStatus(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //  React Drop Zone
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      {status ? (
        <Report data={finalReportData} />
      ) : (
        <form className="w-auto" onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-wrap justify-center">
            <div className="w-full mb-5 text-center text-yellow-600">
              <h1 className="text-3xl font-bold">Add New Test</h1>
            </div>
            <div className="w-full mb-5 text-center">
              <h1 className="text-2xl">Fill the form below!</h1>
            </div>
            <div className="w-full  m-2"></div>

            <div className="w-96 m-2">
              <label>First Name </label>
              <input
                type="text"
                name="FirstName"
                className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
                placeholder="First Name"
                {...register("FirstName")}
              />
              <small className="text-red-600">
                {errors.FirstName?.message}
              </small>
            </div>
            <div className="w-96 m-2">
              <label>Last Name </label>
              <input
                type="text"
                name="LastName"
                className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
                placeholder="Last Name"
                {...register("LastName")}
              />
              <small className="text-red-600">{errors.LastName?.message}</small>
            </div>

            <div className="w-96 m-2">
              <label>Email </label>
              <input
                type="email"
                name="Email"
                className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
                placeholder="Email"
                {...register("Email")}
              />
              <small className="text-red-600">{errors.Email?.message}</small>
            </div>
            <div className="w-96 m-2">
              <label>Passport Number </label>
              <input
                type="text"
                name="PassportNumber"
                className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
                placeholder="-----/-------/-"
                {...register("PassportNumber")}
              />
              <small className="text-red-600">
                {errors.PassportNumber?.message}
              </small>
            </div>

            <div className="w-96 m-2">
              <label>Date of birth</label>
              <DatePicker
                className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
                onChange={setDob}
                value={dob}
              />

              {/* <small className="text-red-600">{errors.DateOfBirth?.message}</small> */}
            </div>
            <div className="w-96 m-2"></div>

            <div className="w-96 m-2">
              <label>Sample Date </label>
              <DatePicker
                name="SampleDate"
                className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
                onChange={setSampleDate}
                value={sampleDate}
              />
              <small className="text-red-600">
                {/* {errors.SampleDate?.messatge} */}
              </small>
            </div>
            <div className="w-96 m-2">
              <label>Sample Time </label>
              <TimePicker
                name="SampleTime"
                className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
                onChange={setSampleTime}
                value={sampleTime}
                // {...register("SampleTime")}
              />
              <small className="text-red-600">
                {/* {errors.SampleTime?.message} */}
              </small>
            </div>

            <div className="w-96 m-2">
              <label>Result Date </label>
              <DatePicker
                name="ResultDate"
                className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
                onChange={setResultDate}
                value={resultDate}
              />
              <small className="text-red-600">
                {/* {errors.ResultDate?.message} */}
              </small>
            </div>
            <div className="w-96 m-2">
              <label>Result Time </label>
              <TimePicker
                name="ResultTime"
                className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
                onChange={setResultTime}
                value={resultTime}
                // {...register("ResultTime")}
              />
              <small className="text-red-600">
                {/* {errors.ResultTime?.message} */}
              </small>
            </div>

            <div className="w-96 m-2">
              <label>Order ID </label>
              <input
                type="text"
                name="OrderID"
                className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
                placeholder="Order ID"
                {...register("OrderID")}
              />
              <small className="text-red-600">{errors.OrderID?.message}</small>
            </div>
            <div className="w-96 m-2">
              <label>Result</label>
              <select
                {...register("Selector")}
                value={result}
                onChange={handleSelectChange}
                className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl
                text-sm shadow focus:outline-none focus:ring w-full ease-linear
                transition-all duration-150 border-black border-2"
              >
                <option value="Positive">Positive</option>
                <option value="Negative">Negative</option>
                <option value="Invalid">Invalid</option>
              </select>
              <small className="text-red-600">{errors.Selector?.message}</small>
            </div>

            <div className="w-96 m-2">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag 'n' drop some files here, or click to select files</p>
                )}
              </div>
            </div>
            <div className="w-96 m-2"></div>

            {/* disabled textarea */}
            <div className="w-96 m-2">
              <textarea
                style={{ resize: "none" }}
                disabled
                name="textarea1"
                className="mb-3 px-4 py-4 bg-blue-100 rounded-2xl text-sm shadow w-full border-0"
                placeholder="Xana Medtec Ltd (UKAS stage 1 application number: 23591)"
                // {...register("Email")}
              />
              {/* <small className="text-red-600">{errors.Email?.message}</small> */}
            </div>
            <div className="w-96 m-2">
              <textarea
                style={{ resize: "none" }}
                disabled
                name="textarea1"
                className="mb-3 px-4 py-4 bg-blue-100 rounded-2xl text-sm shadow w-full border-0"
                placeholder="Universal Square Business Centre, Suite 1.16, Devonshire Street North, Manchester, M12 6JH"
                // {...register("Email")}
              />
              {/* <small className="text-red-600">{errors.Email?.message}</small> */}
            </div>

            <div className="w-96 m-2">
              <textarea
                style={{ resize: "none" }}
                disabled
                name="textarea1"
                className="mb-3 px-4 py-4 h-14 bg-blue-100 rounded-2xl text-sm shadow w-full border-0"
                placeholder="0161 974 6518"
                // {...register("Email")}
              />
              {/* <small className="text-red-600">{errors.Email?.message}</small> */}
            </div>
            <div className="w-96 m-2">
              <textarea
                style={{ resize: "none" }}
                disabled
                name="textarea1"
                className="mb-3 px-4 py-4 h-14 bg-blue-100 rounded-2xl text-sm shadow w-full border-0"
                placeholder="info@xanameditest.com"
                // {...register("Email")}
              />
              {/* <small className="text-red-600">{errors.Email?.message}</small> */}
            </div>

            <div className="w-96 m-2">
              <textarea
                style={{ resize: "none" }}
                disabled
                name="textarea1"
                className="mb-3 px-4 py-4 h-14 bg-blue-100 rounded-2xl text-sm shadow w-full border-0"
                placeholder="www.xanameditest.com"
                // {...register("Email")}
              />
              {/* <small className="text-red-600">{errors.Email?.message}</small> */}
            </div>
            <div className="w-96 m-2"></div>

            <div className="w-11/12 m-2">
              <textarea
                style={{ resize: "none" }}
                disabled
                name="textarea1"
                className="mb-3 px-4 py-4 h-14 bg-blue-100 rounded-2xl text-sm shadow w-full border-0"
                placeholder="Coronavirus Ag Rapid Test Cassette (Swab)"
                // {...register("Email")}
              />
              {/* <small className="text-red-600">{errors.Email?.message}</small> */}
            </div>

            <div className="w-11/12 m-2">
              <textarea
                style={{ resize: "none" }}
                disabled
                name="textarea1"
                className="mb-3 px-4 py-4 h-14 bg-blue-100 rounded-2xl text-sm shadow w-full border-0"
                placeholder="Hughes Healthcare-Acon Flowflex"
                // {...register("Email")}
              />
              {/* <small className="text-red-600">{errors.Email?.message}</small> */}
            </div>

            <div className="w-11/12 m-2">
              <textarea
                style={{ resize: "none" }}
                disabled
                name="textarea1"
                className="mb-3 px-4 py-4 bg-blue-100 rounded-2xl text-sm shadow w-full border-0"
                placeholder="Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigennasopharyngeal swab"
                // {...register("Email")}
              />
              {/* <small className="text-red-600">{errors.Email?.message}</small> */}
            </div>

            <div className="w-96 m-2">
              <textarea
                style={{ resize: "none" }}
                disabled
                name="textarea1"
                className="mb-3 px-4 py-4 h-24 bg-blue-100 rounded-2xl text-sm shadow w-full border-0"
                placeholder="Sensitivity: 97.1% Specificity: 99.5% Accuracy: 98.8%"
                // {...register("Email")}
              />
              {/* <small className="text-red-600">{errors.Email?.message}</small> */}
            </div>
            <div className="w-96 m-2">
              <textarea
                style={{ resize: "none", overflow: "hidden" }}
                disabled
                name="textarea1"
                className="mb-3 px-4 py-4 h-24 bg-blue-100 rounded-2xl text-sm shadow w-full border-0"
                placeholder="CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered."
                // {...register("Email")}
              />
              {/* <small className="text-red-600">{errors.Email?.message}</small> */}
            </div>

            <div className="w-96 m-2">
              <Button
                type="submit"
                variant="contained"
                name="confirmButton"
                // onClick={handleOpen}
                size="large"
                color="primary"
                style={{ backgroundColor: "#293C74", borderRadius: "10px" }}
              >
                Confirm
              </Button>

              {/* <Modal open={open}>
                <div style={modalStyle}>
                  <TestConfirmForm propsHandleClose={handleClose} />
                </div>
              </Modal> */}
            </div>
            <div className="w-96 m-2"></div>
          </div>
        </form>
      )}
      {/* <div className="flex flex-wrap w-auto justify-center align-middle items-center">
        <form className="w-auto" onSubmit={handleSubmit(submitForm)}>
          <button
            className="bg-blue-900 text-white text-sm px-12 py-3 rounded-xl shadow hover:bg-yellow-600 outline-none focus:outline-none mr-1 mb-1 w-auto transition duration-500 ease-in-out"
            type="submit"
            name="loginButton"
          >
            Log In
          </button>
        </form>
      </div> */}
    </>
  );
};

export default TestForm;
