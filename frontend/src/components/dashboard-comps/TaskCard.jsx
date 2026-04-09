export default function TaskCard({ task }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-xl hover:scale-[1.02] transition shadow-lg">
      <span
        className={`text-xs px-2 py-1 rounded ${
          task.status === "Completed"
            ? "bg-green-500/20 text-green-400"
            : "bg-blue-500/20 text-blue-400"
        }`}
      >
        {task.status}
      </span>

      <h3 className="text-md font-semibold mt-2">{task.name}</h3>

      <p className="text-sm text-gray-400 mt-1">{`Due: ${task.timeToComplete} Days`}</p>
    </div>
  );
}
