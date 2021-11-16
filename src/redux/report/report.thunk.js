import reportReducer from "./report.action";

export const loadReportAsync = () => (dispatch, getState) => {
  console.log("state thunk", getState());
  dispatch(reportReducer.loadReportAsync());
};
