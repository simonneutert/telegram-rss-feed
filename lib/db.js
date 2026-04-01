const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('./db/database.sqlite');

exports.db = db;
