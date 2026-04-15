import DashboardLayout from "../layouts/DashboardLayout";
import { useTeams } from "../context/TeamContext";
import TeamCard from "../components/TeamCard";
import { useState } from "react";
import CreateTeamModal from "../components/CreateTeamModal";
import { useUI } from "../context/UIContext"; // ✅ NEW

export default function TeamsPage() {
  const { teams, setTeams } = useTeams();
  const { searchQuery } = useUI(); // ✅ NEW
  const [showModal, setShowModal] = useState(false);

  // 🔥 FILTER TEAMS
  const filteredTeams = teams.filter((team) =>
    [team.name]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  return (
    <DashboardLayout>
      {/* Modal */}
      <CreateTeamModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={(newTeam) => setTeams((prev) => [newTeam, ...prev])}
      />

      {/* Header */}
      <div className="flex justify-between items-center m-6">
        <h1 className="text-2xl font-bold text-white">Teams</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          + New Team
        </button>
      </div>

      {/* Teams Grid */}
      <div className="grid md:grid-cols-3 gap-5 px-6">
        {filteredTeams.length === 0 ? (
          <p className="text-gray-400 col-span-full text-center">
            No teams found
          </p>
        ) : (
          filteredTeams.map((team) => <TeamCard key={team._id} team={team} />)
        )}
      </div>
    </DashboardLayout>
  );
}