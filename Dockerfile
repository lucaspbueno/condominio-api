FROM node:22-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["sh", "-c", "npm run migrate && npm run seed && npm run dev"]