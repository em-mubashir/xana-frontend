// import UserService from "../../services/users.service";
import userActions from "./users.action";

export const loadUserAsync = () => (dispatch, getState) => {
  // console.log("state thunk", getState());
  dispatch(userActions.userLoadStart());
};
