import { db } from "./db.js";
import { eq } from "drizzle-orm";
import {
  quotes, logs,
  type InsertQuote, type InsertLog,
  type Quote, type Log
} from "../shared/schema.js";

export interface IStorage {
  getQuotes(): Promise<Quote[]>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  deleteQuote(id: number): Promise<void>;
  getLogs(): Promise<Log[]>;
  createLog(log: InsertLog): Promise<Log>;
}

export class DatabaseStorage implements IStorage {
  async getQuotes(): Promise<Quote[]> {
    return await db.select().from(quotes).orderBy(quotes.createdAt);
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const { authKey, ...data } = insertQuote as any;
    const [quote] = await db.insert(quotes).values(data).returning();
    return quote;
  }

  async deleteQuote(id: number): Promise<void> {
    await db.delete(quotes).where(eq(quotes.id, id));
  }

  async getLogs(): Promise<Log[]> {
    return await db.select().from(logs).orderBy(logs.createdAt);
  }

  async createLog(insertLog: InsertLog): Promise<Log> {
    const [log] = await db.insert(logs).values(insertLog).returning();
    return log;
  }
}

export const storage = new DatabaseStorage();
