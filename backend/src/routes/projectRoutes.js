import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { createProject, getAllProjects, getProjects } from "../controllers/projectController.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createProject)
router.route("/").get(isAuthenticated, getProjects);
router.route("/all").get(isAuthenticated, getAllProjects);

export default router;