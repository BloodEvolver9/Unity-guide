// UnityForge server: keeps your AI API key on the server, never in the browser.
const express = require("express");
const path = require("path");
const OpenAI = require("openai");

const app = express();
app.use(express.json({ limit: "1mb" }));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/tutor", async (req, res) => {
  const { question, context = "" } = req.body || {};
  if (!question || typeof question !== "string") {
    return res.status(400).json({ error: "Write a question first." });
  }
  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({
      error: "AI tutor isn't connected yet. Add OPENAI_API_KEY to your hosting environment to enable it."
    });
  }
  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are UnityForge, a friendly expert Unity and C# tutor for beginners. Explain step-by-step, use accurate modern Unity/C# examples, define unfamiliar terms, and never assume the learner already knows the basics. When sharing code, use fenced code blocks. If the user asks for debugging, identify the likely cause and give concrete steps. Encourage safe, original learning." },
        { role: "user", content: `Question: ${question}\n\nCurrent learning context/code (if any):\n${String(context).slice(0, 12000)}` }
      ],
      max_tokens: 1000
    });
    res.json({ answer: response.choices[0]?.message?.content || "I couldn't form an answer. Try asking another way." });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: "The tutor couldn't answer right now. Check your server's API configuration and try again." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`UnityForge is running on http://localhost:${port}`));
