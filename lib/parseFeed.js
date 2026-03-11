const Parser = require('rss-parser');

const { createArticleSchema } = require('./createArticleSchema');
const { Db } = require('./db');

const ArticleSchema = createArticleSchema(Db);
const parser = new Parser();

async function parseFeed(url, callback, callbackOptions = {}) {
  const feed = await parser.parseURL(url);
  console.log(feed.title);
  const savedItems = [];

  feed.items.forEach((item) => {
    savedItems.push(
      ArticleSchema.create({
        title: item.title,
        content: item.content,
        contentSnippet: item.contentSnippet,
        creator: item.creator,
        guid: item.guid,
        link: item.link,
      })
        .then((persistedItem) => {
          callback(persistedItem, callbackOptions);
          return item;
        })
        .catch((e) => {
          console.error('Error persisting item: ', item);
          console.error(e);
          return false;
        }),
    );
  });
  return savedItems;
}

exports.parseFeed = parseFeed;
