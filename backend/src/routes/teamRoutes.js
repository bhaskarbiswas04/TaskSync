import express from "express";
import { createTeam, getTeams } from "../controllers/teamController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createTeam);
router.route("/").get(isAuthenticated, getTeams);

export default router;