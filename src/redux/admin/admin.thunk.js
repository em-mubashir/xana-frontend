import adminReducer from "./admin.action";

export const loadAdminAsync = () => (dispatch, getState) => {
  console.log("state thunk", getState());
  dispatch(adminReducer.loadAdminAsync());
};
