export default function ProjectCard({ project }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-xl hover:scale-[1.02] transition shadow-lg">
      {/* <span
        className={`text-xs px-2 py-1 rounded ${
          project.status === "Completed"
            ? "bg-green-500/20 text-green-400"
            : "bg-yellow-500/20 text-yellow-400"
        }`}
      >
        {project.status}
      </span> */}

      <h3 className="text-lg font-semibold mt-2">{project.name}</h3>

      <p className="text-sm text-gray-400 mt-1">{project.description}</p>
    </div>
  );
}
