FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install express
ENV PORT=3000
CMD ["node", "app.js"]