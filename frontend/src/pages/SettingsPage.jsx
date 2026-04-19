import DashboardLayout from "../layouts/DashboardLayout";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile, changePassword, deleteAccount } from "../api/UserApi";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { user, updateUser, logout } = useAuth();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    defaultPriority: "Medium",
    defaultStatus: "To Do",
    theme: "dark",
  });

  // PREFILL USER DATA
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        defaultPriority: user.preferences?.defaultPriority || "Medium",
        defaultStatus: user.preferences?.defaultStatus || "To Do",
        theme: user.preferences?.theme || "dark",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // HANDLERS
  const handleProfile = async () => {
    try {
      await updateProfile({ name: form.name, email: form.email });
      updateUser({ name: form.name, email: form.email });
      toast.success("Profile updated");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handlePassword = async () => {
    try {
      await changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });
      toast.success("Password changed");
    } catch (err) {
      toast.error("Password change failed");
    }
  };

  // NOTE: handleDelete is gone because the logic is now inside the Modal's "Yes" button.

  return (
    <DashboardLayout>
      <div className="p-6 max-w-5xl mx-auto space-y-10 text-white">
        <h1 className="text-3xl font-bold">Settings</h1>

        {/* PROFILE SECTION */}
        <div className="bg-white/5 p-5 rounded-xl space-y-4">
          <h2 className="text-lg font-semibold">Profile</h2>
          <div>
            <label className="text-sm text-gray-400">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 mt-1 rounded bg-gray-800"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 mt-1 rounded bg-gray-800"
            />
          </div>
          <button
            onClick={handleProfile}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded cursor-pointer transition"
          >
            Save Profile
          </button>
        </div>

        {/* PASSWORD SECTION */}
        <div className="bg-white/5 p-5 rounded-xl space-y-4">
          <h2 className="font-semibold">Change Password</h2>
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800"
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800"
          />
          <button
            onClick={handlePassword}
            className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded cursor-pointer"
          >
            Update Password
          </button>
        </div>

        {/* DANGER ZONE SECTION */}
        <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-xl space-y-3">
          <div className="flex flex-col gap-1">
            <h2 className="text-red-400 font-semibold">Danger Zone</h2>
            <p className="text-sm text-gray-400">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
          </div>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-medium cursor-pointer transition-colors"
          >
            Delete Account
          </button>
        </div>

        {/* CUSTOM DELETE MODAL */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setIsDeleteModalOpen(false)}
            />
            <div className="relative bg-[#1a1a1a] border border-gray-800 p-8 rounded-2xl max-w-md w-full shadow-2xl">
              <div className="flex flex-col items-center text-center space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Are you absolutely sure?
                  </h3>
                  <p className="text-gray-400 mt-2">
                    This action{" "}
                    <span className="text-red-400 font-semibold">
                      cannot be undo
                    </span>
                    . Your account and data will be permanently removed.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full mt-6">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="flex-1 px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium transition"
                  >
                    No, Keep it
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        await deleteAccount();
                        toast.success("Account successfully deleted");
                        setIsDeleteModalOpen(false);
                        logout(); // Clears auth and redirects
                      } catch (err) {
                        toast.error("Something went wrong");
                      }
                    }}
                    className="flex-1 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}