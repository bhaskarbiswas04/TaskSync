import { useState } from "react";
import Modal from "./Modal";
import API_BASE_URL from "../api/axios";
import toast from "react-hot-toast";

export default function CreateProjectModal({ isOpen, onClose, onSuccess, teams }) {
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
      const res = await API_BASE_URL.post("/projects", form);

      toast.success("Project Created");

      onSuccess(res.data.project); // update UI instantly
      onClose();
    } catch (err) {
      toast.error("Failed to create project");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-center font-bold text-cyan-600 text-xl mb-4">
        Create New Project
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Project Name"
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <select
          name="team"
          value={form.team}
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

        <div className="flex justify-center">
          <button className="w-30 bg-blue-600 p-2 rounded cursor-pointer">Create</button>
        </div>
      </form>
    </Modal>
  );
}