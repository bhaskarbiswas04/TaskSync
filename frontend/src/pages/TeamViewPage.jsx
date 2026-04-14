import { useParams } from "react-router-dom";
import { useTeams } from "../context/TeamContext";
import { useTasks } from "../context/TaskContext";
import DashboardLayout from "../layouts/DashboardLayout";
import { useState } from "react";
import AddMemberModal from "../components/AddMemberModal";

export default function TeamViewPage() {
  const { teamId } = useParams();
  const { teams } = useTeams();
  const { tasks } = useTasks();

  const [showModal, setShowModal] = useState(false);

  const team = teams.find((t) => t._id === teamId);

  if (!team) return <p className="text-white">Team not found</p>;

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

        {/* Members */}
        <div className="mt-6">
          <h2 className="text-gray-400 mb-2">Members</h2>

          <div className="space-y-2">
            {team.members?.map((m) => (
              <div key={m._id} className="text-white max-w-50 bg-white/5 p-2 rounded">
                {m.name}
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="mt-4 bg-blue-600 px-4 py-2 rounded"
          >
            + Add Member
          </button>
        </div>

        {/* Tasks */}
        <div className="mt-10">
          <h2 className="text-xl text-white mb-4">Tasks</h2>

          <div className="grid md:grid-cols-3 gap-4">
            {teamTasks.map((task) => (
              <div key={task._id} className="bg-white/5 p-4 rounded">
                {task.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddMemberModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        teamId={teamId}
      />
    </DashboardLayout>
  );
}