import DashboardLayout from "../layouts/DashboardLayout";
import { useProjects } from "../context/ProjectContext";
import ProjectCard from "../components/dashboard-comps/ProjectCard";
import SkeletonCard from "../components/loading-state/SkeletonCard";

export default function ProjectsPage() {
  const { projects } = useProjects();

  const isLoading = !projects;

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-white mb-6">Projects</h1>

      <div className="grid md:grid-cols-3 gap-5">
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, i) => <SkeletonCard key={i} />)
          : projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
      </div>
    </DashboardLayout>
  );
}