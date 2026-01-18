
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeBloodReport(testName: string, values: Record<string, number | string>) {
  try {
    const prompt = `You are a medical diagnostic assistant. Analyze the following blood test results and provide a 3-sentence summary. 
    Test Name: ${testName}
    Results: ${JSON.stringify(values)}
    Note: Always include a disclaimer that this is an AI analysis and the patient must consult a doctor. Keep it professional and empathetic.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 200,
      }
    });

    return response.text || "Unable to generate insights at this time.";
  } catch (error) {
    console.error("Gemini analysis error:", error);
    return "AI insights unavailable.";
  }
}
