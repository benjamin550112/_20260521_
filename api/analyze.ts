import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

const SYSTEM_INSTRUCTION = `你是一個專業的數據分析師。請分析使用者提供的 CSV 數據，並提供深入的洞察、趨勢分析以及具體的商業建議。
請使用繁體中文回答，並將分析結果格式化為 Markdown。`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  console.log('Received request method:', req.method);
  console.log('Request body:', req.body);
  try {
    const { csvData, provider } = req.body;

    if (!csvData) {
      return res.status(400).json({ error: 'Missing CSV data' });
    }

    const selectedProvider = provider || 'gemini';

    if (selectedProvider === 'gemini') {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: `請分析以下 CSV 數據：\n\n${csvData}`,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      const analysis = response.text;
      if (!analysis) {
        return res.status(500).json({ error: 'Gemini API returned an empty response.' });
      }

      return res.status(200).json({ analysis });
    } else if (selectedProvider === 'nvidia') {
      const apiKey = process.env.NVIDIA_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'NVIDIA_API_KEY is not configured on the server.' });
      }

      const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'nvidia/nemotron-mini-4b-instruct',
          messages: [
            {
              role: 'system',
              content: SYSTEM_INSTRUCTION,
            },
            {
              role: 'user',
              content: `請分析以下 CSV 數據：\n\n${csvData}`,
            },
          ],
          temperature: 0.5,
          max_tokens: 2048,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('NVIDIA API error response:', errorText);
        return res.status(response.status).json({ error: `NVIDIA API error: ${response.statusText}` });
      }

      const data = await response.json();
      const analysis = data.choices?.[0]?.message?.content;
      if (!analysis) {
        return res.status(500).json({ error: 'NVIDIA API returned an empty response.' });
      }

      return res.status(200).json({ analysis });
    } else {
      return res.status(400).json({ error: `Unsupported provider: ${selectedProvider}` });
    }
  } catch (error: any) {
    console.error('Serverless Function Error:', error);
    return res.status(500).json({ error: error?.message || 'Internal Server Error' });
  }
}
