import React, { useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import { Preview, print } from 'react-html2pdf';
import axios from "axios";
import QRCode from "qrcode.react";
import "./report.css";
import { BASE_URL } from "../../environment";
// AWS S3 Bucket
// const S3_BUCKET = "xana-bucket";
// const REGION = "us-east-1";

// AWS.config.update({
//   accessKeyId: "AKIATMEPT72Q4DEPCW5U",
//   secretAccessKey: "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",
// });

// const myBucket = new AWS.S3({
//   params: { Bucket: S3_BUCKET },
//   region: REGION,
// });

// const uploadFile = (file) => {
//   const params = {
//     ACL: "public-read",
//     Body: file,
//     Bucket: S3_BUCKET,
//     Key: file.name,
//   };

//   myBucket
//     .putObject(params)
//     .on("httpUploadProgress", (evt) => {
//       setProgress(Math.round((evt.loaded / evt.total) * 100));
//     })
//     .send((err) => {
//     });
// };
//

const Report = (props) => {
  const { data, setData } = useState({});
  const { success, setSuccess } = useState();
  const [file, setFile] = useState();

  useEffect(() => {
    // let get_report = localStorage.getItem("custom_report_data");
    // get_report = JSON.parse(get_report);
    // setData(get_report);
  }, []);

  const generatePDF = async () => {
    const element = document.getElementById("report");

    const opt = {
      filename: "report.pdf",
      image: { type: "png", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    setFile(opt);

    html2pdf().set(opt).from(element).save();
  };

  const sendReport = async () => {
    try {


      const element = document.getElementById("report");
      const opt = {
        filename: "report.pdf",
        image: { type: "png", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      setFile(opt);

      const generatedPDF = await html2pdf().set(opt).from(element).outputImg().then((res) => {
        const attachment = res["src"];
        var config = {
          method: "post",
          url: BASE_URL + "reports/send-custom-report",
          headers: {
            "Content-Type": "application/json",
          },
          data: { img: attachment },
        };
        axios(config)
          .then(function (response) {
            setSuccess(true);
          })
          .catch(function (error) {
          })

      })


    }
    catch (err) {
      console.log(err.message)
    }
  };

  return (
    <div>
      <div id="report">
        <div className="top">
          <img
            className="img"
            src={require("assets/img/xana-login.svg").default}
            alt="xana"
          />
          <h2 className="bold" style={{ color: "darkblue" }}>
            Certificate of Coronavirus <br />
            <span style={{ color: "darkorange" }}>(SARS-CoV-2)</span> Rapid
            Antigen Testing
          </h2>
        </div>

        <div className="user">
          <img
            className="user-img"
            src={require("assets/img/pdf-profile-avatar.jpg").default}
            alt="User"
          />
          <div className="user-info">
            <p>
              <span className="bold">First name:</span> {props.data.first_name}
            </p>
            <p>
              <span className="bold">Last name:</span> {props.data.last_name}
            </p>
            <p>
              <span className="bold">Date of Birth:</span>
              {props.data.dob.split("T")[0]}
            </p>
            <p>
              <span className="bold">Passport No:</span> {props.data.passport}
            </p>
          </div>
        </div>

        <div className="company">
          <div className="company_info">
            <div>
              <p className="bold heading">Company Name:</p>
              <p className="bold heading">Address: </p>
            </div>
            <div>
              <p> Xana Medtec Ltd (UKAS stage 1 application number: 23591)</p>
              <p>
                Universal Square Business Centre, Suite 1.16, Devonshire Street
                North, Manchester, M12 6JH
              </p>
            </div>
            <div className="company_contact">
              <p>
                <span className="bold heading">Tel:</span> 0161 974 6518
              </p>
              <p style={{ marginRight: "20px" }}>
                <span className="bold heading">Email:</span> info@xanamedtec.com
              </p>
              <p>
                <span className="bold heading">Website:</span>{" "}
                www.xanamedtec.com
              </p>
            </div>
          </div>
        </div>

        <div className="report-desc">
          <table>
            <tbody>
              <tr>
                <td className="bold headings">Test Name:</td>
                <td className="values">{props.data.test_name}</td>
              </tr>
              <tr>
                <td className="bold headings">Test Manufacturer:</td>
                <td className="values">{props.data.test_manufacturer}</td>
              </tr>
              <tr>
                <td className="bold headings">Test Description:</td>
                <td className="values">{props.data.test_description}</td>
              </tr>
              <tr>
                <td className="bold headings">Test Performance:</td>
                <td className="values">{props.data.test_performance} </td>
              </tr>
              <tr>
                <td className="bold headings">Test Authorisation:</td>
                <td className="values">{props.data.test_authorization}</td>
              </tr>
            </tbody>
          </table>

          <div className="results">
            <p>
              <span className="bold">Sample Date:</span>
              {props.data.sample_date.split("T")[0]}
            </p>
            <p>
              <span className="bold">Sample Time:</span>
              {props.data.sample_time.split("T")[1].split(".")[0]}
            </p>
            <p>
              <span className="bold">Result Date:</span>
              {props.data.result_date.split("T")[0]}
            </p>
            <p>
              <span className="bold">Result Time:</span>
              {props.data.result_time.split("T")[1].split(".")[0]}
            </p>
          </div>
          <p>
            <span className="bold" style={{ paddingRight: "10px" }}>
              Order Id:
            </span>
            {props.data.order_id}
          </p>
          <p style={{ marginBottom: "50px" }}>
            <span className="bold" style={{ paddingRight: "10px" }}>
              Result:
            </span>
            {props.data.result}
          </p>
          <div className="regards" style={{ fontSize: "12px" }}>
            <p style={{ flex: 0.6 }}>
              <span>Mr. Sayed Adeel Babar Shah MPharm</span> <br />
              <span className="bold">Medical &amp; Clinical Advisor</span>
              <br />
              <span className="bold">GPHC number: 2072830 </span> <br />
              <img
                src={require("assets/img/dashboard-logo.svg").default}
                alt="xana"
                className="custom-pdf-footer-logo"
              />
            </p>
            <div className="qr-section">
              <QRCode value="Xana Medtec" size={90} className="qr" />
              <p>
                <span className="fs-28 bold" style={{ paddingRight: "12px" }}>
                  CE
                </span>
                <br />
                <span className="fs-28 bold black-border">IVD</span>
              </p>
            </div>
          </div>
        </div>
        <div className="footer">
          <p style={{ fontWeight: "600", fontSize: "14px", color: "darkblue" }}>
            Xana <span style={{ color: "darkorange" }}>Meditest</span>{" "}
            <span style={{ color: "black" }}>is a trading name for Xana</span>{" "}
            <span style={{ color: "darkorange" }}>Medtec Ltd</span> Reg. No.
            12112703
          </p>
          <p style={{ fontWeight: "600" }}>
            Universal Square Business Center, Suite 1.16, Devonshire Street
            North, Manchester, M12 6JH
          </p>
        </div>
      </div>
      <br />
      <br />
      <div className="btn">
        <button className="custom-btn" onClick={generatePDF} type="primary">
          Download PDF
        </button>
        <button className="custom-btn" onClick={sendReport}>
          Get Report via Email
        </button>
      </div>
      {success && (
        <p style={{ textAlign: "center" }}>Email sent successfully</p>
      )}
      <br />
      <br />
    </div>
  );
};

export default Report;
