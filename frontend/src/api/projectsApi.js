import API_BASE_URL from "./axios";

export const getProjects = async () => {
  const res = await API_BASE_URL.get("/projects");
  return res.data;
};

export const createProject = async ()=>{
  try {
    const response = await API_BASE_URL.post("")
  } catch (error) {
    
  }
}