const assert = require('assert');
const { DataTypes } = require('sequelize');

const { Db } = require('../lib/db');
const { parseFeed } = require('../lib/parseFeed');
const { sendMessage } = require('../lib/sendMessage');
const { articleDefinition } = require('../lib/createArticleSchema');

const url = 'https://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss';

Db.sync({ force: true }) // { force: true } will be useful if you need to start from scratch
  .then(() => {});

describe('index.js', function () {
  describe('ArticleSchema definition', function () {
    it('should be defined with certain properties', function () {
      assert(articleDefinition.title);
      assert.equal(articleDefinition.title, DataTypes.STRING);
      assert(articleDefinition.content);
      assert.equal(articleDefinition.content, DataTypes.TEXT);
      assert(articleDefinition.contentSnippet);
      assert.equal(articleDefinition.contentSnippet, DataTypes.TEXT);
      assert(articleDefinition.creator);
      assert.equal(articleDefinition.creator, DataTypes.STRING);

      assert.equal(articleDefinition.guid.type.key, 'STRING');
      assert(articleDefinition.link);
      assert.equal(articleDefinition.link.type.key, 'STRING');
      assert(articleDefinition.link.unique);
    });
  });

  describe('sendMessage function', function () {
    it('should return false if no persistedItem is passed', function () {
      const result = sendMessage();
      assert.equal(result, false);
    });

    it('should return false if no link is passed', function () {
      const result = sendMessage({});
      assert.equal(result, false);
    });

    it('should return false if no options.telegramApiKey is passed', function () {
      const result = sendMessage({
        link: 'http://example.com',
        telegramChannelOrGroup: '1234567890',
      });
      assert.equal(result, false);
    });

    it('should return false if no options.telegramChannelOrGroup is passed', function () {
      const result = sendMessage({
        link: 'http://example.com',
        telegramApiKey: '1234567890',
      });
      assert.equal(result, false);
    });
  });

  it('parse feed and return articles', async function () {
    const result = await parseFeed(url, console.log, []);
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
