import authReducer from "./auth.action";

export const loadAuthAsync = () => (dispatch, getState) => {
  console.log("state thunkqweqweqw", getState());
  dispatch(authReducer.authLoadStart());
};

export const getLoginAsync = () => (dispatch, getState) => {
  console.log("state thunk 1234", getState());
  dispatch(authReducer.authLoadStart());
};
