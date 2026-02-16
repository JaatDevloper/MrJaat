import { z } from 'zod';
import { insertQuoteSchema, insertLogSchema, quotes, logs } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  quotes: {
    list: {
      method: 'GET' as const,
      path: '/api/quotes' as const,
      responses: {
        200: z.array(z.custom<typeof quotes.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/quotes' as const,
      input: insertQuoteSchema,
      responses: {
        201: z.custom<typeof quotes.$inferSelect>(),
        400: errorSchemas.validation,
        401: errorSchemas.internal,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/quotes/:id' as const,
      input: z.object({ authKey: z.string() }),
      responses: {
        200: z.object({ success: z.boolean() }),
        401: errorSchemas.internal,
        404: errorSchemas.notFound,
      },
    },
  },
  logs: {
    list: {
      method: 'GET' as const,
      path: '/api/logs' as const,
      responses: {
        200: z.array(z.custom<typeof logs.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/logs' as const,
      input: insertLogSchema,
      responses: {
        201: z.custom<typeof logs.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};
