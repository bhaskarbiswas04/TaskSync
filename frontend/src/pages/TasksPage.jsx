import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import { useUI } from "../context/UIContext";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

export default function Tasks() {
  const { allTasks, fetchAllTasks, allTasksLoading } = useTasks();
  const { searchQuery } = useUI();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "To Do":
        return "bg-blue-500/20 text-blue-400";
      case "In Progress":
        return "bg-yellow-500/20 text-yellow-400";
      case "Completed":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  // FILTER TASKS (SEARCH)
  const filteredTasks = allTasks.filter((task) =>
    [task.name, task.project?.name, task.team?.name, task.status]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">All Tasks</h1>

          <span className="text-sm text-gray-400">
            {filteredTasks.length} tasks
          </span>
        </div>

        {/* LOADING */}
        {allTasksLoading ? (
          <div className="text-gray-400 animate-pulse">Loading tasks...</div>
        ) : filteredTasks.length === 0 ? (
          /* EMPTY STATE */
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">No tasks found</p>
            <p className="text-sm mt-2">
              Try a different search or create a new task.
            </p>
          </div>
        ) : (
          /* GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                // onClick={() => navigate(`/tasks/${task._id}`)}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-cyan-500/30"
              >
                {/* TOP */}
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white leading-snug">
                    {task.name}
                  </h2>

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${getStatusColor(
                      task.status,
                    )}`}
                  >
                    {task.status}
                  </span>
                </div>

                {/* PROJECT + TEAM */}
                <div className="text-sm text-gray-400 space-y-1 mb-4">
                  <p>
                    <span className="text-gray-500">Project:</span>{" "}
                    {task.project?.name || "N/A"}
                  </p>
                  <p>
                    <span className="text-gray-500">Team:</span>{" "}
                    {task.team?.name || "N/A"}
                  </p>
                </div>

                {/* OWNERS */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex -space-x-2">
                    {task.owners?.map((owner) => (
                      <div
                        key={owner._id}
                        className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-xs text-white border border-white/10"
                      >
                        {owner.name?.charAt(0)}
                      </div>
                    ))}
                  </div>

                  <span className="text-xs text-gray-500">
                    {task.owners?.length || 0} member
                    {task.owners?.length > 1 && "s"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
