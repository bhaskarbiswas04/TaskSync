import API_BASE_URL from "./axios";

export const getTasks = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();

  const res = await API_BASE_URL.get(`/tasks?${query}`);
  return res.data;
};

