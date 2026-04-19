import express from "express";
import {
  updateProfile,
  changePassword,
  deleteAccount,
} from "../controllers/settingController.js";
import isAuthenticated from "../middleware/isAuthenticated.js" 

const router = express.Router();

router.route("/profile").post(isAuthenticated, updateProfile);
router.route("/password").post(isAuthenticated, changePassword);
router.route("/delete").post(isAuthenticated, deleteAccount);

export default router;
