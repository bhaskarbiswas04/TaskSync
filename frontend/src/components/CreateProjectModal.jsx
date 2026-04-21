import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import Modal from "./Modal";
import toast from "react-hot-toast";
import { createProject } from "../api/projectsApi";

import { useProjects } from "../context/ProjectContext";

export default function CreateProjectModal({ isOpen, onClose }) {
  const { setProjects } = useProjects();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createProject(form);

      toast.success("Project Created");

      const newProject = {
        ...data.project,
      };

      // Update global state instantly
      setProjects((prev) => [newProject, ...prev]);

      // Reset form
      setForm({
        name: "",
        description: "",
      });

      onClose();

      // 3. Navigate the user to the projects page
      // Adjust the path "/projects" to match your actual route
      navigate("/projects"); 
      
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create project");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-center font-bold text-cyan-600 text-xl mb-4">
        Create New Project
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Project Name */}
        <div>
          <label className="text-sm text-gray-400">Project Name</label>
          <input
            name="name"
            placeholder="Enter project name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 mt-1 rounded bg-gray-800 text-white"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm text-gray-400">Description</label>
          <input
            name="description"
            placeholder="Enter description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 mt-1 rounded bg-gray-800 text-white"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-32 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold p-2 rounded cursor-pointer transition"
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
}