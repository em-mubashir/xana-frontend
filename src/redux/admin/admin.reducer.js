import * as ACTION from "./admin.types";

const initialState = {
  user: null,
};

const adminReducer = (state = initialState, { type, payLoad }) => {
  switch (type) {
    case ACTION.USER_LOAD_START:
      return {
        ...state,
        user: 1,
      };
    case ACTION.ADMIN_LOGIN:
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
      //   console.log(JSON.stringify(response.data))
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
      console.log("In admin reducer:", payLoad);
      return {
        ...state,
        user: 1,
      };
    default:
      return state;
  }
};

export default adminReducer;
