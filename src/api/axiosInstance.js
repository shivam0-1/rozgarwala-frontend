import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
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

    // 🔹 User protected APIs (profile, cart, etc.)
    else {
      const userToken = localStorage.getItem("token"); // or whatever you use
      if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
