import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";

const messageSchema = z.object({
  text: z.string().min(1).max(1000),
  isBot: z.boolean().optional(),
});

// Initialize Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Function to generate response using Gemini API
async function generateGeminiResponse(userMessage: string): Promise<string> {
  try {
    // For safety, ensure we have an API key
    if (!process.env.GEMINI_API_KEY) {
      console.error('Missing Gemini API key');
      return "I'm experiencing technical difficulties. Please try again later.";
    }
    
    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    // Create prompt with legal context
    const prompt = `
      You are Law Mate, an AI legal assistant. Respond to the following legal query with 
      accurate, helpful information. Provide general legal information, not specific legal advice.
      Always remind users that you're not a substitute for professional legal counsel.
      Keep your responses concise and focused on the legal aspects of the question.
      
      User query: ${userMessage}
    `;
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return "I'm sorry, I couldn't process your request at this time. Please try again later.";
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all messages
  app.get("/api/messages", async (req, res) => {
    try {
      const messages = await storage.getAllMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  // Send a message
  app.post("/api/messages", async (req, res) => {
    try {
      const validatedData = messageSchema.parse(req.body);
      
      // Check if this is a bot message (sent directly, not a response)
      if ('isBot' in req.body && req.body.isBot === true) {
        // Add the bot message directly (welcome message)
        const botMessage = await storage.addMessage({
          text: validatedData.text,
          isBot: true,
        });
        
        return res.status(201).json([botMessage]);
      }
      
      // Normal flow - user message followed by bot response
      // Add user message
      const userMessage = await storage.addMessage({
        text: validatedData.text,
        isBot: false,
      });
      
      // Generate bot response using Gemini API
      let botResponse;
      try {
        console.log("Generating response from Gemini for:", validatedData.text);
        botResponse = await generateGeminiResponse(validatedData.text);
        console.log("Received response from Gemini");
      } catch (error) {
        console.error("Error generating Gemini response:", error);
        botResponse = "I'm sorry, I'm having trouble processing your request right now. Please try again later.";
      }
      
      // Add bot response
      const botMessage = await storage.addMessage({
        text: botResponse,
        isBot: true,
      });
      
      res.status(201).json([userMessage, botMessage]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid message format", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to send message" });
      }
    }
  });

  // Clear chat history
  app.delete("/api/messages", async (req, res) => {
    try {
      await storage.clearMessages();
      res.status(200).json({ message: "Chat history cleared" });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear chat history" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
