import axiosInstance from "./axiosInstance";

export const setSession = (accessToken) => {
    if (accessToken) {
        sessionStorage.setItem('accessToken', accessToken);
        axiosInstance.defaults.headers.common.Authorization = `${accessToken}`;
    } else {
        sessionStorage.removeItem("accessToken");
        delete axiosInstance.defaults.headers.common.Authorization;
    }
};
