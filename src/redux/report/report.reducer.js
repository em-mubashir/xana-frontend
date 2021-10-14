import * as ACTION from "report.types";

const initialState = {
  user: null,
};

const reportReducer = (state = initialState, { type, payload }) => {
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
