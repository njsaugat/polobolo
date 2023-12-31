import Axios from "axios";
import { addNotification } from "../stores/notificationSlice";
import store from "../stores/store";
import { LocalStorage } from "../utils/index";

export const axios = Axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
});

export const refreshAccessToken = () => {
  return axios.post("/users/refresh-token");
};

axios.interceptors.request.use(
  function (config) {
    const accessToken = LocalStorage.get("accessToken");
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      LocalStorage.remove("accessToken");
      const response = await refreshAccessToken();
      const { accessToken } = response.data;
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      LocalStorage.set("accessToken", accessToken);
      return axios(originalRequest);
    }
    const message = error.response?.data?.message || error.message;
    const { dispatch } = store;
    dispatch(
      addNotification({
        type: "error",
        title: "Error",
        message,
      })
    );
    return Promise.reject(error);
  }
);
