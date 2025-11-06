FROM node:18-alpine
WORKDIR /
COPY package*.json ./
RUN npm install
ENV PORT=3000
COPY app/ .
CMD ["node", "app.js"]