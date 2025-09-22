import axios from "axios";

const AxiosConfig = axios.create({
  baseURL: "http://localhost:5234/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default AxiosConfig;
