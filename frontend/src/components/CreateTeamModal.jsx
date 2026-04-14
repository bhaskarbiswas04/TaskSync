import { useState } from "react";
import Modal from "./Modal";
import API from "../api/axios";
import toast from "react-hot-toast";

export default function CreateTeamModal({ isOpen, onClose, onSuccess }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/teams", { name });

      toast.success("Team created");
      onSuccess(res.data.team);
      onClose();
    } catch {
      toast.error("Failed to create team");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold text-white mb-4">Create Team</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          placeholder="Team Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 bg-gray-800 text-white rounded"
        />

        <button className="w-full bg-blue-600 p-2 rounded">Create</button>
      </form>
    </Modal>
  );
}
