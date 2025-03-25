import { users, type User, type InsertUser, type Message, type InsertMessage } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Message-related methods
  getAllMessages(): Promise<Message[]>;
  addMessage(message: InsertMessage): Promise<Message>;
  clearMessages(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private messages: Map<number, Message>;
  currentUserId: number;
  currentMessageId: number;

  constructor() {
    this.users = new Map();
    this.messages = new Map();
    this.currentUserId = 1;
    this.currentMessageId = 1;
    
    // Add initial bot greeting
    this.addMessage({
      text: "Hello! I'm Law Mate. How can I assist you with your legal questions today?",
      isBot: true,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Message related methods
  async getAllMessages(): Promise<Message[]> {
    // Return messages sorted by ID to maintain chronological order
    return Array.from(this.messages.values()).sort((a, b) => a.id - b.id);
  }
  
  async addMessage(messageData: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const timestamp = new Date().toISOString();
    
    const message: Message = {
      id,
      text: messageData.text,
      isBot: messageData.isBot === undefined ? false : messageData.isBot,
      createdAt: timestamp,
    };
    
    this.messages.set(id, message);
    return message;
  }
  
  async clearMessages(): Promise<void> {
    this.messages.clear();
    this.currentMessageId = 1;
    
    // Add the initial greeting back
    await this.addMessage({
      text: "Hello! I'm Law Mate. How can I assist you with your legal questions today?",
      isBot: true,
    });
  }
}

export const storage = new MemStorage();
