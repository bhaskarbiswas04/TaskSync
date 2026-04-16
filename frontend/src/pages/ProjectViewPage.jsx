import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { useProjects } from "../context/ProjectContext";
import { useTasks } from "../context/TaskContext";
import { useState, useEffect } from "react";
import { useUI } from "../context/UIContext";
import { useNavigate } from "react-router-dom";
import CreateTaskModal from "../components/CreateTaskModal";

export default function ProjectViewPage() {

  const [showTaskModal, setShowTaskModal] = useState(false);
  const { projectId } = useParams();
  const { projects } = useProjects();
  const { tasks } = useTasks();
  const { triggerPageLoading } = useUI();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
  });

  // Trigger loader on page load
  useEffect(() => {
    triggerPageLoading(400);
  }, []);

  // Safe project fetch
  const project = projects?.find((p) => p._id === projectId);

  // Prevent crash before data is ready
  if (!projects || !tasks) return null;

  // Filter tasks for this project
  const projectTasks = tasks.filter((task) => {
    const taskProjectId =
      typeof task.project === "object" ? task.project?._id : task.project;

    return taskProjectId && taskProjectId === projectId;
  });

  // Apply filters
  const filteredTasks = projectTasks.filter((task) => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    return true;
  });

  return (
    <DashboardLayout>
      <CreateTaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        projects={projects}
        onSuccess={(newTask) => {
          triggerPageLoading(200);

          setTimeout(() => {
            // 🔥 update tasks instantly
            const updatedTask = {
              ...newTask,
              project: project, // attach current project
            };

            // push to context
            tasks.unshift(updatedTask);
          }, 200);
        }}
      />
      {/* Header */}
      {/* <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          {project?.name || "Loading Project..."}
        </h1>
        <p className="text-gray-400">{project?.description}</p>
      </div> */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {project?.name || "Loading Project..."}
          </h1>
          <p className="text-gray-400">{project?.description}</p>
        </div>

        <button
          onClick={() => setShowTaskModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm shadow-md"
        >
          + New Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <select
          className="bg-gray-800 text-white p-2 rounded"
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option>To Do</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Blocked</option>
        </select>

        <select
          className="bg-gray-800 text-white p-2 rounded"
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        >
          <option value="">All Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <table className="w-full text-left text-gray-300">
          <thead className="bg-gray-800 text-gray-400 text-sm">
            <tr>
              <th className="p-3">Task</th>
              <th className="p-3">Owner</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Due</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredTasks.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No tasks found for this project
                </td>
              </tr>
            ) : (
              filteredTasks.map((task) => (
                <tr
                  key={task._id}
                  onClick={() => navigate(`/tasks/${task._id}`)}
                  className="border-b border-gray-800 hover:bg-gray-800 hover:scale-[1.01] transition cursor-pointer"
                >
                  <td className="p-3">{task.name}</td>

                  <td className="p-3">
                    {task.owners?.map((o) => (
                      <span
                        key={o._id}
                        className="bg-gray-700 px-2 py-1 rounded text-xs mr-1"
                      >
                        {o.name}
                      </span>
                    ))}
                  </td>

                  <td className="p-3">
                    <span className="px-2 py-1 rounded text-xs bg-blue-600">
                      {task.priority}
                    </span>
                  </td>

                  <td className="p-3">
                    {task.timeToComplete ? `${task.timeToComplete} Days` : "-"}
                  </td>

                  <td className="p-3">
                    <span className="px-2 py-1 rounded text-xs bg-green-600">
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}