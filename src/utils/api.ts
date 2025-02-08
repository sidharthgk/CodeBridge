import axios from "axios";

// Load API key securely
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";

export const runCode = async (language: string, code: string) => {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
        role: "user",
        parts: [
          {
          text: `Execute the following ${language} code and provide the terminal output:\n\n${code}\n\nIf there is an error, display the error message.`,
          },
        ],
        },
      ],
      },
      {
      headers: { "Content-Type": "application/json" },
      }
    );

    const output = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No output.";
    return { status: "success", stdout: output, stderr: null };
  } catch (error) {
    console.error("API request failed:", error);
    return { status: "failed", error: "API request failed" };
  }
};
