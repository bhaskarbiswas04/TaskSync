import { useState } from "react";
import Modal from "./Modal";
import API_BASE_URL from "../api/axios";
import toast from "react-hot-toast";

export default function AddMemberModal({ isOpen, onClose, teamId }) {
  const [email, setEmail] = useState("");

  const handleAdd = async () => {
    try {
      await API_BASE_URL.post(`/teams/${teamId}/add-member`, { email });

      toast.success("Member added");
      onClose();
    } catch {
      toast.error("Failed to add member");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-white text-lg mb-4">Add Member</h2>

      <input
        placeholder="User Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 bg-gray-800 text-white rounded"
      />

      <button
        onClick={handleAdd}
        className="w-full bg-blue-600 mt-3 p-2 rounded"
      >
        Add
      </button>
    </Modal>
  );
}
