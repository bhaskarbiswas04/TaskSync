import express from "express";
import {
  updateProfile,
  changePassword,
  updatePreferences,
  deleteAccount,
} from "../controllers/settingController.js";
import isAuthenticated from "../middleware/isAuthenticated.js" 

const router = express.Router();

router.post("/profile", isAuthenticated, updateProfile);
router.post("/password", isAuthenticated, changePassword);
router.post("/preferences", isAuthenticated, updatePreferences);
router.delete("/delete", isAuthenticated, deleteAccount);

export default router;
