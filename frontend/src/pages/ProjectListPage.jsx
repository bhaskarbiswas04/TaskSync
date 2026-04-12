import DashboardLayout from "../layouts/DashboardLayout";
import { useProjects } from "../context/ProjectContext";
import { useNavigate } from "react-router-dom";

export default function ProjectsPage() {
  const { projects } = useProjects();
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-white mb-6">Projects</h1>

      <div className="grid md:grid-cols-3 gap-5">
        {projects.map((project) => (
          <div
            key={project._id}
            onClick={() => navigate(`/projects/${project._id}`)}
            className="cursor-pointer bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-xl hover:scale-105 transition"
          >
            <h2 className="text-lg font-semibold text-white">{project.name}</h2>
            <p className="text-gray-400 text-sm mt-1">{project.description}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
