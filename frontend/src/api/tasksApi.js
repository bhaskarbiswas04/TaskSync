import API from "./axios";

export const getTasks = async () => {
  const res = await API.get("/tasks");
  return res.data;
};
