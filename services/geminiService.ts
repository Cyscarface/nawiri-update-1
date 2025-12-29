
import { GoogleGenAI, Type } from "@google/genai";
import { Property, User, UserRole } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  /**
   * Creates a streaming chat session for the AI Assistant.
   */
  startChat: (userRole: UserRole, userName: string) => {
    return ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are the nawiri360 AI Assistant. 
        Your goal is to help users navigate the nawiri360 rental marketplace.
        User Name: ${userName}
        User Role: ${userRole}
        
        Platform Context:
        - nawiri360 is a modern marketplace for tenants, landlords, and service providers.
        - Tenants can search properties, apply, pay rent, and request maintenance.
        - Landlords can list properties, manage applications, and hire service providers.
        - Service Providers can bid on maintenance tasks.
        
        Guidelines:
        - Be helpful, professional, and concise.
        - If a user asks about pricing, mention we have listings in San Francisco, New York, etc.
        - Encourage users to verify their profile for better trust.
        - Use a friendly, modern tone.`,
      },
    });
  },

  /**
   * Generates property recommendations based on user history and preferences.
   */
  getRecommendations: async (user: User, properties: Property[], userPreferences: string) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Given the following user and a list of properties, recommend the top 3 and explain why.
        User: ${JSON.stringify(user)}
        Preferences: ${userPreferences}
        Properties: ${JSON.stringify(properties.map(p => ({ id: p.id, title: p.title, price: p.price, city: p.city })))}
        `,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    propertyId: { type: Type.STRING },
                    reason: { type: Type.STRING }
                  },
                  required: ["propertyId", "reason"]
                }
              }
            },
            required: ["recommendations"]
          }
        }
      });
      return JSON.parse(response.text).recommendations;
    } catch (error) {
      console.error("Gemini Error:", error);
      return [];
    }
  },

  /**
   * Analyzes a listing description for potential fraud or red flags.
   */
  detectFraudHeuristics: async (description: string) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze the following property listing description for red flags or common rental scams. Return a risk score (0-100) and specific warnings.
        Description: "${description}"`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              riskScore: { type: Type.NUMBER },
              warnings: { type: Type.ARRAY, items: { type: Type.STRING } },
              isFlagged: { type: Type.BOOLEAN }
            },
            required: ["riskScore", "warnings", "isFlagged"]
          }
        }
      });
      return JSON.parse(response.text);
    } catch (error) {
      return { riskScore: 0, warnings: [], isFlagged: false };
    }
  },

  /**
   * Provides market insights based on the current context.
   */
  getMarketInsights: async (city: string) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Provide a short 3-sentence summary of the current rental market trends in ${city} for the year 2025.`,
        config: {
          temperature: 0.7
        }
      });
      return response.text;
    } catch (error) {
      return "Market data unavailable at this time.";
    }
  }
};
