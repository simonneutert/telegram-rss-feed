FROM node:18-slim
WORKDIR /app
COPY package.json .
RUN yarn install

COPY index.js .
USER node

ARG telegram_key
ENV TELEGRAM_API_KEY=$telegram_key

ARG TELEGRAM_CHANNEL_OR_GROUP
ENV TELEGRAM_CHANNEL_OR_GROUP=$TELEGRAM_CHANNEL_OR_GROUP

ARG feed_url
ENV FEEDURL=$feed_url
