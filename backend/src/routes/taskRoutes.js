import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { createTask, getTasks, updateTaskById, deleteTask } from "../controllers/taskController.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createTask);
router.route("/").get(isAuthenticated, getTasks);
router.route("/:id").post(isAuthenticated, updateTaskById);
router.route("/:id").delete(isAuthenticated, deleteTask);

export default router;