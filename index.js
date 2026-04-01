const { z } = require('zod');
const { db } = require('./lib/db');
const { createArticleSchema } = require('./lib/createArticleSchema');
const { parseFeed } = require('./lib/parseFeed');
const { sendMessage } = require('./lib/sendMessage');

const EnvSchema = z.object({
  FEED_URL: z.url(),
  TELEGRAM_API_KEY: z.string().min(1),
  TELEGRAM_CHANNEL_OR_GROUP: z.string().min(1),
});

const env = EnvSchema.parse(process.env);

createArticleSchema(db);

(async () => {
  await parseFeed(env.FEED_URL, sendMessage, {
    telegramApiKey: env.TELEGRAM_API_KEY,
    telegramChannelOrGroup: env.TELEGRAM_CHANNEL_OR_GROUP,
  });
})();
