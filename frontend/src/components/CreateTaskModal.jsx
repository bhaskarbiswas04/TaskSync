import { useState } from "react";
import Modal from "./Modal";
import API_BASE_URL from "../api/axios";
import toast from "react-hot-toast";

export default function CreateTaskModal({ isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    project: "",
    team: "",
    owners: "",
    status: "In Progress",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        owners: form.owners.split(","),
      };

      const res = await API_BASE_URL.post("/tasks", payload);

      toast.success("Task Created");

      onSuccess(res.data.task); // instant UI update
      onClose();
    } catch (err) {
      toast.error("Failed to create task");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-white text-xl mb-4">Create Task</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Task Name"
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <input
          name="project"
          placeholder="Project ID"
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <input
          name="team"
          placeholder="Team ID"
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <input
          name="owners"
          placeholder="Owner IDs (comma separated)"
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <button className="w-full bg-green-600 p-2 rounded">Create Task</button>
      </form>
    </Modal>
  );
}