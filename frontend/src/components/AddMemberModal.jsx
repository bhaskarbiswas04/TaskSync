import { useEffect, useState } from "react";
import Modal from "./Modal";
import toast from "react-hot-toast";
import { getAllUsers } from "../api/UserApi";
import { useTeams } from "../context/TeamContext";

export default function AddMemberModal({ isOpen, onClose, teamId }) {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const { addMembers } = useTeams();

  console.log("USERS from addMemberModal:", users);

  useEffect(() => {
    if (isOpen) fetchUsers();
  }, [isOpen]);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch {
      toast.error("Failed to load users");
    }
  };

  const toggleUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id],
    );
  };

  const handleSubmit = async () => {
    if (selectedUsers.length === 0) {
      return toast.error("Select users");
    }

    await addMembers(teamId, selectedUsers);

    toast.success("Members added");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-white text-lg mb-4">Add Members</h2>

      <div className="max-h-60 overflow-y-auto space-y-2">
        {users.map((u) => (
          <div
            key={u._id}
            onClick={() => toggleUser(u._id)}
            className={`p-2 rounded cursor-pointer ${
              selectedUsers.includes(u._id)
                ? "bg-cyan-600 text-white"
                : "bg-gray-800 text-gray-300"
            }`}
          >
            {u.name}
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 mt-4 p-2 rounded"
      >
        Add Members
      </button>
    </Modal>
  );
}