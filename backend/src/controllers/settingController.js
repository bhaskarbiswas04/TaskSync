import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.json({ user });
  } catch {
    res.status(500).json({ message: "Error updating profile" });
  }
};

// CHANGE PASSWORD
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated" });
  } catch {
    res.status(500).json({ message: "Error changing password" });
  }
};

// DELETE ACCOUNT
export const deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.json({ message: "Account deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting account" });
  }
};
