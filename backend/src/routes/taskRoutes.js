import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { createTask, getTasks, updateTaskById } from "../controllers/taskController.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createTask);
router.route("/").get(isAuthenticated, getTasks);
router.route("/:id").post(isAuthenticated, updateTaskById);

export default router;