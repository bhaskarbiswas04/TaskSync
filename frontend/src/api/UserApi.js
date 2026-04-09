import API_BASE_URL from "./axios";

export const getAllUsers = async () => {
  const res = await API_BASE_URL.get("/auth/all");
  return res.data;
};
