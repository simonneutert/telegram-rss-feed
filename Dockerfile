FROM node:24-slim

WORKDIR /app

RUN apt-get update && \
  apt-get install -y \
  python3 \
  sqlite3 \
  make \
  g++ \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY lib ./lib
COPY index.js .
USER node

CMD [ "node", "index.js" ]
