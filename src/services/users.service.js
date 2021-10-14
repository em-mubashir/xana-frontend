import apiClient from "../helpers/apiClient";

class UserService {
  getAllUsers = () => apiClient().get("admin/all-reports");
  verifyEmail = (token) => apiClient().get(`user/confirmation/${token}`);
}
export default new UserService();
