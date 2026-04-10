import { createContext, useContext, useState, useEffect } from "react";
import { getTasks } from "../api/tasksApi";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const { user } = useAuth();

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    if (!user?._id) return;

    try {
      const data = await getTasks({ owner: user._id });
      setTasks(data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch tasks");
    }
  };

  console.log("USER:", user);
  console.log("FETCHING TASKS FOR:", user?._id);

  useEffect(() => {
    if (user?._id) {
      fetchTasks();
    }
  }, [user]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
