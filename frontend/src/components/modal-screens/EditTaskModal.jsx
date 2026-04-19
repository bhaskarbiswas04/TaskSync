import { useState, useEffect } from "react";
import Modal from "./Modal";
import { useTasks } from "../context/TaskContext";
import toast from "react-hot-toast";

export default function EditTaskModal({ isOpen, onClose, task }) {
  const { updateTask } = useTasks();

  const [form, setForm] = useState({
    name: "",
    timeToComplete: "",
    tags: "",
  });

  useEffect(() => {
    if (task) {
      setForm({
        name: task.name || "",
        timeToComplete: task.timeToComplete || "",
        tags: task.tags?.join(", ") || "",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateTask(task._id, {
        name: form.name,
        timeToComplete: form.timeToComplete,
        tags: form.tags.split(",").map((t) => t.trim()),
      });

      toast.success("Task updated");
      onClose();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-white text-lg mb-4">Edit Task</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Task Name"
          className="w-full p-2 bg-gray-800 text-white rounded"
        />

        <input
          type="number"
          name="timeToComplete"
          value={form.timeToComplete}
          onChange={handleChange}
          placeholder="Time (days)"
          className="w-full p-2 bg-gray-800 text-white rounded"
        />

        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          className="w-full p-2 bg-gray-800 text-white rounded"
        />

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-600 px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button type="submit" className="bg-green-600 px-4 py-2 rounded">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}