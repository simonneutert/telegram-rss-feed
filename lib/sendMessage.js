const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_API_KEY);

// process.env.TELEGRAM_CHANNEL_OR_GROUP should be a string like:
// @this_is_my_TELEGRAM_CHANNEL_OR_GROUP
//
function sendMessage(persistedItem) {
  if (!persistedItem) {
    return false;
  }
  if (!persistedItem.link) {
    return false;
  }
  // console.log(persistedItem);
  if (!process.env.TELEGRAM_CHANNEL_OR_GROUP || !process.env.TELEGRAM_API_KEY) {
    return false;
  }
  bot.telegram
    .sendMessage(process.env.TELEGRAM_CHANNEL_OR_GROUP, persistedItem.link)
    .then((msg) => {
      console.log(msg);
    })
    .catch((e) => {
      console.log(e);
    });
  return true;
}

exports.sendMessage = sendMessage;
