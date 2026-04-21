import { createContext, useContext, useState, useEffect } from "react";
import { getProjects, getAllProjects } from "../api/projectsApi"; // Import new API
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  // Fetch only user-specific projects
  // const fetchProjects = async () => {
  //   if (!user?._id) return;
  //   try {
  //     setLoading(true);
  //     const data = await getProjects();
  //     setProjects(data);
  //   } catch (err) {
  //     toast.error("Failed to load your projects");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // NEW: Fetch all projects across the platform
  const fetchAllProjects = async () => {
    try {
      setLoading(true);
      const data = await getAllProjects();
      setProjects(data);
    } catch (err) {
      toast.error("Failed to load all projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchAllProjects();
    }
  }, [user?._id]);

  return (
    <ProjectContext.Provider
      value={{ 
        projects, 
        setProjects, 
        fetchAllProjects, // Added to Provider
        loading 
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);