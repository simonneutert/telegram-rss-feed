FROM node:23-alpine

WORKDIR /app

ARG telegram_key
ENV TELEGRAM_API_KEY=$telegram_key

ARG telegram_channel_or_group
ENV TELEGRAM_CHANNEL_OR_GROUP=$telegram_channel_or_group

ARG feed_url
ENV FEED_URL=$feed_url

RUN apk update && apk add --no-cache \
    build-base \
    python3 \
    && rm -rf /var/cache/apk/*

COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY lib ./lib
COPY index.js .
USER node

CMD [ "node", "index.js" ]
