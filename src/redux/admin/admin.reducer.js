import * as ACTION from "./admin.types";

const initialState = {
  user: null,
};

const adminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION.USER_LOAD_START:
      return {
        ...state,
        user: 1,
      };
    default:
      return state;
  }
};

export default adminReducer;
