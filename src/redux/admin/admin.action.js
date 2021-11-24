import * as ACTION from "./admin.types";

const adminLoadStart = () => ({
  type: ACTION.USER_LOAD_START,
});
const adminLogin = (user) => {
  return {
    type: ACTION.ADMIN_LOGIN,
    payLoad: user,
  };
};

const adminLogout = (user) => {
  return {
    type: ACTION.ADMIN_LOGOUT,
    payLoad: user,
  };
};

export default {
  adminLoadStart,
  adminLogin,
  adminLogout,
};
