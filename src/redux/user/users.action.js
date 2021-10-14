import * as ACTION from "./users.types";

const userLoadStart = () => ({
  type: ACTION.USER_LOAD_START,
});

const apiError = (errorMessage) => ({
  type: ACTION.API_ERROR,
  payload: errorMessage,
});

const userLoadSuccess = (data) => ({
  type: ACTION.USER_LOAD_SUCCESS,
  payload: data,
});

export default {
  userLoadStart,
  apiError,
  userLoadSuccess,
};
