import * as ACTION from "./users.types";

const initialState = {
  user: null,
  errorMessage: null,
};

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION.USER_LOAD_START:
      return {
        ...state,
        user: 1,
      };
    case ACTION.USER_LOAD_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case ACTION.API_ERROR:
      return {
        ...state,
        errorMessage: payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
