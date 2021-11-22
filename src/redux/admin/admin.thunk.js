import adminReducer from "./admin.action";

export const loadAdminAsync = () => (dispatch, getState) => {
  console.log("state thunk", getState());
  dispatch(adminReducer.adminLoadStart());
};
export const getLoginAsync = (adminData) => {
  return (dispatch, getState) => {
    dispatch(adminReducer.adminLogin(adminData));
  };
};
