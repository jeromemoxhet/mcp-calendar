import express from "express";
import { spawn } from "child_process";

const app = express();
const PORT = process.env.PORT || 10000;

// Démarrage du process MCP CLI
const mcp = spawn("npx", ["@oppie-ai/mcp-google-calendar"], {
  stdio: "inherit",
  env: process.env,
});

// Route santé standard
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    server: "google-calendar-mcp",
    port: PORT,
  });
});

// Route JSON “liste de tools” (pour Retell)
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    tools: [
      "calendar.create_event",
      "calendar.list_events",
      "calendar.freebusy",
    ],
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Proxy server running on port ${PORT}`);
});
