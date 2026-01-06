import express from "express";
import { geminiReply } from "../utils/ai.js";
import { protect } from "../middlewares/userMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { message } = req.body;
  const userName = req.user?.name.split(' ')[0] || "Friend";

  try {
    const ai = await geminiReply(message, userName);

    // If the user is venting (EMOTIONAL_SUPPORT), we add a motivational nudge
    if (ai.intent === "EMOTIONAL_SUPPORT") {
      ai.reply += ` It takes a lot of courage to share that, ${userName.split(' ')[0]}. Sometimes, having a dedicated hour with a professional can help untangle these thoughts. Would you like to see who is available today?`;
    }

    // If they agree to book
    if (ai.intent === "BOOK_SESSION") {
      ai.reply = `I'm so glad you're prioritizing yourself, ${userName.split(' ')[0]}. I've opened the **'Time Slots'** for you. Which time feels right?`;
    }

    res.json(ai);
  } catch (error) {
    res.status(500).json({ reply: "I'm listening, but I hit a snag. Let's keep talking." });
  }
});

export default router;