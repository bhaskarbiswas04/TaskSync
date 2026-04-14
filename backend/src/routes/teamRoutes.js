import express from "express";
import { createTeam, getTeams, getAllTeams, addMembersToTeam } from "../controllers/teamController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createTeam);
router.route("/").get(isAuthenticated, getTeams);
router.route("/all").get(isAuthenticated, getAllTeams);
router.route("/:teamId/add-member").post(isAuthenticated, addMembersToTeam);

export default router;