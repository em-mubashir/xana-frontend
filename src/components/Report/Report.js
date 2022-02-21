import React, { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
// import { Preview, print } from 'react-html2pdf';
import axios from 'axios';
import QRCode from 'qrcode.react';
import './report.css';
import { BASE_URL } from '../../environment';
import moment from 'moment';

const Report = (props) => {
  console.log(props);
  const [emailStatus, setEmailStatus] = useState();
  const [file, setFile] = useState();

  useEffect(() => {
    // let get_report = localStorage.getItem("custom_report_data");
    // get_report = JSON.parse(get_report);
    // setData(get_report);
  }, []);

  var emailMessage = (content) => {
    setEmailStatus(content);
  };

  const generatePDF = async () => {
    const element = document.getElementById('report');

    const opt = {
      margin: 1,
      filename: 'report.pdf',
      image: { type: 'png', quality: 0.99 },
      html2canvas: { dpi: 192, letterRendering: true, useCORS: true },
      jsPDF: { unit: 'pt', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(element).save();
    setFile(opt);
  };

  const sendReport = async () => {
    try {
      const element = document.getElementById('report');
      const opt = {
        filename: 'report.pdf',
        image: { type: 'png', quality: 0.95 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };
      setFile(opt);

      const generatedPDF = await html2pdf()
        .set(opt)
        .from(element)
        .outputImg()
        .then((res) => {
          const attachment = res['src'];
          var config = {
            method: 'post',
            url: BASE_URL + 'reports/send-custom-report',
            headers: {
              'Content-Type': 'application/json',
            },
            data: { img: attachment, userEmail: props.data.email },
          };
          axios(config)
            .then(function (response) {
              if (response.status == 200) {
                emailMessage('Email Sent Successfully');
              }
            })
            .catch(function (error) {
              console.log(error);
              emailMessage("Couldn't sent email. Please try later");
            });
        });
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <div id="report">
        <div className="top">
          <img
            className="img"
            src={require('assets/img/xana-login.svg').default}
            alt="xana"
          />
          <h2 className="bold" style={{ color: 'darkblue' }}>
            Certificate of Coronavirus <br />
            <span style={{ color: 'darkorange' }}>(SARS-CoV-2)</span> Rapid
            Antigen Testing
          </h2>
        </div>

        <div className="user">
          <img
            className="user-img"
            src={
              props.base64Props
                ? props.base64Props
                : require('assets/img/avatar.png').default
            }
            alt="User-Profile"
          />
          <div className="user-info">
            <p>
              <span className="bold">First name:</span>&nbsp;
              {props.data.first_name}
            </p>
            <p>
              <span className="bold">Surname:</span>&nbsp;
              {props.data.last_name}
            </p>
            <p>
              <span className="bold">Date of Birth:</span> &nbsp;
              {moment(props.data.dob).format('DD-MM-YYYY')}
            </p>
            <p>
              <span className="bold">Passport No:</span> &nbsp;
              {props.data.passport}
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
              <p style={{ marginRight: '20px' }}>
                <span className="bold heading">Email:</span>{' '}
                info@xanameditest.com
              </p>
              <p>
                <span className="bold heading">Website:</span>{' '}
                www.xanameditest.com
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
                <td className="bold headings">Test Type:</td>
                <td className="values">{props.data.test_type}</td>
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
                <td className="bold headings">Test Authorization:</td>
                <td className="values">{props.data.test_authorization}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <tr>
              <td className="report-data-td ">
                <p>
                  <span className="bold">Sample Date:</span>&nbsp;
                  {moment(props.data.sample_date).format('DD-MM-YYYY')}
                </p>
              </td>
              <td class="report-data-td ">
                <p>
                  <span className="bold">Sample Time:</span>&nbsp;
                  {props.data.sample_time}
                </p>
              </td>
            </tr>
            <tr>
              <td class="report-data-td ">
                <p>
                  <span className="bold">Result Date:</span>&nbsp;
                  {moment(props.data.result_date).format('DD-MM-YYYY')}
                </p>
              </td>
              <td class="report-data-td ">
                <p>
                  <span className="bold">Result Time:</span>&nbsp;
                  {props.data.result_time}
                </p>
              </td>
            </tr>
            <tr>
              <td class="report-data-td ">
                <p style={{ marginBottom: '50px' }}>
                  <span className="bold" style={{ paddingRight: '10px' }}>
                    Result:
                  </span>
                  <span className="result-status">{props.data.result}</span>
                </p>
              </td>
              <td class="report-data-td ">
                <p>
                  <span className="bold" style={{ paddingRight: '10px' }}>
                    Uniuqe Test Booking Reference Number:
                  </span>
                  {props.data.order_id}
                </p>
              </td>
            </tr>
          </table>
          {/* <div className="results">
            <p>
              <span className="bold">Sample Date:</span>&nbsp;
              {props.data.sample_date.split('T')[0]}
            </p>
            <p>
              <span className="bold">Sample Time:</span>&nbsp;
              {props.data.sample_time}
            </p>
            <p>
              <span className="bold">Result Date:</span>
              {props.data.result_date.split('T')[0]}
            </p>
            <p>
              <span className="bold">Result Time:</span>
              {props.data.result_time}
            </p>
          </div> */}
          {/* <p>
            <span className="bold" style={{ paddingRight: '10px' }}>
              Booking Reference:
            </span>
            {props.data.order_id}
          </p>
          <p style={{ marginBottom: '50px' }}>
            <span className="bold" style={{ paddingRight: '10px' }}>
              Result:
            </span>
            {props.data.result}
          </p> */}
          <div className="regards" style={{ fontSize: '12px' }}>
            <p style={{ flex: 0.6 }}>
              <img
                src={require('assets/img/signature.svg').default}
                alt="signature"
                className="custom-pdf-footer-logo"
              />
              <span>Mr. Sayed Adeel Babar Shah MPharm</span> <br />
              <span className="bold">Medical &amp; Clinical Advisor</span>
              <br />
              <span className="bold">GPHC number: 2072830 </span> <br />
              <img
                src={require('assets/img/dashboard-logo.svg').default}
                alt="xana"
                className="custom-pdf-footer-logo"
              />
            </p>
            <div className="qr-section">
              <QRCode value={props.reportURL} size={90} className="qr" />
              <table>
                <tr>
                  <td>
                    <span
                      className="fs-28 bold"
                      style={{ paddingRight: '12px' }}
                    >
                      CE
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="black-border pt-0">
                    <span className="fs-28 bold  ">IVD</span>
                  </td>
                </tr>
              </table>
              <p></p>
            </div>
          </div>
        </div>
        <div className="footer">
          <p style={{ fontWeight: '600', fontSize: '14px', color: 'darkblue' }}>
            Xana <span style={{ color: 'darkorange' }}>Meditest</span>{' '}
            <span style={{ color: 'black' }}>is a trading name for Xana</span>{' '}
            <span style={{ color: 'darkorange' }}>Medtec Ltd</span> Reg. No.
            12112703
          </p>
          <p style={{ fontWeight: '600' }}>
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
      <br />
      <p style={{ textAlign: 'center', fontWeight: '600' }}>{emailStatus}</p>
      <br />
      <br />
    </div>
  );
};

export default Report;
