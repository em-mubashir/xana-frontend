import { combineReducers } from "redux";
// import all reducers hereby
import usersReducer from "./user/users.reducer";

export default combineReducers({
  userData: usersReducer,
});
