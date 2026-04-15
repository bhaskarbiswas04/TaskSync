import { useParams } from "react-router-dom";
import { useTeams } from "../context/TeamContext";
import { useTasks } from "../context/TaskContext";
import DashboardLayout from "../layouts/DashboardLayout";
import { useState, useEffect } from "react";
import AddMemberModal from "../components/AddMemberModal";
import { useUI } from "../context/UIContext"; // ✅ NEW

export default function TeamViewPage() {
  const { teamId } = useParams();
  const { teams } = useTeams();
  const { tasks } = useTasks();
  const { triggerPageLoading } = useUI(); // ✅ NEW

  const [showModal, setShowModal] = useState(false);

  // 🔥 Trigger loader on page load
  useEffect(() => {
    triggerPageLoading(400);
  }, []);

  // 🔥 Safe checks
  if (!teams || !tasks) return null;

  const team = teams.find((t) => t._id === teamId);

  if (!team) {
    return (
      <DashboardLayout>
        <div className="p-6 text-gray-400">Team not found</div>
      </DashboardLayout>
    );
  }

  // Filter tasks for team
  const teamTasks = tasks.filter((task) => {
    const taskTeamId =
      typeof task.team === "object" ? task.team?._id : task.team;

    return taskTeamId === teamId;
  });

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-white">{team.name}</h1>

        {/* MEMBERS */}
        <div className="mt-6">
          <h2 className="text-gray-400 mb-2">Members</h2>

          {team.members?.length === 0 ? (
            <p className="text-gray-500">No members yet</p>
          ) : (
            <div className="space-y-2">
              {team.members?.map((m) => (
                <div
                  key={m._id}
                  className="text-white max-w-60 bg-white/5 p-2 rounded"
                >
                  {m.name}
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => setShowModal(true)}
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            + Add Member
          </button>
        </div>

        {/* TASKS */}
        <div className="mt-10">
          <h2 className="text-xl text-white mb-4">Tasks</h2>

          {teamTasks.length === 0 ? (
            <p className="text-gray-500">No tasks assigned to this team</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {teamTasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-white/5 p-4 rounded hover:bg-white/10 transition"
                >
                  <p className="text-white font-semibold">{task.name}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {task.status} • {task.priority}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      <AddMemberModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        teamId={teamId}
      />
    </DashboardLayout>
  );
}