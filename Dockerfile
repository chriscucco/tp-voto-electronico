# syntax=docker/dockerfile:1

FROM node:16.15.1-alpine

RUN apk add g++ make py3-pip


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./ ./

ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max_old_space_size=2048

RUN npm run build

EXPOSE $PORT

CMD [ "npm", "run", "start" ] 