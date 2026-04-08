import express from "express";
import { signup, login, getLogInUser } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/me").get(isAuthenticated, getLogInUser);

export default router;