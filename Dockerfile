FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install --omit=dev
ENV PORT=10000
EXPOSE 10000
CMD ["npm", "start"]
