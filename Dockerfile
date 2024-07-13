FROM node:alpine3.19

WORKDIR /usr/src/app

COPY package*.json ./
COPY ./prisma prisma


RUN npm install

COPY . .

RUN npm run build

CMD ["node", "./dist/src/main.js"]