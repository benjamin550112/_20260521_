import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const SYSTEM_INSTRUCTION = `你是一個專業的數據分析師。請分析使用者提供的 CSV 數據，並提供深入的洞察、趨勢分析以及具體的商業建議。
請使用繁體中文回答，並將分析結果格式化為 Markdown。`;

export default async (req: Request) => {
  // 僅允許 POST 請求
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { csvData } = await req.json();
    if (!csvData) {
      return new Response(JSON.stringify({ error: "Missing CSV data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `請分析以下 CSV 數據：\n\n${csvData}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return new Response(JSON.stringify({ analysis: response.text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return new Response(JSON.stringify({ error: "Failed to analyze data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
