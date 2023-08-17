import { routes } from "./connect.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import http from "http";
import express from "express";
import { expressConnectMiddleware } from "@connectrpc/connect-express";
import serveStatic from "serve-static";
import morgan from "morgan";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const staticRoutes = serveStatic(path.join(__dirname, "../frontend"));
const logger = morgan("tiny");
app.use(
  expressConnectMiddleware({
    routes,
  })
);
app.use(logger);

app.use(staticRoutes);

http.createServer(app).listen(8080);
