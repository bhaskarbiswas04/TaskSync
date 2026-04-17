import { createContext, useContext, useState, useEffect } from "react";
import {
  getTasks,
  createTask as createTaskAPI,
  updateTaskStatus,
  deleteTask as deleteTaskAPI,
} from "../api/tasksApi";
import { useAuth } from "./AuthContext";
import { useReports } from "./ReportContext";
import { useProjects } from "./ProjectContext";
import { useTeams } from "./TeamContext";
import toast from "react-hot-toast";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const { projects } = useProjects();
  const { teams } = useTeams();
  
  const reportsContext = useReports();
  const fetchReports = reportsContext?.fetchReports;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastFetched, setLastFetched] = useState(null);

  const fetchTasks = async (force = false) => {
    if (!user?._id) return;

    // CACHE: avoid refetch if fetched recently (10s)
    if (!force && lastFetched && Date.now() - lastFetched < 10000) {
      return;
    }

    try {
      setLoading(true);

      const data = await getTasks({ owner: user._id });

      setTasks(data);
      setLastFetched(Date.now());
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // 🔥 CREATE TASK
  // =========================
  const createTask = async (payload) => {
    try {
      const data = await createTaskAPI(payload);
      

      const rawTask = data.task;

      // 🔥 NORMALIZATION

      const selectedTeam = teams.find(
        (t) => String(t._id) === String(rawTask.team),
      );

      const selectedProject = projects.find(
        (p) => String(p._id) === String(rawTask.project),
      );

      const selectedOwners =
        selectedTeam?.members?.filter((m) =>
          rawTask.owners.map(String).includes(String(m._id)),
        ) || [];

      const newTask = {
        ...rawTask,
        team: selectedTeam || rawTask.team,
        project: selectedProject || rawTask.project,
        owners: selectedOwners,
      };

      // 🔥 UPDATE STATE
      setTasks((prev) => [newTask, ...prev]);

      fetchReports?.();

      return newTask;
    } catch (err) {
      toast.error("Failed to create task");
      throw err;
    }
  };

  // =========================
  // 🔥 UPDATE TASK STATUS
  // =========================
  const updateTask = async (taskId, status) => {
    try {
      const data = await updateTaskStatus(taskId, status);

      const updatedTask = data.task;

      setTasks((prev) => prev.map((t) => (t._id === taskId ? updatedTask : t)));

      fetchReports?.();

      return updatedTask;
    } catch (err) {
      toast.error("Failed to update task");
      throw err;
    }
  };

  // =========================
  // 🔥 DELETE TASK
  // =========================
  const deleteTask = async (taskId) => {
    try {
      await deleteTaskAPI(taskId);

      setTasks((prev) => prev.filter((t) => t._id !== taskId));

      fetchReports?.();
      
      toast.success("Task deleted");
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  // =========================
  // AUTO FETCH
  // =========================
  useEffect(() => {
    if (user?._id) {
      fetchTasks();
    }
  }, [user?._id]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);