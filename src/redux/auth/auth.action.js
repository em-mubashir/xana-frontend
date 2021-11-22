import * as ACTION from "./auth.types";

const authLoadStart = () => ({
  type: ACTION.AUTH_LOAD_START,
});

const adminLogin = () => ({
  type: ACTION.AUTH_LOGIN,
});
export default {
  authLoadStart,
  adminLogin,
};
