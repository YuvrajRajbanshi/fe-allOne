import axios from "axios";

const rawApiURL = import.meta.env.VITE_API_URL as string | undefined;
const baseURL = (
  typeof rawApiURL === "string" && rawApiURL.trim().length > 0
    ? rawApiURL.trim()
    : "https://be-allone.onrender.com"
).replace(/\/+$/, "");

// Create axios instance with base URL
const api = axios.create({
  baseURL,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - could redirect to login
      console.error("Authentication error - token may be expired");
    }
    return Promise.reject(error);
  }
);

export default api;
