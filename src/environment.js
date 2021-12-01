let BASE_URL = "http://192.168.18.62/api/";

if (process.env.REACT_APP_ENV === "production") {
  BASE_URL = "http://192.168.18.62/api/";
}

if (process.env.REACT_APP_ENV === "development") {
  BASE_URL = "http://54.92.203.134/api/";
}

if (process.env.REACT_APP_ENV === "local") {
  BASE_URL = "http://192.168.18.62/api/";
}

export { BASE_URL };
