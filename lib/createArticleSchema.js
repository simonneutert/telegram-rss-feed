const articleDefinition = {
  title: 'TEXT',
  content: 'TEXT',
  contentSnippet: 'TEXT',
  creator: 'TEXT',
  guid: { type: 'TEXT' },
  link: { type: 'TEXT', unique: true },
};

function createArticleSchema(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS Articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT,
      contentSnippet TEXT,
      creator TEXT,
      guid TEXT,
      link TEXT UNIQUE
    )
  `);
}

exports.articleDefinition = articleDefinition;
exports.createArticleSchema = createArticleSchema;
