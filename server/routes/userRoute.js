import express from "express";
import { body } from "express-validator";
import { userSignup, login, forgotPassword, getMe, logout, sendContactEmail, profileUpdate, sendCorporateEmail } from "../controllers/userController.js";
import { protect } from "../middlewares/userMiddleware.js";
import { validate } from "../middlewares/validationMiddleware.js";

const router = express.Router();

// --- VALIDATED ROUTES ---

router.post(
  "/signup",
  [
    body("name")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters"),
    body("email").isEmail().withMessage("Please provide a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  validate,
  userSignup
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").notEmpty().withMessage("Password cannot be empty"),
  ],
  validate,
  login
);

router.post(
  "/forgot-password",
  [body("email").isEmail().withMessage("Please enter a valid email to reset password")],
  validate,
  forgotPassword
);

router.get("/logout", protect, logout);

router.get("/me", protect, getMe);
router.post("/contact/send", sendContactEmail);
router.post("/corporate/send", sendCorporateEmail);
router.patch("/profile", protect,
  [
    body("name")
      .isLength({ min: 3, max: 50 })
      .withMessage("Name must be between 3 and 50 characters"),
    body("phone")
      .matches(/^\d{10}$/)
      .withMessage("Phone must be a 10 digit number"),
  ],
  validate, profileUpdate);

export default router;