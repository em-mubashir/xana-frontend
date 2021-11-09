import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TestConfirmForm from "./TestConfirmForm";

const TestForm = () => {
  // popover functions
  const [anchorEl, setAnchorE1] = React.useState(null);

  const handleClick = (event) => {
    setAnchorE1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorE1(null);
  };

  const open = Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div className="flex flex-wrap w-auto justify-center align-middle items-center">
        <form className="w-2/4">
          <div className="flex flex-wrap p-7 justify-center">
            <div className="w-96 mt-3 mb-10">
              <h1 className="text-2xl">Fill the form below!</h1>
            </div>
            <div className="w-96  m-2"></div>

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
                aria-describedby={id}
                onClick={handleClick}
                size="large"
                color="primary"
                style={{ backgroundColor: "#293C74", borderRadius: "10px" }}
              >
                Confirm
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "center", horizontal: "center" }}
                transformOrigin={{ vertical: "center", horizontal: "center" }}
              >
                <div>
                  <TestConfirmForm />
                </div>
              </Popover>
            </div>
            <div className="w-96 m-2"></div>
          </div>
        </form>
      </div>
    </>
  );
};

export default TestForm;
