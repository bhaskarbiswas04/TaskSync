import { useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useProjects } from "../context/ProjectContext";
import ProjectCard from "../components/dashboard-comps/ProjectCard";
import { useUI } from "../context/UIContext"; // ✅ NEW

export default function ProjectsPage() {
  const { projects } = useProjects();
  const { triggerPageLoading } = useUI(); // ✅ NEW

  // 🔥 Trigger loader on page load
  useEffect(() => {
    triggerPageLoading(400); // adjust timing if needed
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-white mb-6">Projects</h1>

      <div className="grid md:grid-cols-3 gap-5">
        {projects?.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </DashboardLayout>
  );
}