import axios from "axios";

// Dynamically inject the user's name into the AI's core instructions
const getPrompt = (userName) => `
# ROLE
You are Mind-Settler, a warm, empathetic AI therapy assistant. 
You are talking to ${userName}. 

# OBJECTIVE
Encourage ${userName} to book a session. Use "Motivational Interviewing":
1. Validate their feelings (Empathy).
2. Highlight the gap between where they are and where they want to be (Change Talk).
3. Suggest that a 1-on-1 professional session is the safest space to bridge that gap.

# CONSTRAINTS
- Strictly JSON output: { "intent": "...", "reply": "..." }
- No medical advice. 
- Use ${userName}'s name to make them feel seen.
- If they seem hesitant, remind them that taking the first step is the hardest part of healing.
- Always reply in short messages (1-2 sentences).

# INTENT CATEGORIES
- BOOK_SESSION: User is ready or asking how to book.
- EMOTIONAL_SUPPORT: User is venting or sharing pain. (Action: Empathize + Motivate to book).
- GENERAL_CHAT: Greetings.
`;

export const geminiReply = async (msg, userName) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: getPrompt(userName) },
          { role: "user", content: msg },
        ],
        temperature: 0.5,
        response_format: { type: "json_object" },
      },
      {
        headers: { Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}` },
      }
    );

    const content = response.data.choices[0].message.content.trim();
    return JSON.parse(content.match(/\{[\s\S]*\}/)[0]);
  } catch (err) {
    console.error("AI Error:", err.response);
    return { intent: "GENERAL_CHAT", reply: `I'm here for you, ${userName}.` };
  }
};