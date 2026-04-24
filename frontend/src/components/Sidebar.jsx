import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useUI } from "../context/UIContext";

export default function Sidebar() {
  const { triggerPageLoading } = useUI();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Projects", path: "/projects" },
    { name: "Tasks", path: "/tasks" },
    { name: "Teams", path: "/teams" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" },
  ];

  const handleNavigation = (e, path) => {
    e.preventDefault();

    if (location.pathname === path) return;

    triggerPageLoading();

    setTimeout(() => {
      navigate(path); 
    }, 250); 
  };

  return (
    <div className="w-65 bg-white/5 backdrop-blur-xl border-r border-white/10 hidden md:flex flex-col p-6">
      <h1 className="text-4xl font-bold text-indigo-400 mb-10">
        TaskS<span className="text-indigo-600">ync</span>
      </h1>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/projects"}
            onClick={(e) => handleNavigation(e, item.path)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-linear-to-r from-blue-500 to-blue-800 text-white shadow-md"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}