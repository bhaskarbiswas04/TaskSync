import { useNavigate } from "react-router-dom";

export default function ProjectCard({ project }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/projects/${project._id}`)}
      className="cursor-pointer bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-xl hover:scale-[1.02] hover:border-cyan-500 transition shadow-lg"
    >
      <h3 className="text-lg font-semibold mt-2 text-white">{project.name}</h3>

      <p className="text-sm text-gray-400 mt-1">{project.description}</p>

      {/* 🔥 SAFE TEAM DISPLAY */}
      <p className="text-sm text-cyan-400 mt-1">
        Team -{" "}
        {typeof project.team === "object" ? project.team?.name : "Loading..."}
      </p>
    </div>
  );
}
