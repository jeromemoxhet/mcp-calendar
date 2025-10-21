FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install --omit=dev
ENV PORT=10000
EXPOSE 10000
# Forcer l’écoute sur 0.0.0.0 et PORT Render
CMD ["sh","-c","HOST=0.0.0.0 PORT=${PORT:-10000} npx @oppie-ai/mcp-google-calendar"]
CMD ["node","server.js"]
