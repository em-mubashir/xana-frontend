import axios from "axios";
import { BASE_URL } from "../environment";

const apiClient = () => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    responseType: "json",
  });

  return axiosInstance;
};

export default apiClient;
