import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// Contact email imports
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Helper function to create JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// @desc    Register user
// @route   POST /api/auth/register
export const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = generateToken(user._id);
    const cookieOptions = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 day
      httpOnly: true, // Prevents XSS attacks from reading the cookie
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      path: "/",
    };
    const userResponse = user.toObject();
    delete userResponse.password; // Remove password from response
    res.cookie("token", token, cookieOptions).status(200).json({
      success: true,
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1. Find user & include password (since we set select: false in schema)
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });
    const token = generateToken(user._id);
    const cookieOptions = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 day
      httpOnly: true, // Prevents XSS attacks from reading the cookie
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      path: "/",
    };
    const userResponse = user.toObject();
    delete userResponse.password; // Remove password from response
    res.cookie("token", token, cookieOptions).status(200).json({
      success: true,
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Here you would normally generate a reset token and send an email.
    // For simplicity, we'll just return a success message.

    res.status(200).json({
      success: true,
      message: "Password reset link has been sent to your email (simulated).",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current logged in user (for frontend auth)
// @route   GET /api/user/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    const cookieOptions = {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      path: "/",
    };
    res.cookie("token", null, cookieOptions).status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // 1. Read the HTML template file
    // Adjust the path below to point exactly to your template file
    const templatePath = path.join(__dirname, "../templates/contactEmail.html");
    let htmlContent = fs.readFileSync(templatePath, "utf-8");

    // 2. Replace placeholders with actual data
    htmlContent = htmlContent
      .replace(/{{name}}/g, name)
      .replace(/{{email}}/g, email)
      .replace(/{{subject}}/g, subject || "General Inquiry")
      .replace(/{{message}}/g, message)
      .replace(/{{timestamp}}/g, new Date().toLocaleString());
    // 3. Configure Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD, // Use Gmail App Password
      },
    });

    // 4. Define Mail Options
    const mailOptions = {
      from: `"MindSettler Contact" <${process.env.SENDER_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: email, // Direct reply to user
      subject: `New Message: ${subject}`,
      html: htmlContent,
    };

    // 5. Send Email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("❌ Email Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error: Could not send email." });
  }
};

export const profileUpdate = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, phone } = req.body;
    const updates = { name, phone };

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password"); // Exclude password from response

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
