import express from "express";
import { signup, login } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/me", isAuthenticated, (req, res) => {
  res.json({
    message: "Access granted.",
    user: req.user,
  });
});

export default router;