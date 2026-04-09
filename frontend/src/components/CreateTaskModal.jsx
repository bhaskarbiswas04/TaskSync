import { useState, useEffect } from "react";
import Modal from "./Modal";
import API from "../api/axios";
import toast from "react-hot-toast";

export default function CreateTaskModal({
  isOpen,
  onClose,
  onSuccess,
  teams,
  projects,
}) {
  const initialState = {
    name: "",
    project: "",
    team: "",
    owners: [],
    tags: "",
    priority: "",
    timeToComplete: "",
    status: "",
  };

  const [form, setForm] = useState(initialState);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) setForm(initialState);
  }, [isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Multi-select owners
  const handleOwnerChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (o) => o.value);
    setForm({ ...form, owners: selected });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.team || !form.project || form.owners.length === 0) {
      return toast.error("Please fill all required fields");
    }

    try {
      const payload = {
        ...form,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
        timeToComplete: Number(form.timeToComplete) || 0,
      };

      const res = await API.post("/tasks", payload);

      toast.success("Task Created 🚀");

      onSuccess(res.data.task);
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Failed to create task");
    }
  };

  // Filter projects by selected team
  const filteredProjects = projects.filter((p) => p.team?._id === form.team);

  // Get selected team
  const selectedTeam = teams.find((t) => t._id === form.team);

  console.log(form);
  

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold text-white mb-4">Create Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Task Name */}
        <input
          name="name"
          placeholder="Task Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 text-white"
        />

        {/* Team */}
        <div>
          <select
            name="team"
            value={form.team}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white mt-1"
          >
            <option value="">Select Team</option>
            {teams?.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        {/* Project */}
        <div>
          <select
            name="project"
            value={form.project}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white mt-1"
          >
            <option value="">Select Project</option>
            {filteredProjects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Owners */}
        <div>
          <label className="text-sm text-gray-400">Assign Owners</label>
          <select
            multiple
            onChange={handleOwnerChange}
            className="w-full p-2 rounded bg-gray-800 text-white mt-1 h-28"
          >
            {selectedTeam?.members?.map((member) => (
              <option key={member._id} value={member._id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <input
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        {/* Time */}
        <input
          type="number"
          name="timeToComplete"
          placeholder="Time to complete (hours)"
          value={form.timeToComplete}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        {/* Status */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        >
          <option value="">Select Status</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Blocked">Blocked</option>
        </select>

        {/* Priority */}
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        >
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button className="w-full bg-green-600 hover:bg-green-700 p-2 rounded">
          Create Task
        </button>
      </form>
    </Modal>
  );
}