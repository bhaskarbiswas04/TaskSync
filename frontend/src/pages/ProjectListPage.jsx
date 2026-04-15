import { useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useProjects } from "../context/ProjectContext";
import ProjectCard from "../components/dashboard-comps/ProjectCard";
import { useUI } from "../context/UIContext";

export default function ProjectsPage() {
  const { projects } = useProjects();
  const { triggerPageLoading, searchQuery } = useUI(); // ✅ include searchQuery

  // 🔥 Trigger loader
  useEffect(() => {
    triggerPageLoading(400);
  }, []);

  // 🔥 FILTER PROJECTS
  const filteredProjects = projects.filter((p) =>
    [p.name, p.team?.name]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-white mb-6">Projects</h1>

      <div className="grid md:grid-cols-3 gap-5">
        {filteredProjects.length === 0 ? (
          <p className="text-gray-400 col-span-full">
            No projects found!
          </p>
        ) : (
          filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))
        )}
      </div>
    </DashboardLayout>
  );
}