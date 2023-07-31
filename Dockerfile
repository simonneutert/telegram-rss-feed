FROM node:18-bullseye-slim
WORKDIR /app
COPY package.json .
RUN npm install

COPY index.js .
USER node

ARG telegram_key
ENV TELEGRAM_API_KEY=$telegram_key

ARG telegram_channel_or_group
ENV TELEGRAM_CHANNEL_OR_GROUP=$telegram_channel_or_group

ARG feed_url
ENV FEEDURL=$feed_url
