
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

// Fix: Initialized GoogleGenAI with process.env.API_KEY directly as per SDK requirements and guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getShoppingAdvice = async (userMessage: string, availableProducts: Product[]) => {
  try {
    const productsContext = availableProducts.map(p => 
      `${p.name} (${p.category}): KSh ${p.price.toLocaleString()}. ${p.description}`
    ).join('\n');

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a helpful gaming tech specialist assistant on GX Commerce, based in Kenya. 
      You help users choose the best gaming gear from the following catalog.
      Always refer to prices in KSh (Kenyan Shillings).
      
      Catalog:
      ${productsContext}
      
      User asks: ${userMessage}
      
      Provide a concise, expert answer in a "gaming enthusiast" tone. Keep it under 100 words.`
    });

    return response.text || "I'm having trouble connecting to my sensors. Try asking again, gamer.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to the AI grid.";
  }
};
