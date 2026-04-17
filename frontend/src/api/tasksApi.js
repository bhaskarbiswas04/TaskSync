import API_BASE_URL from "./axios";

export const getTasks = async (filters = {}) => {
  const query = new URLSearchParams(filters).toString();

  const res = await API_BASE_URL.get(`/tasks?${query}`);
  return res.data;
};

// CREATE TASK
export const createTask = async (payload) => {
  const res = await API_BASE_URL.post("/tasks", payload);
  return res.data;
};

// UPDATE TASK STATUS
export const updateTaskStatus = async (taskId, status) => {
  const res = await API_BASE_URL.post(`/tasks/${taskId}`, { status });
  return res.data;
};

// (optional future)
export const deleteTask = async (taskId) => {
  const res = await API_BASE_URL.delete(`/tasks/${taskId}`);
  return res.data;
};

