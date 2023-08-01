const { Db } = require('./lib/db');
const { parseFeed } = require('./lib/parseFeed');
const { sendMessage } = require('./lib/sendMessage');

Db.sync() // { force: true } will be useful if you need to start from scratch
  .then(() => {});

/**
 * this function auto calls itself in an async fashion
 */
(async () => {
  await parseFeed(process.env.FEED_URL, sendMessage, []);
})();
