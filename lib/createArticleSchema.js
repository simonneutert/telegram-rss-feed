const { DataTypes } = require('sequelize');

const createArticleSchema = function (sequelize) {
  /**
   * config your database setup please check the details in the parser
   * on how to link you rss items and write them into the database.
   * I chose Article, because that's what an RSS Item typically is.
   */
  const ArticleSchema = sequelize.define('Article', {
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
  return ArticleSchema;
};

exports.createArticleSchema = createArticleSchema;
