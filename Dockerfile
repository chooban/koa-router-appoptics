FROM node:10.15.0-stretch as base

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3333

CMD [ "node", "index.js" ]

