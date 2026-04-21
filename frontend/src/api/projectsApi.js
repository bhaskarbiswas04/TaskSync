import API_BASE_URL from "./axios";

export const getProjects = async () => {
  const res = await API_BASE_URL.get("/projects");
  return res.data;
};

export const createProject = async (projectData) => {
  try {
    const response = await API_BASE_URL.post("/projects", projectData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllProjects = async () => {
  const res = await API_BASE_URL.get("/projects/all");
  return res.data;
};