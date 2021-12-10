let BASE_URL = "http://192.168.18.62:5000/api/";
let IMAGE_DETECTION_BASE_URL = "http://35.153.58.173:5002/";

if (process.env.REACT_APP_ENV === "production") {
  BASE_URL = "http://192.168.18.62:5000/api/";
}

if (process.env.REACT_APP_ENV === "development") {
  BASE_URL = "http://54.92.203.134/api/";
}

if (process.env.REACT_APP_ENV === "local") {
  BASE_URL = "http://192.168.18.62:5000/api/";
}

export { BASE_URL, IMAGE_DETECTION_BASE_URL };

// let BASE_URL = "http://35.153.58.173:5000/api/";
// let IMAGE_DETECTION_BASE_URL = "http://35.153.58.173:5002/";

// if (process.env.REACT_APP_ENV === "production") {
//   BASE_URL = "http://35.153.58.173:5000/api/";
// }

// if (process.env.REACT_APP_ENV === "development") {
//   BASE_URL = "http://54.92.203.134/api/";
// }

// if (process.env.REACT_APP_ENV === "local") {
//   BASE_URL = "http://35.153.58.173:5000/api/";
// }

// export { BASE_URL, IMAGE_DETECTION_BASE_URL };
