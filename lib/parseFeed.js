const Parser = require('rss-parser');

const { db } = require('./db');

const parser = new Parser();

async function parseFeed(url, callback, callbackOptions = {}) {
  const insert = db.prepare(`
    INSERT OR IGNORE INTO Articles (title, content, contentSnippet, creator, guid, link)
    VALUES (:title, :content, :contentSnippet, :creator, :guid, :link)
  `);
  const feed = await parser.parseURL(url);
  console.log(feed.title);
  const savedItems = [];

  feed.items.forEach((item) => {
    const entry = {
      title: item.title ?? null,
      content: item.content ?? null,
      contentSnippet: item.contentSnippet ?? null,
      creator: item.creator ?? null,
      guid: item.guid ?? null,
      link: item.link ?? null,
    };
    try {
      const result = insert.run(entry);
      if (result.changes > 0) {
        callback(entry, callbackOptions);
      }
      savedItems.push(entry);
    } catch (e) {
      console.error('Error persisting item: ', item);
      console.error(e);
    }
  });
  return savedItems;
}

exports.parseFeed = parseFeed;
