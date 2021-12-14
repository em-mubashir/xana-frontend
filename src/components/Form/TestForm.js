import React, { useEffect, useState, useCallback } from "react";
import Button from "@mui/material/Button";
import TimePicker from "react-time-picker";
import DatePicker from "react-date-picker";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../../environment";
import Report from "../../components/Report/Report";
import UploadIcon from "@mui/icons-material/Upload";
import ReactS3 from "react-s3";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const scheme = yup
  .object()
  .shape({
    FirstName: yup.string().required("First Name is required."),
    LastName: yup.string().required("Last Name is required."),
    Email: yup.string().email().required("Email is required."),
    PassportNumber: yup.string().required("Passport Number is required."),
    OrderID: yup.string().required("Order ID is required."),
    Selector: yup.string().required("Result is required."),
  })
  .required();

const configS3Bucket = {
  bucketName: "xana-bucket",
  dirName: "customReport" /* optional */,
  region: "us-east-1",
  accessKeyId: "AKIATMEPT72Q4DEPCW5U",
  secretAccessKey: "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",
};

const TestForm = (props) => {
  let history = useHistory();

  const [result, setResult] = useState("Negative");
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
  const [value, onChange] = useState(new Date());
  const [dob, setDob] = useState(new Date());
  const [sampleDate, setSampleDate] = useState(new Date());
  const [sampleTime, setSampleTime] = useState("00:00");
  const [resultDate, setResultDate] = useState(new Date());
  const [resultTime, setResultTime] = useState("00:00");
  const [status, setStatus] = useState(false);
  const [finalReportData, setFinalReportData] = useState();
  const [s3ImgUrl, setS3ImgUrl] = useState();
  const [base64Img, setBase64Img] = useState();

  const [files, setFiles] = useState([]);

  const Previews = (props) => {
    const { getRootProps, getInputProps } = useDropzone({
      accept: "image/*",
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

    const thumbs = files.map((file) => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img alt="image preview" src={file.preview} style={img} />
        </div>
      </div>
    ));

    useEffect(
      () => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach((file) => URL.revokeObjectURL(file.preview));
      },
      [files]
    );

    return (
      <section className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <Button
            type="button"
            variant="contained"
            size="large"
            color="primary"
            style={{ backgroundColor: "#F27405", borderRadius: "10px" }}
          >
            UPLOAD IMAGE
            <UploadIcon />
          </Button>
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </section>
    );
  };
  //

  const imageConvertedToBase64 = async () => {
    const file = files[0];
    const base64 = await toBase64(file);
    await setBase64Img(base64);
  };

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const submitForm = (formData) => {
    if (files[0]) {
      imageConvertedToBase64();

      ReactS3.uploadFile(files[0], configS3Bucket)
        .then((data) => {
          setS3ImgUrl(data.location);
          var dataForm = JSON.stringify({
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
            test_performance:
              "Sensitivity: 97.1% Specificity: 99.5% Accuracy: 98.8%",
            result: result,
            test_image: data.location,
            reportURL: "",
          });
          setFinalReportData(JSON.parse(dataForm));

          var config = {
            method: "post",
            url: BASE_URL + "reports/add-custom-report",
            headers: {
              "Content-Type": "application/json",
            },
            data: dataForm,
          };

          axios(config)
            .then(function (response) {
              setStatus(true);
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch((err) => console.log("s3 err", err));
    } else {
      setS3ImgUrl(null);
      var dataForm = JSON.stringify({
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
        test_performance:
          "Sensitivity: 97.1% Specificity: 99.5% Accuracy: 98.8%",
        result: result,
        test_image: s3ImgUrl,
        reportURL: "",
      });
      setFinalReportData(JSON.parse(dataForm));

      var config = {
        method: "post",
        url: BASE_URL + "reports/add-custom-report",
        headers: {
          "Content-Type": "application/json",
        },
        data: dataForm,
      };

      axios(config)
        .then(function (response) {
          setStatus(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  //  React Drop Zone
  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  };

  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 200,
    height: 200,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  const handleDateChange = (selectedDate) => {
    setDob(selectedDate);
  };
  const handleSampleDate = (selectedDate) => {
    setSampleDate(selectedDate);
  };
  const handleResultDate = (selectedDate) => {
    setResultDate(selectedDate);
  };
  const handleSampleTime = (selectedTime) => {
    setSampleTime(selectedTime);
  };
  const handleResultTime = (selectedTime) => {
    setResultTime(selectedTime);
  };

  return (
    <>
      {status ? (
        <Report data={finalReportData} base64Props={base64Img} />
      ) : (
        <form className="w-auto" onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-wrap justify-center mx-10 mb-5">
            <div className="w-full mb-5 text-center text-yellow-600">
              <h1 className="text-3xl font-bold">Add New Test</h1>
            </div>
            <div className="w-full mb-5 text-center">
              <h1 className="text-2xl">Fill the form below!</h1>
            </div>
            <div className="w-full m-2"></div>

            <div className="flex justify-between w-full">
              <div className="w-6/12 m-2">
                <label>First Name </label>
                <input
                  type="text"
                  name="FirstName"
                  className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 "
                  placeholder="First Name"
                  {...register("FirstName")}
                />
                <small className="text-red-600">
                  {errors.FirstName?.message}
                </small>
              </div>
              <div className="w-6/12 m-2">
                <label>Last Name </label>
                <input
                  type="text"
                  name="LastName"
                  className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 "
                  placeholder="Last Name"
                  {...register("LastName")}
                />
                <small className="text-red-600">
                  {errors.LastName?.message}
                </small>
              </div>
            </div>

            <div className="flex justify-between w-full">
              <div className="w-6/12 m-2">
                <label>Email </label>
                <input
                  type="email"
                  name="Email"
                  className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 "
                  placeholder="Email"
                  {...register("Email")}
                />
                <small className="text-red-600">{errors.Email?.message}</small>
              </div>
              <div className="w-6/12 m-2">
                <label>Passport Number </label>
                <input
                  type="text"
                  name="PassportNumber"
                  className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 "
                  placeholder="---------"
                  {...register("PassportNumber")}
                />
                <small className="text-red-600">
                  {errors.PassportNumber?.message}
                </small>
              </div>
            </div>

            <div className="flex justify-between w-full">
              <div className="w-6/12 m-2">
                <label>Date of birth</label>
                <DatePicker
                  className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 "
                  onChange={handleDateChange}
                  maxDate={new Date()}
                  value={dob}
                  required="true"
                />

                {/* <small className="text-red-600">{errors.DateOfBirth?.message}</small> */}
              </div>
              <div className="w-6/12 m-2">
                <label>Order ID </label>
                <input
                  type="number"
                  name="OrderID"
                  className="mb-3 px-3 py-4 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 "
                  placeholder="Order ID"
                  {...register("OrderID")}
                />
                <small className="text-red-600">
                  {errors.OrderID?.message}
                </small>
              </div>
            </div>

            <div className="flex justify-between w-full">
              <div className="w-6/12 m-2">
                <label>Sample Date </label>
                <DatePicker
                  name="SampleDate"
                  className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 "
                  onChange={handleSampleDate}
                  maxDate={new Date()}
                  value={sampleDate}
                  required="true"
                />
                <small className="text-red-600">
                  {/* {errors.SampleDate?.messatge} */}
                </small>
              </div>
              <div className="w-6/12 m-2">
                <label>Sample Time </label>
                <TimePicker
                  name="SampleTime"
                  className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 "
                  onChange={handleSampleTime}
                  value={sampleTime}
                  required="true"

                  // {...register("SampleTime")}
                />
                <small className="text-red-600">
                  {/* {errors.SampleTime?.message} */}
                </small>
              </div>
            </div>

            <div className="flex justify-between w-full">
              <div className="w-6/12 m-2">
                <label>Result Date </label>
                <DatePicker
                  name="ResultDate"
                  className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 "
                  onChange={handleResultDate}
                  maxDate={new Date()}
                  value={resultDate}
                  required="true"
                />
                <small className="text-red-600">
                  {/* {errors.ResultDate?.message} */}
                </small>
              </div>
              <div className="w-6/12 m-2">
                <label>Result Time </label>
                <TimePicker
                  name="ResultTime"
                  className="mb-3 px-3 py-3 text-blueGray-700 bg-white rounded-2xl text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 "
                  onChange={handleResultTime}
                  value={resultTime}
                  required="true"
                  // {...register("ResultTime")}
                />
                <small className="text-red-600">
                  {/* {errors.ResultTime?.message} */}
                </small>
              </div>
            </div>

            <div className="flex justify-between w-full">
              <div className="w-6/12 m-2">
                <label>Result</label>

                <Select
                  {...register("Selector")}
                  defaultValue="Negative"
                  value={result}
                  onChange={handleSelectChange}
                  className="mb-3 bg-white shadow w-full"
                  style={{ borderRadius: "16px" }}
                >
                  <MenuItem value="Positive">Positive</MenuItem>
                  <MenuItem value="Negative">Negative</MenuItem>
                  <MenuItem value="Invalid">Invalid</MenuItem>
                </Select>

                <small className="text-red-600">
                  {errors.Selector?.message}
                </small>
              </div>
              <div className="w-6/12 m-2">
                <label>Website</label>
                <textarea
                  style={{ resize: "none" }}
                  disabled
                  name="textarea1"
                  className="mb-3 px-4 py-4 h-14 bg-blue-100 rounded-2xl text-sm shadow w-full border-0"
                  placeholder="www.xanameditest.com"
                  // {...register("Email")}
                />
              </div>
            </div>

            {/* disabled textarea */}
            <div className="flex justify-between w-full">
              <div className="w-6/12 m-2">
                <label>Company Name</label>
                <textarea
                  style={{ resize: "none" }}
                  disabled
                  name="textarea1"
                  className="mb-3 px-4 py-4 bg-blue-100 rounded-2xl text-sm shadow w-full border-0"
                  placeholder="Xana Medtec Ltd (UKAS stage 1 application number: 23591)"
                  // {...register("Email")}
                />
              </div>
              <div className="w-6/12 m-2">
                <label>Address</label>
                <textarea
                  style={{ resize: "none" }}
                  disabled
                  name="textarea1"
                  className="mb-3 px-4 py-4 bg-blue-100 rounded-2xl text-sm shadow w-full border-0"
                  placeholder="Universal Square Business Centre, Suite 1.16, Devonshire Street North, Manchester, M12 6JH"
                  // {...register("Email")}
                />
              </div>
            </div>

            <div className="flex justify-between w-full">
              <div className="w-6/12 m-2">
                <label>Tel</label>
                <textarea
                  style={{ resize: "none" }}
                  disabled
                  name="textarea1"
                  className="mb-3 px-4 py-4 h-14 bg-blue-100 rounded-2xl text-sm shadow w-full border-0"
                  placeholder="0161 974 6518"
                  // {...register("Email")}
                />
              </div>
              <div className="w-6/12 m-2">
                <label>Email</label>
                <textarea
                  style={{ resize: "none" }}
                  disabled
                  name="textarea1"
                  className="mb-3 px-4 py-4 h-14 bg-blue-100 rounded-2xl text-sm shadow w-full border-0"
                  placeholder="info@xanameditest.com"
                  // {...register("Email")}
                />
              </div>
            </div>

            <div className="w-full m-2">
              <label>Test Name</label>
              <textarea
                style={{ resize: "none" }}
                disabled
                name="textarea1"
                className="mb-3 px-4 py-4 h-14 bg-blue-100 rounded-2xl text-sm shadow w-full border-0"
                placeholder="Coronavirus Ag Rapid Test Cassette (Swab)"
                // {...register("Email")}
              />
            </div>

            <div className="w-full m-2">
              <label>Test Description</label>
              <textarea
                style={{ resize: "none" }}
                disabled
                name="textarea1"
                className="mb-3 px-4 py-4 bg-blue-100 rounded-2xl text-sm shadow w-full border-0"
                placeholder="Rapid immunichromatiographic assay for the detection of the SARS-COV-2 nucleocapsid protein antigennasopharyngeal swab"
                // {...register("Email")}
              />
            </div>

            <div className="flex justify-between w-full">
              <div className="w-96 m-2">
                <label>Test Performance</label>
                <textarea
                  style={{ resize: "none" }}
                  disabled
                  name="textarea1"
                  className="mb-3 px-4 py-4 h-24 bg-blue-100 rounded-2xl text-sm shadow w-full border-0"
                  placeholder="Sensitivity: 97.1% Specificity: 99.5% Accuracy: 98.8%"
                  // {...register("Email")}
                />
              </div>
              <div className="w-96 m-2">
                <label>Test Authorization</label>
                <textarea
                  style={{ resize: "none", overflow: "hidden" }}
                  disabled
                  name="textarea1"
                  className="mb-3 px-4 py-4 h-24 bg-blue-100 rounded-2xl text-sm shadow w-full border-0"
                  placeholder="CE Marked IVD in accordance with directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory.MHRA registered."
                  // {...register("Email")}
                />
              </div>
            </div>

            <div className="flex justify-between w-full">
              <div className="w-96 m-2">
                <Previews />
              </div>
              <div className="w-96 m-2"></div>
            </div>

            <div className="w-full m-2 flex justify-end mt-5">
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
            </div>
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
