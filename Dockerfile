FROM node:14-slim
WORKDIR /app
COPY package.json .
RUN yarn install
COPY index.js .
USER node

ARG telegram_key
ENV TELEGRAM_API_KEY=$telegram_key

ARG telegram_channel
ENV TELEGRAM_CHANNEL=$telegram_channel

ARG feed_url
ENV FEEDURL=$feed_url
