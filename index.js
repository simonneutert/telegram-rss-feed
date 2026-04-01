const { db } = require('./lib/db');
const { createArticleSchema } = require('./lib/createArticleSchema');
const { parseFeed } = require('./lib/parseFeed');
const { sendMessage } = require('./lib/sendMessage');

createArticleSchema(db);

(async () => {
  await parseFeed(process.env.FEED_URL, sendMessage, {
    telegramApiKey: process.env.TELEGRAM_API_KEY,
    telegramChannelOrGroup: process.env.TELEGRAM_CHANNEL_OR_GROUP,
  });
})();
