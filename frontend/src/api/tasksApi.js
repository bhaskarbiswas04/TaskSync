import API_BASE_URL from "./axios";

export const getTasks = async () => {
  const res = await API_BASE_URL.get("/tasks");
  return res.data;
};
