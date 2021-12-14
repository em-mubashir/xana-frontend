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
      return {
        ...state,
        user: payLoad,
      };
    case ACTION.ADMIN_LOGOUT:
      return {
        ...state,
        user: payLoad,
      };
    default:
      return state;
  }
};

export default adminReducer;
