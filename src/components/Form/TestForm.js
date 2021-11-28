import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import TestConfirmForm from "./TestConfirmForm";

const scheme = yup
  .object()
  .shape({
    FirstName: yup.string().required("Field is required."),
    LastName: yup.string().required("Field is required."),
    Email: yup.string().email().required("Field is required."),
    // PassportNumber: yup.string().required("Field is required."),
    PassportNumber: yup.string().required("Field is required"),

    // DateOfBirth: yup.string().required("Field is required."),
    // SampleDate: yup.string().required("Field is required."),
    // SampleTime: yup.string().required("Field is required."),
    // ResultDate: yup.string().required("Field is required."),
    // ResultTime: yup.string().required("Field is required."),
    OrderID: yup.string().required("Field is required."),
    Result: yup.string().required("Field is required."),
  })
  .required();

const TestForm = () => {
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

  const [dob, setDob] = useState();
  const [sampleDate, setSampleDate] = useState(new Date());
  const [sampleTime, setSampleTime] = useState(new Date());
  const [resultDate, setResultDate] = useState(new Date());
  const [resultTime, setResultTime] = useState(new Date());

  const submitForm = (formData) => {
    console.log(formData);
  };

  return (
    <>
      <div className="flex flex-wrap w-auto justify-center align-middle items-center">
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
              <DatePicker
                name="DateOfBirth"
                className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
                onChange={setDob}
                value={dob}
                required="true"
                // {...register("DateOfBirth")}
              />

              <small className="text-red-600">
                {/* {errors.DateOfBirth?.message} */}
              </small>
            </div>
            <div className="w-96 m-2"></div>

            <div className="w-96 m-2">
              <DatePicker
                name="SampleDate"
                className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
                onChange={setSampleDate}
                value={sampleDate}
                // {...register("SampleDate")}
              />
              <small className="text-red-600">
                {/* {errors.SampleDate?.message} */}
              </small>
            </div>
            <div className="w-96 m-2">
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
              <DatePicker
                name="ResultDate"
                className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
                onChange={setResultDate}
                value={resultDate}
                // {...register("ResultDate")}
              />
              <small className="text-red-600">
                {/* {errors.ResultDate?.message} */}
              </small>
            </div>
            <div className="w-96 m-2">
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
              <input
                type="text"
                name="Result"
                className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 border-black border-2"
                placeholder="Result"
                {...register("Result")}
              />
              <small className="text-red-600">{errors.Result?.message}</small>
            </div>

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
                type="button"
                variant="contained"
                name="confirmButton"
                onClick={handleOpen}
                size="large"
                color="primary"
                style={{ backgroundColor: "#293C74", borderRadius: "10px" }}
              >
                Confirm
              </Button>

              <Modal open={open}>
                <div style={modalStyle}>
                  <TestConfirmForm propsHandleClose={handleClose} />
                </div>
              </Modal>
            </div>
            <div className="w-96 m-2"></div>
          </div>
        </form>
      </div>
    </>
  );
};

export default TestForm;
