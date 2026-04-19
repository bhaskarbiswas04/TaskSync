import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom"; 
import { useUI } from "../context/UIContext";

export default function Topbar() {
  const { user, logout } = useAuth();
  const { searchQuery, setSearchQuery } = useUI();
  const navigate = useNavigate();
  const location = useLocation(); 

  const hiddenSearchPaths = ["/reports", "/settings"];
  const shouldShowSearch = !hiddenSearchPaths.includes(location.pathname);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="h-16 bg-white/5 backdrop-blur-lg border-b border-white/10 flex items-center justify-between px-6">
      <div className="w-1/3">
        {shouldShowSearch ? (
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
        ) : (
          <div className="h-10" />
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-300">{user?.name}</div>

        <button
          onClick={handleLogout}
          className="bg-red-500/80 hover:bg-red-600 px-4 py-1 rounded-lg text-sm cursor-pointer transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}