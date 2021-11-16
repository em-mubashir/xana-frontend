// import UserService from "../../services/users.service";
import userActions from "./users.action";

export const loadUserAsync = () => (dispatch, getState) => {
  // dispatch(ACTION.)
  // console.log("state thunk", getState);
  console.log("state thunk", getState());
  dispatch(userActions.userLoadStart());

  //   UserService.getAllUsers()
  //     .then((response) => dispatch(useractions.userLoadSuccess(response.data)))
  //     .catch((error) => dispatch(useractions.apiError(error)));
};
