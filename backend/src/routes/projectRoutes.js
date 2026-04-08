import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { createProject, getProjects } from "../controllers/projectController.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createProject)
router.route("/").get(isAuthenticated, getProjects);

export default router;