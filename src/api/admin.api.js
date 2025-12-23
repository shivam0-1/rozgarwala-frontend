import axios from "./axiosInstance";

export const adminLogin = async ({ email, password }) => {
  return axios
    .post("/admin/auth/login", { email, password })
    .then((res) => res.data);
};

export const getContacts = async () => {
  const token = localStorage.getItem("adminToken");

  return axios
    .get("/admin/contacts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};
