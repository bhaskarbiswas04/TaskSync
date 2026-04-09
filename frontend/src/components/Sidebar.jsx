import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Projects", path: "/projects" },
    { name: "Teams", path: "/teams" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 hidden md:flex flex-col p-6">
      <h1 className="text-2xl font-bold text-blue-400 mb-10">TaskSync</h1>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-cyan-600 text-white"
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
