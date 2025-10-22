// server.js — MCP Retell compatible
import express from "express";
import bodyParser from "body-parser";
import { spawn } from "child_process";

const app = express();
const PORT = process.env.PORT || 10000;
app.use(bodyParser.json());

// --- 1. MCP standard discovery endpoint (JSON-RPC compliant)
app.get("/", (req, res) => {
  res.json({
    jsonrpc: "2.0",
    result: {
      tools: [
        { name: "calendar.create_event", type: "function" },
        { name: "calendar.list_events", type: "function" },
        { name: "calendar.freebusy", type: "function" }
      ],
      version: "1.3.0",
      vendor: "google-calendar-mcp"
    }
  });
});

// --- 2. Health endpoint (Render + monitoring)
app.get("/health", (_, res) =>
  res.json({
    status: "healthy",
    server: "google-calendar-mcp",
    version: "1.3.0",
    timestamp: new Date().toISOString()
  })
);

// --- 3. Démarrage du vrai processus MCP Oppie
const mcp = spawn("npx", ["@oppie-ai/mcp-google-calendar"], {
  stdio: "inherit",
  env: process.env
});

// --- 4. Logs et gestion du child process
mcp.on("exit", code => {
  console.log(`🌀 MCP child exited with code ${code}`);
});

// --- 5. Lance ton proxy Express
app.listen(PORT, "0.0.0.0", () =>
  console.log(`✅ Retell MCP proxy running on port ${PORT}`)
);
