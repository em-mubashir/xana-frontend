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
      console.log("In admin reducer:", payLoad);
      return {
        ...state,
        user: payLoad,
      };
    default:
      return state;
  }
};

export default adminReducer;
