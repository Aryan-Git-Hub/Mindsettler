import express from "express";
import { userSignup, login, forgotPassword } from "../controllers/userController.js";
import { protect } from "../middlewares/userMiddleware.js";

const router = express.Router();

// Sample route to get user information
router.post("/signup", userSignup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export default router;
