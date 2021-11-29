import React, { useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import axios from "axios";
import QRCode from "qrcode.react";
import "./report.css";

const Report = (props) => {
  const { data, setData } = useState({});
  const { success, setSuccess } = useState();

  useEffect(() => {
    console.log(props);
    // let get_report = localStorage.getItem("custom_report_data");
    // get_report = JSON.parse(get_report);
    // setData(get_report);
  }, []);

  const generatePDF = () => {
    const element = document.getElementById("report");
    const opt = {
      filename: "report.pdf",
      image: { type: "png", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  const sendReport = async () => {
    try {
      await axios.get("/api/reports/send-report");
      setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="btn">
        <button onClick={generatePDF} type="primary">
          Download PDF
        </button>
        <button onClick={sendReport}>Get Report via Email</button>
      </div>
      {success && (
        <p style={{ textAlign: "center" }}>Email sent successfully</p>
      )}
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
          <img className="user-img" src="user.jpg" alt="User" />
          <div className="user-info">
            <p>
              <span className="bold">First name:</span> {props.data.first_name}
            </p>
            <p>
              <span className="bold">Last name:</span> {props.data.last_name}
            </p>
            <p>
              <span className="bold">Date of Birth:</span> {props.data.dob}
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
              {props.data.sampleDate}
            </p>
            <p>
              <span className="bold">Sample Time:</span>
              {props.data.sampleTime}
            </p>
            <p>
              <span className="bold">Result Date:</span>
              {props.data.resultDate}
            </p>
            <p>
              <span className="bold">Result Time:</span>
              {props.data.resultTime}
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
            {props.data.test_result}
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
    </div>
  );
};

export default Report;
