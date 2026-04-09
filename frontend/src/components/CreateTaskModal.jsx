import { useState, useEffect } from "react";
import Modal from "./Modal";
import API_BASE_URL from "../api/axios";
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

      const res = await API_BASE_URL.post("/tasks", payload);

      toast.success("Task Created");

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
      <h2 className="text-center font-bold text-green-600 text-xl mb-4">
        Create New Task
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Task Name (full width) */}
        <div className="md:col-span-2">
          <input
            name="name"
            placeholder="Task Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white"
          />
        </div>

        {/* Team */}
        <select
          name="team"
          value={form.team}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-white"
        >
          <option value="">Select Team</option>
          {teams?.map((team) => (
            <option key={team._id} value={team._id}>
              {team.name}
            </option>
          ))}
        </select>

        {/* Project */}
        <select
          name="project"
          value={form.project}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-white"
        >
          <option value="">Select Project</option>
          {filteredProjects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Owners (full width) */}
        {/* <div className="md:col-span-2">
          <label className="text-sm text-gray-400">Assign Owners</label>
          <select
            multiple
            value={form.owners}
            onChange={handleOwnerChange}
            className="w-full p-2 rounded bg-gray-800 text-white mt-1 h-28"
          >
            {selectedTeam?.members?.map((member) => (
              <option key={member._id} value={member._id}>
                {member.name}
              </option>
            ))}
          </select>
        </div> */}

        <div className="space-y-2 max-h-32 overflow-y-auto bg-gray-800 p-2 rounded">
          {selectedTeam?.members?.map((member) => (
            <label
              key={member._id}
              className="flex items-center gap-2 text-white"
            >
              <input
                type="checkbox"
                value={member._id}
                checked={form.owners.includes(member._id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setForm({
                      ...form,
                      owners: [...form.owners, member._id],
                    });
                  } else {
                    setForm({
                      ...form,
                      owners: form.owners.filter((id) => id !== member._id),
                    });
                  }
                }}
              />
              {member.name}
            </label>
          ))}
        </div>

        {/* Tags */}
        <input
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-white"
        />

        {/* Time */}
        <input
          type="number"
          name="timeToComplete"
          placeholder="Time (hours)"
          value={form.timeToComplete}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-white"
        />

        {/* Status */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-white"
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
          className="p-2 rounded bg-gray-800 text-white"
        >
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Button (full width) */}
        <div className="md:col-span-2">
          <button className="w-full bg-green-600 p-2 rounded">
            Create Task
          </button>
        </div>
      </form>
    </Modal>
  );
}