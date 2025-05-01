FROM node:23-slim

WORKDIR /app

# ARG telegram_key
# ENV TELEGRAM_API_KEY=$telegram_key

# ARG telegram_channel_or_group
# ENV TELEGRAM_CHANNEL_OR_GROUP=$telegram_channel_or_group

# ARG feed_url
# ENV FEED_URL=$feed_url

RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*
RUN npm install -g node-gyp

COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY lib ./lib
COPY index.js .
USER node

CMD [ "node", "index.js" ]
