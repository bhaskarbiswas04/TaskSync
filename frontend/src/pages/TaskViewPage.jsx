import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import DashboardLayout from "../layouts/DashboardLayout";
import { useState, useEffect } from "react";
import { useUI } from "../context/UIContext";
import { useProjects } from "../context/ProjectContext";
import { useTeams } from "../context/TeamContext";
import API_BASE_URL from "../api/axios";
import toast from "react-hot-toast";

export default function TaskViewPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { projects } = useProjects();
  const { teams } = useTeams();

  const { tasks, setTasks } = useTasks();
  const { triggerPageLoading } = useUI();

  const [task, setTask] = useState(null);

  // 🔥 loader
  useEffect(() => {
    triggerPageLoading(400);
  }, []);

  // 🔥 find task
  useEffect(() => {
    const found = tasks.find((t) => t._id === taskId);
    setTask(found);
  }, [tasks, taskId]);

  if (!task) {
    return (
      <DashboardLayout>
        <p className="text-gray-400 p-6">Task not found</p>
      </DashboardLayout>
    );
  }

  // 🔥 UPDATE STATUS
  const handleStatusChange = async (newStatus) => {
    try {
      const res = await API_BASE_URL.post(`/tasks/${task._id}`, {
        status: newStatus,
      });

      const rawTask = res.data.task;

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

      const updatedTask = {
        ...rawTask,
        team: selectedTeam || rawTask.team,
        project: selectedProject || rawTask.project,
        owners: selectedOwners,
      };

      // 🔥 UPDATE GLOBAL STATE
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? updatedTask : t)),
      );

      setTask(updatedTask);

      toast.success("Task updated");
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-cyan-400 text-sm mb-2 cursor-pointer"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold text-white text-center">Task: {task.name}</h1>
        </div>

        {/* DETAILS CARD */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
          <p className="text-gray-300">
            <span className="text-gray-500">Project:</span> {task.project?.name}
          </p>

          <p className="text-gray-300">
            <span className="text-gray-500">Team:</span> {task.team?.name}
          </p>

          <div>
            <span className="text-gray-500">Owners:</span>
            <div className="flex gap-2 mt-1 flex-wrap">
              {task.owners?.map((o) => (
                <span
                  key={o._id}
                  className="bg-gray-700 px-2 py-1 rounded text-xs"
                >
                  {o.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-gray-500">Tags:</span>
            <div className="flex gap-2 mt-1 flex-wrap">
              {task.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-600/30 px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <p className="text-gray-300">
            <span className="text-gray-500">Time:</span> {task.timeToComplete}{" "}
            days
          </p>

          {/* STATUS */}
          <div className="flex items-center justify-between mt-6">
            <div>
              <span className="text-gray-500">Status:</span>{" "}
              <span className={` ${task.status === "Completed" ? "bg-green-600" : "bg-cyan-600"} px-2 py-1 rounded text-xs`}>
                {task.status}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">
                <p className="text-gray-400">Update :</p>
              <button
                onClick={() => handleStatusChange("To Do")}
                className="bg-gray-700 px-3 py-1 rounded text-sm cursor-pointer"
              >
                To Do
              </button>

              <button
                onClick={() => handleStatusChange("In Progress")}
                className="bg-blue-600 px-3 py-1 rounded text-sm cursor-pointer"
              >
                In Progress
              </button>

              <button
                onClick={() => handleStatusChange("Completed")}
                className="bg-green-600 px-3 py-1 rounded text-sm cursor-pointer"
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}