import { useAuth } from "../context/AuthContext";

export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <div className="h-16 bg-white/5 backdrop-blur-lg border-b border-white/10 flex items-center justify-between px-6">
      <input
        type="text"
        placeholder="Search..."
        className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg w-1/3 focus:outline-none"
      />

      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-300">{user?.name}</div>

        <button
          onClick={logout}
          className="bg-red-500/80 hover:bg-red-600 px-4 py-1 rounded-lg text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
