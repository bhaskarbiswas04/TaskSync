import { useState, useEffect } from "react";
import Modal from "./Modal";
import toast from "react-hot-toast";

import { useProjects } from "../context/ProjectContext";
import { useTeams } from "../context/TeamContext";
import { useTasks } from "../context/TaskContext";

export default function CreateTaskModal({ isOpen, onClose, onSuccess }) {
  // 1. Pull fetchAllProjects from context
  const { projects, fetchAllProjects } = useProjects();
  const { teams } = useTeams();
  const { createTask } = useTasks();

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

  // 2. Update useEffect to call fetchAllProjects
  useEffect(() => {
    if (isOpen) {
      setForm(initialState);
      fetchAllProjects(); // Now fetches every project in the DB
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "team") {
      setForm({
        ...form,
        team: value,
        project: "", 
        owners: [], 
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleOwnerChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (o) => o.value);
    setForm({ ...form, owners: selected });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.team || !form.project || form.owners.length === 0) {
      return toast.error("Please fill all required fields");
    }

    try {
      const payload = {
        ...form,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
        timeToComplete: Number(form.timeToComplete) || 0,
      };

      const newTask = await createTask(payload); 

      toast.success("Task Created");
      onSuccess(newTask); 
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Failed to create task");
    }
  };

  const selectedTeam = teams.find((t) => t._id === form.team);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-center font-bold text-green-600 text-xl mb-4">
        Create New Task
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <input
            name="name"
            placeholder="Task Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white"
          />
        </div>

        {/* Team Dropdown */}
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

        {/* Project Dropdown - Now populated from fetchAllProjects */}
        <select
  name="project"
  value={form.project}
  onChange={handleChange}
  className="p-2 rounded bg-gray-800 text-white"
>
  <option value="">Select Project</option>
  {/* Map directly over 'projects' to show everything from the DB */}
  {projects.map((p) => (
    <option key={p._id} value={p._id}>
      {p.name}
    </option>
  ))}
</select>

        {/* ... Rest of your form (Owners, Tags, Status, etc) */}
        <div className="md:col-span-2">
          <label className="text-sm text-gray-400">Assign Owners</label>
          {!form.team && (
            <p className="text-xs text-yellow-400 mt-1">
              ⚠ Select a team first to choose owners
            </p>
          )}
          <select
            multiple
            value={form.owners}
            onChange={handleOwnerChange}
            disabled={!form.team}
            className={`w-full p-2 rounded mt-1 h-28 ${
              !form.team ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-gray-800 text-white"
            }`}
          >
            {selectedTeam?.members?.map((member) => (
              <option key={member._id} value={member._id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <input
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-white"
        />

        <input
          type="number"
          name="timeToComplete"
          placeholder="Time (Days)"
          value={form.timeToComplete}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 text-white"
        />

        <select name="status" value={form.status} onChange={handleChange} className="p-2 rounded bg-gray-800 text-white">
          <option value="">Select Status</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Blocked">Blocked</option>
        </select>

        <select name="priority" value={form.priority} onChange={handleChange} className="p-2 rounded bg-gray-800 text-white">
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <div className="md:col-span-2 flex justify-center">
          <button className="w-30 bg-green-600 p-2 rounded cursor-pointer hover:bg-green-700">
            Create Task
          </button>
        </div>
      </form>
    </Modal>
  );
}