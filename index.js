const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  // The `host` parameter is required for other databases
  // host: 'localhost'
  dialect: 'sqlite',
  storage: './db/database.sqlite',
});

/**
 * config your database setup please check the details in the parser
 * on how to link you rss items and write them into the database.
 * I chose Article, because that's what an RSS Item typically is.
 */
const Article = sequelize.define('Article', {
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  contentSnippet: DataTypes.TEXT,
  creator: DataTypes.STRING,
  guid: {
    type: DataTypes.STRING,
  },
  link: {
    type: DataTypes.STRING,
    unique: true,
  },
});

sequelize
  .sync() // { force: true } will be useful if you need to start from scratch
  .then(() => {});

const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM_API_KEY);
const Parser = require('rss-parser');
const parser = new Parser();

/**
 * this function auto calls itself in an async fashion
 */
(async () => {
  const feed = await parser.parseURL(process.env.FEEDURL);
  console.log(feed.title);

  feed.items.forEach((item) => {
    // this is where the items are written to the db
    // please, read this and edit to fit.
    Article.create({
      title: item.title,
      content: item.content,
      contentSnippet: item.contentSnippet,
      creator: item.creator,
      guid: item.guid,
      link: item.link,
    })
      .then((persistedItem) => {
        // process.env.TELEGRAM_CHANNEL_OR_GROUP should be a string like:
        // @this_is_my_TELEGRAM_CHANNEL_OR_GROUP
        //
        bot.telegram
          .sendMessage(
            process.env.TELEGRAM_CHANNEL_OR_GROUP,
            persistedItem.link,
          )
          .then((msg) => {
            console.log(msg);
            console.log(persistedItem.link);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.error(e);
      });
  });
})();
