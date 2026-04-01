FROM node:24-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY lib ./lib
COPY index.js .
RUN mkdir -p /app/db && chown node:node /app/db
USER node

CMD [ "node", "index.js" ]
