import express from "express";
import { getLastWeekReport, getPendingWorkReport, getClosedTasksReport } from "../controllers/reportController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/last-week").get(isAuthenticated, getLastWeekReport);
router.route("/pending").get(isAuthenticated, getPendingWorkReport);
router.route("/closed-tasks").get(isAuthenticated, getClosedTasksReport);

export default router;
