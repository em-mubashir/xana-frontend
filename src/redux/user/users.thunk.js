// import UserService from "../../services/users.service";
import useractions from "./users.action";

export const loadUserAsync = () => (dispatch, getState) => {
  // dispatch(ACTION.)
  console.log("state thunk", getState);
  dispatch(useractions.userLoadStart());
  //   UserService.getAllUsers()
  //     .then((response) => dispatch(useractions.userLoadSuccess(response.data)))
  //     .catch((error) => dispatch(useractions.apiError(error)));
};
