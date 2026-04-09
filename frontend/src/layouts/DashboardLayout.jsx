import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <Topbar />

        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
