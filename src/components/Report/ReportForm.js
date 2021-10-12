import { useState } from 'react'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import ReactHtmlParser from 'react-html-parser'
import Report from './Report'
import axios from 'axios'

import 'react-datepicker/dist/react-datepicker.css'

const ReportForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState(new Date())
  const [passportNo, setPassportNo] = useState('')
  const [testName, setTestName] = useState('')
  const [testPerformance, setTestPerformance] = useState()
  const [testManufacturer, setTestManufacturer] = useState('')
  const [testDescription, setTestDescription] = useState('')
  const [testAuthorization, setTestAuthorization] = useState('')
  const [sampleDate, setSampleDate] = useState(new Date())
  const [resultDate, setResultDate] = useState(new Date())
  const [orderId, setOrderId] = useState('')
  const [result, setResult] = useState('Negative')
  const [status, setStatus] = useState(false)

  const resultOptions = [
    { value: 'negative', label: 'Negative' },
    { value: 'positive', label: 'Positive' },
  ]

  const testOptions = [
    {
      value: 'Coronavirus Ag Rapid Test Cassette (Swab)',
      label: 'Coronavirus Ag Rapid Test Cassette (Swab)',
    },
  ]

  const testDetails = [
    {
      test_name: 'Coronavirus Ag Rapid Test Cassette (Swab)',
      testManufacturer: 'Hughes Healthcare- Acon Flowflex',
      testDescription:
        'Rapid immunochromatographic assay for the detection of the SARS-CoV-2 nucleocapsid protein antigen by nasopharyngeal swab.',
      testPerformance: 'Sensitivity: 97.1%\nSpecificity: 99.5%\nAccuracy: 98.8',
      testAuthorization:
        'CE Marked IVD in accordance with Directive 98/79/EC. Passed assessment and validation by Public Health England & Porton Down Laboratory. MHRA registered. ',
    },
  ]

  const dateHandler = (date, setDate) => {
    if (date instanceof Date) {
      setDate(date)
    } else {
      setDate(new Date())
    }
  }

  const handleChange = (option) => {
    setResult(option)
  }

  const handleTestChange = (option) => {
    testDetails.forEach((test) => {
      if (test.test_name === option.value) {
        setTestName(test.test_name)
        setTestDescription(test.testDescription)
        setTestManufacturer(test.testManufacturer)
        setTestPerformance(test.testPerformance)
        setTestAuthorization(test.testAuthorization)
      }
    })
  }

  const getDate = (date) => {
    let dd = String(date.getDate()).padStart(2, '0')
    let mm = String(date.getMonth() + 1).padStart(2, '0') //janvier = 0
    let yyyy = date.getFullYear()

    return dd + '-' + mm + '-' + yyyy
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(
        'http://127.0.0.1:5000/api/reports/user/add-report',
        {
          userId: 3,
          firstName,
          lastName,
          dob: getDate(dob),
          passportNo,
          testName,
          testManufacturer,
          testDescription,
          testPerformance,
          testAuthorization,
          sampleDate: getDate(sampleDate),
          resultDate: getDate(resultDate),
          // sampleTime: getDate(sampleTime),
          // resultTime: getDate(resultTime),
          result,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      console.log(data.success)
      setStatus(data.success)
    } catch (e) {
      setStatus(false)
      console.log(e)
    }
  }

  return (
    <>
      {status ? (
        <Report
          firstName={firstName}
          lastName={lastName}
          dob={getDate(dob)}
          passportNo={passportNo}
          testName={testName}
          testManufacturer={testManufacturer}
          testPerformance={testPerformance}
          testDescription={testDescription}
          testAuthorization={testAuthorization}
          sampleDate={getDate(sampleDate)}
          resultDate={getDate(resultDate)}
          result={result}
          orderId={orderId}
        />
      ) : (
        <div className="container register-form">
          <div className="form">
            <div className="note">
              <p>XANA Medics Covid Vaccination Report.</p>
            </div>
            <form className="form-content" onSubmit={submitHandler}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name *"
                      value={firstName}
                      pattern="^[a-zA-Z\s]+$"
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name *"
                      value={lastName}
                      pattern="^[a-zA-Z\s]+$"
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div
                    className="form-group"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <label>Date_of_Birth: </label>
                    <DatePicker
                      selected={dob}
                      onChange={(date) => dateHandler(date, setDob)}
                      maxDate={new Date()}
                      showYearDropdown
                      scrollableYearDropdown
                      yearDropdownItemNumber={100}
                      dateFormat="dd/MM/yyyy"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Passport No. *"
                      value={passportNo}
                      pattern="^(?!^0+$)[a-zA-Z0-9]{3,20}$"
                      onChange={(e) => setPassportNo(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <Select options={testOptions} onChange={handleTestChange} />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Test Description *"
                      value={testDescription}
                      readOnly
                      onChange={(e) => setTestDescription(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Test Manufacturer *"
                      value={testManufacturer}
                      readOnly
                      onChange={(e) => setTestManufacturer(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Test Performance *"
                      value={ReactHtmlParser(testPerformance)}
                      readOnly
                      onChange={(e) => setTestPerformance(e.target.value)}
                      style={{ resize: 'none', height: '90px' }}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Test Authorisation *"
                      value={testAuthorization}
                      readOnly
                      onChange={(e) => setTestAuthorization(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div
                    className="form-group"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <label>Sample_Date: </label>
                    <DatePicker
                      selected={sampleDate}
                      onChange={(date) => dateHandler(date, setSampleDate)}
                      maxDate={new Date()}
                      required
                    />
                  </div>
                  <div
                    className="form-group"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <label>Result_Date: </label>
                    <DatePicker
                      selected={resultDate}
                      onChange={(date) => dateHandler(date, setResultDate)}
                      maxDate={new Date()}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Order ID *"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Result: </label>
                    <Select
                      options={resultOptions}
                      onChange={handleChange}
                      defaultValue={resultOptions[0]}
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="btnSubmit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default ReportForm
