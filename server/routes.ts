import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.quotes.list.path, async (req, res) => {
    const quotes = await storage.getQuotes();
    res.json(quotes);
  });

  app.post(api.quotes.create.path, async (req, res) => {
    try {
      const input = api.quotes.create.input.parse(req.body);
      const quote = await storage.createQuote(input);
      res.status(201).json(quote);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.logs.list.path, async (req, res) => {
    const logs = await storage.getLogs();
    res.json(logs);
  });

  app.post(api.logs.create.path, async (req, res) => {
    try {
      const input = api.logs.create.input.parse(req.body);
      const log = await storage.createLog(input);
      res.status(201).json(log);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed data
  seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingQuotes = await storage.getQuotes();
  if (existingQuotes.length === 0) {
    await storage.createQuote({ content: "Strength is not just physical, it's a state of mind.", author: "MrJaat" });
    await storage.createQuote({ content: "Roots deep, head high. That's the way.", author: "Jaat Wisdom" });
    await storage.createQuote({ content: "Built different. Built to last.", author: "MrJaat" });
  }
  
  const existingLogs = await storage.getLogs();
  if (existingLogs.length === 0) {
    await storage.createLog({ title: "System Initialization", content: "Platform online. Welcome to the new era." });
    await storage.createLog({ title: "Mission Update", content: "Continuing the legacy of strength and honor." });
  }
}
