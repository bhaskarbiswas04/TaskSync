import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import DashboardLayout from "../layouts/DashboardLayout";
import { useState, useEffect } from "react";
import { useUI } from "../context/UIContext";
import toast from "react-hot-toast";
import EditTaskModal from "../components/EditTaskModal"; // ✅ NEW

export default function TaskViewPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const { tasks, updateTask, deleteTask } = useTasks();
  const { triggerPageLoading } = useUI();

  const [showEditModal, setShowEditModal] = useState(false); // ✅ NEW

  const task = tasks.find((t) => t._id === taskId);

  // 🔥 loader
  useEffect(() => {
    triggerPageLoading(400);
  }, []);

  // 🔥 find task
  useEffect(() => {
    const found = tasks.find((t) => t._id === taskId);

    // ✅ only update if task not already loaded
    if (!task && found) {
      setTask(found);
    }
  }, [tasks, taskId]);

  if (!task) {
    return (
      <DashboardLayout>
        <p className="text-gray-400 p-6">Task not found</p>
      </DashboardLayout>
    );
  }

  const cleanTags = task.tags?.filter((tag) => tag && tag.trim() !== "") || [];

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmDelete) return;

    try {
      await deleteTask(task._id);
      navigate(-1);
    } catch {
      toast.error("Failed to delete task");
    }
  };

 const handleStatusChange = async (newStatus) => {
   try {
     await updateTask(task._id, {
       status: newStatus,
     });

     toast.success("Task updated");
   } catch {
     toast.error("Failed to update task");
   }
 };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-cyan-400 text-sm cursor-pointer"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold text-white text-center">
            Task: {task.name}
          </h1>

          <div className="flex gap-3">
            {/* EDIT BUTTON */}
            <button
              onClick={() => setShowEditModal(true)}
              className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-sm"
            >
              Edit Task
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
            >
              Delete Task
            </button>
          </div>
        </div>

        {/* DETAILS CARD */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
          <p className="text-gray-300">
            <span className="text-gray-500">Project:</span>{" "}
            {task.project?.name || "N/A"}
          </p>

          <p className="text-gray-300">
            <span className="text-gray-500">Team:</span>{" "}
            {task.team?.name || "N/A"}
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
              {cleanTags.length > 0 ? (
                cleanTags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-blue-600/30 px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-xs italic">
                  No tags available
                </span>
              )}
            </div>
          </div>

          <p className="text-gray-300">
            <span className="text-gray-500">Time:</span>{" "}
            {task.timeToComplete || 0} days
          </p>

          {/* STATUS */}
          <div className="flex items-center justify-between mt-6">
            <div>
              <span className="text-gray-500">Status:</span>{" "}
              <span
                className={` ${task.status === "Completed" ? "bg-green-600" : "bg-cyan-600"} px-2 py-1 rounded text-xs`}
              >
                {task.status}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleStatusChange("To Do")}
                className="bg-gray-700 px-3 py-1 rounded text-sm"
              >
                To Do
              </button>

              <button
                onClick={() => handleStatusChange("In Progress")}
                className="bg-blue-600 px-3 py-1 rounded text-sm"
              >
                In Progress
              </button>

              <button
                onClick={() => handleStatusChange("Completed")}
                className="bg-green-600 px-3 py-1 rounded text-sm"
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      <EditTaskModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        task={task}
      />
    </DashboardLayout>
  );
}