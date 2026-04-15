import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ProjectCard from "../components/dashboard-comps/ProjectCard";
import TaskCard from "../components/dashboard-comps/TaskCard";
import { useProjects } from "../context/ProjectContext";
import { useTasks } from "../context/TaskContext";
import { useTeams } from "../context/TeamContext";
import { useUI } from "../context/UIContext";

import CreateProjectModal from "../components/CreateProjectModal";
import CreateTaskModal from "../components/CreateTaskModal";

export default function DashboardPage() {
  const { projects, setProjects } = useProjects();
  const { tasks, setTasks } = useTasks();
  const { teams } = useTeams();

  const { triggerPageLoading, searchQuery } = useUI();

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const filteredProjects = projects.filter((p) =>
    [p.name, p.team?.name]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  return (
    <DashboardLayout>
      {/* MODALS */}
      <CreateProjectModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        teams={teams}
        onSuccess={(newProject) => {
          triggerPageLoading(); // 🔥 show loader

          setTimeout(() => {
            setProjects((prev) => [newProject, ...prev]);
          }, 200); // small delay for smooth UX
        }}
      />

      <CreateTaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        teams={teams}
        projects={projects}
        onSuccess={(newTask) => {
          triggerPageLoading();

          setTimeout(() => {
            setTasks((prev) => [newTask, ...prev]);
          }, 200);
        }}
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
          {filteredProjects.length === 0 ? (
            <p className="text-gray-400 ml-6">No projects found!</p>
          ) : (
            filteredProjects.map((p) => <ProjectCard key={p._id} project={p} />)
          )}
        </div>
      </div>

      <div className="w-full h-px bg-cyan-500 my-6"></div>

      {/* Tasks */}
      <div>
        <div className="flex justify-between items-center m-6">
          <h2 className="text-2xl font-bold text-white">My Tasks</h2>

          <button
            onClick={() => setShowTaskModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm shadow-md"
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