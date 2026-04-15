import { NavLink } from "react-router-dom";
import { useUI } from "../context/UIContext";

export default function Sidebar() {
  const { triggerPageLoading } = useUI();
  
  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Projects", path: "/projects" },
    { name: "Teams", path: "/teams" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div className="w-65 bg-white/5 backdrop-blur-xl border-r border-white/10 hidden md:flex flex-col p-6">
      <h1 className="text-4xl font-bold text-indigo-400 mb-10">
        TaskS<span className="text-indigo-600">ync</span>
      </h1>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            onClick={triggerPageLoading}
            to={item.path}
            end={item.path === "/projects"}
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