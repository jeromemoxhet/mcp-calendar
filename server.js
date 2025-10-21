import { startServer } from "@oppie-ai/mcp-google-calendar";

startServer({
  host: "0.0.0.0",
  port: process.env.PORT || 10000,
  showToolsOnRoot: true, // 👈 ajoute une route HTTP JSON sur "/"
});
