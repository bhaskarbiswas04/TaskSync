import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ProjectCard from "../components/dashboard-comps/ProjectCard";
import TaskCard from "../components/dashboard-comps/TaskCard";
import { getProjects } from "../api/projectsApi";
import { getTasks } from "../api/tasksApi";
import { getTeams } from "../api/teamApi"; // ✅ ADD THIS
import toast from "react-hot-toast";

import CreateProjectModal from "../components/CreateProjectModal";
import CreateTaskModal from "../components/CreateTaskModal";

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [teams, setTeams] = useState([]); // ✅ teams state
  const [loading, setLoading] = useState(true);

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, tasksData, teamsData] = await Promise.all([
          getProjects(),
          getTasks(),
          getTeams(),
        ]);

        setProjects(projectsData);
        setTasks(tasksData);
        setTeams(teamsData);
      } catch (error) {
        toast.error("Failed to load data");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-white">Loading data...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* 🔥 MODALS OUTSIDE FLEX (IMPORTANT) */}
      <CreateProjectModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        teams={teams}
        onSuccess={(newProject) => setProjects((prev) => [newProject, ...prev])}
      />

      <CreateTaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSuccess={(newTask) => setTasks((prev) => [newTask, ...prev])}
      />

      {/* Projects */}
      <div className="mb-10">
        <div className="flex justify-between items-center m-6">
          <h2 className="text-2xl font-bold text-white">Projects</h2>

          <button
            onClick={() => setShowProjectModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow-md"
          >
            + New Project
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {projects?.map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-cyan-500 my-6"></div>

      {/* Tasks */}
      <div>
        <div className="flex justify-between items-center m-6">
          <h2 className="text-2xl font-bold text-white">My Tasks</h2>

          <button
            onClick={() => setShowTaskModal(true)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm shadow-md"
          >
            + New Task
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {tasks?.map((t) => (
            <TaskCard key={t._id} task={t} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}