import { GoogleGenAI } from "@google/genai";
import { MOCK_TOURS } from "./tours";

// In a real app, this key comes from process.env.API_KEY
// For this demo, we assume the environment is set up correctly.
const apiKey = process.env.API_KEY || ''; 

const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are "SinoGuide", an expert AI Travel Consultant for a premium Chinese travel agency called "SinoVoyage".
Your goal is to help users find the perfect trip, explain itinerary details, and encourage them to book.
You are polite, professional, and enthusiastic.

Here is the current list of available tours (Product Knowledge):
${JSON.stringify(MOCK_TOURS.map(t => ({
  title: t.title,
  category: t.category,
  price: t.price,
  days: t.days,
  location: t.location,
  features: t.features,
  availability: `${t.currentGroupSize}/${t.maxGroupSize} booked`
})))}

Rules:
1. Only recommend tours from the provided list.
2. If asked about price, mention the group buy discounts (2 people get 5% off, 3+ get 10% off).
3. If asked about membership, explain they get cashback to their wallet for future trips.
4. Keep answers concise (under 100 words) unless asked for details.
5. If the user asks for a recommendation, ask them if they prefer History (Study), Business, or Nature (Tourism).
`;

export const sendMessageToGemini = async (history: {role: string, parts: string}[], message: string) => {
  if (!apiKey) {
    return "API Key is missing. Please configure the environment.";
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.parts }]
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the travel database right now. Please try again in a moment.";
  }
};