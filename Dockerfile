FROM node:20-alpine

EXPOSE 3000

COPY . /app

WORKDIR /app

RUN npm install

CMD ["node", "index.js"]



