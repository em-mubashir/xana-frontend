import { combineReducers } from "redux";
// import all reducers hereby
import adminReducer from "./admin/admin.reducer";
import reportReducer from "./report/report.reducer";
import usersReducer from "./user/users.reducer";
import authReducer from "./auth/auth.reducer";

export default combineReducers({
  adminData: adminReducer,
  reportData: reportReducer,
  userData: usersReducer,
  authData: authReducer,
});
