const { Telegraf } = require('telegraf');

// process.env.TELEGRAM_CHANNEL_OR_GROUP should be a string like:
// @this_is_my_TELEGRAM_CHANNEL_OR_GROUP
//
function sendMessage(persistedItem, options = {}) {
  if (!persistedItem) {
    return false;
  }
  if (!persistedItem.link) {
    return false;
  }
  // console.log(persistedItem);
  if (!options.telegramApiKey || !options.telegramChannelOrGroup) {
    return false;
  }
  const bot = new Telegraf(options.telegramApiKey);
  bot.telegram
    .sendMessage(options.telegramChannelOrGroup, persistedItem.link)
    .then((msg) => {
      console.log(msg);
    })
    .catch((e) => {
      console.log(e);
    });
  return true;
}

exports.sendMessage = sendMessage;
