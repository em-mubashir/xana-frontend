import * as ACTION from "./auth.types";
import axios from "axios";

const initialState = {
  user: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION.AUTH_LOAD_START:
      return {
        ...state,
        user: 1,
      };
    case ACTION.AUTH_LOGIN:
      //   const config = {
      // method: "post",
      // url: "http://192.168.18.62/api/admin/login",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // data: getFormData,
      //   };

      //   axios(config)
      // .then(function (response) {
      //   console.log(JSON.stringify(response.data));
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
      return {
        ...state,
        userData: 1,
      };
    default:
      return state;
  }
};

export default authReducer;
