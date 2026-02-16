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
      const { authKey, ...quoteData } = api.quotes.create.input.parse(req.body);
      
      const adminKey = process.env.ADMIN_AUTH_KEY;
      if (!adminKey) {
        log("ADMIN_AUTH_KEY is not defined in environment variables", "error");
        return res.status(500).json({ message: "Server configuration error: admin key not set." });
      }

      if (authKey !== adminKey) {
        return res.status(401).json({ message: "Authentication Failed: Invalid admin auth key." });
      }

      const quote = await storage.createQuote(quoteData);
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

  app.delete("/api/quotes/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const { authKey } = req.body;

    if (authKey !== process.env.ADMIN_AUTH_KEY) {
      return res.status(401).json({ message: "Unauthorized: Invalid admin auth key." });
    }

    try {
      await storage.deleteQuote(id);
      res.json({ success: true });
    } catch (err) {
      res.status(404).json({ message: "Quote not found." });
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
