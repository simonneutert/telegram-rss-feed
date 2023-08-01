const assert = require('assert');

const { Db } = require('../lib/db');
const { parseFeed } = require('../lib/parseFeed');
const { sendMessage } = require('../lib/sendMessage');

const url = 'https://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss';

Db.sync({ force: true }) // { force: true } will be useful if you need to start from scratch
  .then(() => {});

describe('main.js', function () {
  it('parse feed and return articles', async function () {
    const result = await parseFeed(url, sendMessage, []);
    assert(result.length);
    Promise.all(result).then((values) => {
      const firstResult = values[0];
      assert(firstResult.title);
      assert(typeof firstResult.title === 'string');
      assert(firstResult.link);
      assert(typeof firstResult.link === 'string');
      assert(firstResult.link.includes('http'));
      assert(firstResult.content);
      assert(typeof firstResult.content === 'string');
      assert(firstResult.contentSnippet);
      assert(typeof firstResult.contentSnippet === 'string');
      assert(firstResult.creator);
      assert(typeof firstResult.creator === 'string');
      assert(firstResult.guid);
      assert(typeof firstResult.guid === 'string');
    });
  });
});
