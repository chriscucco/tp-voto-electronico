# syntax=docker/dockerfile:1

FROM node:16.15.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

EXPOSE $PORT

CMD [ "npm", "run", "start" ] 