import { useState } from "react";
import Modal from "./Modal";
import toast from "react-hot-toast";
import { createProject } from "../api/projectsApi";

import { useProjects } from "../context/ProjectContext";
import { useTeams } from "../context/TeamContext";

export default function CreateProjectModal({ isOpen, onClose }) {
  const { setProjects } = useProjects();
  const { teams } = useTeams();

  const [form, setForm] = useState({
    name: "",
    description: "",
    team: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createProject(form);

      toast.success("Project Created");

      // 🔥 FIX: Map team ID → full team object
      const selectedTeam = teams.find(
        (t) => String(t._id) === String(data.project.team),
      );

      const newProject = {
        ...data.project,
        team: selectedTeam || {
          _id: data.project.team,
          name: "Unknown Team",
        },
      };

      // ✅ Update global state instantly
      setProjects((prev) => [newProject, ...prev]);

      // ✅ Reset form
      setForm({
        name: "",
        description: "",
        team: "",
      });

      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create project");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-center font-bold text-cyan-600 text-xl mb-4">
        Create New Project
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Project Name */}
        <input
          name="name"
          placeholder="Project Name"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        {/* Description */}
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        {/* Team Dropdown */}
        <select
          name="team"
          value={form.team}
          required
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        >
          <option value="">Select Team</option>
          {teams?.map((team) => (
            <option key={team._id} value={team._id}>
              {team.name}
            </option>
          ))}
        </select>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-30 bg-blue-600 p-2 rounded cursor-pointer hover:bg-blue-700 transition-colors"
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
}