import { useNavigate } from "react-router-dom";

export default function TeamCard({ team }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/teams/${team._id}`)}
      className="cursor-pointer bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-xl hover:scale-[1.02] hover:border-cyan-500 transition shadow-lg"
    >
      <h3 className="text-xl font-semibold text-white">{team.name}</h3>
      <p className="text-xs">
        <span className="text-cyan-400">Description:</span>{" "}
        {team.description ? team.description : "N/A"}
      </p>

      {/* Members Preview */}
      <div className="flex mt-3 -space-x-2">
        {team.members?.slice(0, 3).map((m) => (
          <div
            key={m._id}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-600 text-xs text-white border border-gray-900"
          >
            {m.name?.charAt(0)}
          </div>
        ))}

        {team.members?.length > 3 && (
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-xs text-white">
            +{team.members.length - 3}
          </div>
        )}
      </div>
    </div>
  );
}
