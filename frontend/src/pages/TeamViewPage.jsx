import { useParams } from "react-router-dom";
import { useTeams } from "../context/TeamContext";
import DashboardLayout from "../layouts/DashboardLayout";
import { useState, useEffect } from "react";
import AddMemberModal from "../components/AddMemberModal";
import { useUI } from "../context/UIContext";

import { useProjects } from "../context/ProjectContext";
import ProjectCard from "../components/dashboard-comps/ProjectCard";


export default function TeamViewPage() {
  const { teamId } = useParams();
  const { teams } = useTeams();
  const { projects } = useProjects();
  const { triggerPageLoading } = useUI(); //

  const [showModal, setShowModal] = useState(false);

  // 🔥 Trigger loader on page load
  useEffect(() => {
    triggerPageLoading(400);
  }, []);

  // 🔥 Safe checks
  if (!teams || !projects) return null;

  const team = teams.find((t) => t._id === teamId);

  if (!team) {
    return (
      <DashboardLayout>
        <div className="p-6 text-gray-400">Team not found</div>
      </DashboardLayout>
    );
  }

  const teamProjects = projects.filter((project) => {
    const projectTeamId =
      typeof project.team === "object" ? project.team?._id : project.team;

    return projectTeamId === teamId;
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
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white cursor-pointer"
          >
            + Add Member
          </button>
        </div>

        <div className="w-80 h-px bg-cyan-500 my-6"></div>

        {/* PROJECTS */}
        <div className="mt-10">
          <h2 className="text-xl text-white mb-4">Assigned Projects</h2>

          {teamProjects.length === 0 ? (
            <p className="text-gray-500">No projects assigned to this team</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {teamProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
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