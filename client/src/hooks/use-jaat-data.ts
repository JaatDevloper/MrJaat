import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type InsertQuote, type InsertLog } from "@shared/schema";
import { z } from "zod";

// Definitions based on schema provided in prompt
// Note: Schema definitions might be inferred, but prompt explicitly gave schema
// We will rely on api definition from prompt

// ============================================
// QUOTES
// ============================================

export function useQuotes() {
  return useQuery({
    queryKey: [api.quotes.list.path],
    queryFn: async () => {
      const res = await fetch(api.quotes.list.path);
      if (!res.ok) throw new Error("Failed to fetch quotes");
      const data = await res.json();
      return api.quotes.list.responses[200].parse(data);
    },
  });
}

export function useCreateQuote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (quote: InsertQuote) => {
      const validated = api.quotes.create.input.parse(quote);
      const res = await fetch(api.quotes.create.path, {
        method: api.quotes.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });
      if (!res.ok) throw new Error("Failed to create quote");
      const data = await res.json();
      return api.quotes.create.responses[201].parse(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.quotes.list.path] });
    },
  });
}

// ============================================
// LOGS
// ============================================

export function useLogs() {
  return useQuery({
    queryKey: [api.logs.list.path],
    queryFn: async () => {
      const res = await fetch(api.logs.list.path);
      if (!res.ok) throw new Error("Failed to fetch logs");
      const data = await res.json();
      return api.logs.list.responses[200].parse(data);
    },
  });
}

export function useCreateLog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (log: InsertLog) => {
      const validated = api.logs.create.input.parse(log);
      const res = await fetch(api.logs.create.path, {
        method: api.logs.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });
      if (!res.ok) throw new Error("Failed to create log");
      const data = await res.json();
      return api.logs.create.responses[201].parse(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.logs.list.path] });
    },
  });
}
