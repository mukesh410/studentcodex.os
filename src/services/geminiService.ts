import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function askOracle(query: string, mode: 'simple' | 'example' | 'short' | 'default' = 'default') {
  const instructions = {
    simple: "Explain like I'm 10 years old. Use very simple language.",
    example: "Provide a concrete, real-world application or example of this concept.",
    short: "Provide a concise, one-sentence response.",
    default: "Provide a structured, academic but accessible explanation."
  };

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: query,
    config: {
      systemInstruction: `Task: Doubt Solver for students. Objective: ${instructions[mode] || instructions.default}`,
    }
  });

  return response.text || "ERROR: NO_RESPONSE_RECOVERED";
}

export async function synthesizeNotes(notes: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Input Data:\n${notes}`,
    config: {
      systemInstruction: "Task: Student Note Synthesizer. Objective: Extract structured summaries, key concepts, and potential exam questions from the provided text. Format: Use clean Markdown with clearly labeled sections (## Summary, ## Key Concepts, ## Potential Questions).",
    },
  });

  return response.text || "ERROR: SYNTHESIS_FAILED";
}

export async function generateStudyPlan(subjects: string, hours: number, examDate: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Inputs:
- Subjects: ${subjects}
- Available hours per day: ${hours}
- Exam Deadline: ${examDate}`,
    config: {
      systemInstruction: "Task: Study Architect. Objective: Output a realistic, day-by-day study schedule starting from today. Format: Clean Markdown list or table. Keep it actionable and tailored to the provided hours.",
    },
  });

  return response.text || "ERROR: ARCHITECT_PLAN_FAILED";
}
