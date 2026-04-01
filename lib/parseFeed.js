const Parser = require('rss-parser');
const { z } = require('zod');
const { db } = require('./db');

const FeedItemSchema = z.object({
  title: z.string().nullable(),
  content: z.string().nullable(),
  contentSnippet: z.string().nullable(),
  creator: z.string().nullable(),
  guid: z.string().nullable(),
  link: z.url(),
});

const parser = new Parser();
let insert = null;

async function parseFeed(url, callback, callbackOptions = {}) {
  if (!insert) {
    insert = db.prepare(`
      INSERT OR IGNORE INTO Articles (title, content, contentSnippet, creator, guid, link)
      VALUES (:title, :content, :contentSnippet, :creator, :guid, :link)
    `);
  }
  const feed = await parser.parseURL(url);
  console.log(feed.title);
  const savedItems = [];

  feed.items.forEach((item) => {
    const parsed = FeedItemSchema.safeParse({
      title: item.title ?? null,
      content: item.content ?? null,
      contentSnippet: item.contentSnippet ?? null,
      creator: item.creator ?? null,
      guid: item.guid ?? null,
      link: item.link ?? null,
    });
    if (!parsed.success) {
      console.error('Invalid feed item, skipping: ', item);
      console.error(parsed.error.issues);
      return;
    }
    const entry = parsed.data;
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

function resetPreparedStatements() {
  insert = null;
}

exports.parseFeed = parseFeed;
exports.resetPreparedStatements = resetPreparedStatements;
