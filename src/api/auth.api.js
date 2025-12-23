import axiosInstance from "./axiosInstance";

/* CUSTOMER & WORKER REGISTER */
export const registerUser = async (data) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

/* LOGIN */
export const loginUser = async (data) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};
