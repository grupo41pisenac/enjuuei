FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

COPY . .

RUN npx nest build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]