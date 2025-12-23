import axiosInstance from "./axiosInstance";

export const getMyProfile = async () => {
  const res = await axiosInstance.get("/profile/me");
  return res.data;
};
