import mongoose from "mongoose";
// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // User's name
  email: { type: String, required: true, unique: true }, // Email must be unique
  password: { type: String, required: true }, // Email must be unique

  preferences: {
    defaultPriority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    defaultStatus: {
      type: String,
      enum: ["To Do", "In Progress", "Completed"],
      default: "To Do",
    },
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "dark",
    },
  },
});

export const User = mongoose.model("User", userSchema);