import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ProjectCard from "../components/ProjectCard";
import TaskCard from "../components/TaskCard";
import { getProjects } from "../api/projectsApi";
import { getTasks } from "../api/tasksApi";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, tasksData] = await Promise.all([
          getProjects(),
          getTasks(),
        ]);

        setProjects(projectsData);
        setTasks(tasksData);
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
        {/* Projects */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Projects</h2>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow-md">
              + New Project
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {projects.map((p) => (
              <ProjectCard key={p._id} project={p} />
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">My Tasks</h2>

            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm shadow-md">
              + New Task
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {tasks.map((t) => (
              <TaskCard key={t._id} task={t} />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
}
