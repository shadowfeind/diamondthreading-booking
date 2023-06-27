import axios from "axios";
import { BASE_URL } from "../constant";

const api = axios.create({
  baseURL: BASE_URL,
});

// Function to retrieve the token from session
const getToken = () =>
  sessionStorage.getItem("tokenDetails")
    ? JSON.parse(sessionStorage.getItem("tokenDetails") || "")
    : {};

// Add an Axios interceptor to include the token in the request headers
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token?.token}`;
  }
  return config;
});

export default api;
