import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useProjects } from "../context/ProjectContext";
import { useTeams } from "../context/TeamContext";
import ProjectCard from "../components/dashboard-comps/ProjectCard";
import { useUI } from "../context/UIContext";
import CreateProjectModal from "../components/CreateProjectModal";

export default function ProjectsPage() {
  const { projects, setProjects } = useProjects();
  const { teams } = useTeams();
  const { triggerPageLoading, searchQuery } = useUI();

  const [showModal, setShowModal] = useState(false);

  // 🔥 Loader
  useEffect(() => {
    triggerPageLoading(400);
  }, []);

  // 🔥 Filter projects
  const filteredProjects = projects.filter((p) =>
    [p.name, p.team?.name]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  return (
    <DashboardLayout>
      {/* MODAL */}
      <CreateProjectModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        teams={teams}
        onSuccess={(newProject) => {
          triggerPageLoading();

          setTimeout(() => {
            setProjects((prev) => [newProject, ...prev]);
          }, 200);
        }}
      />

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Projects</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-cyan-500 hover:bg-cyan-600 text-black px-5 py-2 rounded-lg font-semibold shadow-md cursor-pointer transition"
        >
          + New Project
        </button>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-5">
        {filteredProjects.length === 0 ? (
          <p className="text-gray-400 col-span-full">No projects found!</p>
        ) : (
          filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))
        )}
      </div>
    </DashboardLayout>
  );
}