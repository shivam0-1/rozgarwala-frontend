import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // 🔹 Admin APIs
    if (config.url?.startsWith("/admin")) {
      const adminToken = localStorage.getItem("adminToken");
      if (adminToken) {
        config.headers.Authorization = `Bearer ${adminToken}`;
      }
    } 
    // 🔹 User APIs
    else {
      const userToken = localStorage.getItem("token");
      if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
