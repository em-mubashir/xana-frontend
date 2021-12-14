import authReducer from "./auth.action";

export const loadAuthAsync = () => (dispatch, getState) => {
  // console.log("state thunk", getState());
  dispatch(authReducer.authLoadStart());
};

export const getLoginAsync = () => (dispatch, getState) => {
  // console.log("state thunk ", getState());
  dispatch(authReducer.authLoadStart());
};
