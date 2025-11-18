import axios from "axios";
import { getToken, clearToken } from "./auth.js";

const AxiosConfig = axios.create({
  baseURL: "http://localhost:5234/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

AxiosConfig.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

AxiosConfig.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      clearToken();
    }
    return Promise.reject(err);
  }
);

export default AxiosConfig;
