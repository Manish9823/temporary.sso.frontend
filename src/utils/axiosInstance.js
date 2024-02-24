import axios from "axios";
import { appConfig } from "./config";

const axiosInstance = axios.create({
    baseURL: appConfig.VITE_SSO_BACKEND
});

axiosInstance.interceptors.response.use(
    response => response,
    error => Promise.reject(error || "Something went wrong"),
);

axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
