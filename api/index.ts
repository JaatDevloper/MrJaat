import express from "express";
import { registerRoutes } from "../server/routes";
import { createServer } from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const httpServer = createServer(app);

// For serverless environments like Vercel, we need to export the app
// but also ensure routes are registered.
const promise = registerRoutes(httpServer, app);

export default async (req: any, res: any) => {
  await promise;
  return app(req, res);
};
