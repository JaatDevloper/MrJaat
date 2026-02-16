import express from "express";
import { registerRoutes } from "../server/routes.js";
import { createServer } from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const httpServer = createServer(app);

// For serverless environments like Vercel, we need to export the app
// but also ensure routes are registered.
// We use a singleton promise to ensure routes are registered only once per instance.
let routesPromise: Promise<any> | null = null;

export default async (req: any, res: any) => {
  if (!routesPromise) {
    routesPromise = registerRoutes(httpServer, app);
  }
  await routesPromise;
  return app(req, res);
};
