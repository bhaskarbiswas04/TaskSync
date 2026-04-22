import { useState, useEffect, useMemo } from "react"; // Added useMemo for performance
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
  const { projects, fetchAllProjects } = useProjects(); 
  const { tasks } = useTasks();
  const { teams } = useTeams();

  const { triggerPageLoading, searchQuery } = useUI(); 

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false); 

  useEffect(() => {
    fetchAllProjects();
  }, []);

  // We use useMemo so the filter only runs when 'projects' or 'searchQuery' changes
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const searchContent = `${p.name} ${p.description || ""} ${p.team?.name || ""}`.toLowerCase();
      return searchContent.includes(searchQuery.toLowerCase());
    });
  }, [projects, searchQuery]);

  return (
    <DashboardLayout>
      {/* MODALS */}
      <CreateProjectModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        teams={teams}
        onSuccess={() => {
          triggerPageLoading();
          fetchAllProjects();
        }}
      />

      <CreateTaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        teams={teams}
        projects={projects}
        onSuccess={() => {
          triggerPageLoading();
        }}
      />

      {/* Projects Section */}
      <div className="mb-10">
        <div className="flex justify-between items-center m-6">
          <h2 className="text-2xl font-bold text-white">All Projects</h2>

          <button
            onClick={() => setShowProjectModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow-md transition-colors"
          >
            + New Project
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {/* 3. Use filteredProjects here instead of raw projects */}
          {filteredProjects.length === 0 ? (
            <p className="text-gray-400 ml-6">
              {searchQuery ? `No projects match "${searchQuery}"` : "No projects found."}
            </p>
          ) : (
            filteredProjects.map((p) => <ProjectCard key={p._id} project={p} />)
          )}
        </div>
      </div>

      <div className="w-full h-px bg-cyan-500 my-6 opacity-30"></div>

      {/* Tasks Section */}
      <div>
        <div className="flex justify-between items-center m-6">
          <h2 className="text-2xl font-bold text-white">My Tasks</h2>

          <button
            onClick={() => setShowTaskModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm shadow-md transition-colors"
          >
            + New Task
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {tasks?.length === 0 ? (
            <p className="text-gray-400 ml-6">No tasks assigned to you.</p>
          ) : (
            tasks?.map((t) => (
              <TaskCard key={t._id} task={t} />
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}