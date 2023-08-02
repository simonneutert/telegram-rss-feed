const { DataTypes } = require('sequelize');

const articleDefinition = {
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
};

function createArticleSchema(sequelize) {
  /**
   * config your database setup please check the details in the parser
   * on how to link you rss items and write them into the database.
   * I chose Article, because that's what an RSS Item typically is.
   */
  const ArticleSchema = sequelize.define('Article', articleDefinition);
  return ArticleSchema;
}

exports.articleDefinition = articleDefinition;
exports.createArticleSchema = createArticleSchema;
