FROM node:8.4-alpine

RUN addgroup -S app && adduser -S -G app app

WORKDIR /home/app

ADD package.docker.json ./package.json

RUN npm install --production

ADD app.js ./app.js
ADD dist ./dist

USER app

CMD ["node", "app.js"]
