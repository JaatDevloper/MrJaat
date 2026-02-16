import { quotes as hardcodedQuotes } from "../shared/quotes.js";

export interface IStorage {
  getQuotes(): Promise<any[]>;
  createQuote(quote: any): Promise<any>;
  deleteQuote(id: number): Promise<void>;
  getLogs(): Promise<any[]>;
  createLog(log: any): Promise<any>;
}

export class MemStorage implements IStorage {
  private quotes = [...hardcodedQuotes];
  private logs: any[] = [];
  private quoteId = 100;
  private logId = 1;

  async getQuotes(): Promise<any[]> {
    return this.quotes;
  }

  async createQuote(insertQuote: any): Promise<any> {
    const quote = { ...insertQuote, id: this.quoteId++ };
    this.quotes.push(quote);
    return quote;
  }

  async deleteQuote(id: number): Promise<void> {
    this.quotes = this.quotes.filter(q => q.id !== id);
  }

  async getLogs(): Promise<any[]> {
    return this.logs;
  }

  async createLog(insertLog: any): Promise<any> {
    const log = { ...insertLog, id: this.logId++ };
    this.logs.push(log);
    return log;
  }
}

export const storage = new MemStorage();
