const { Sequelize } = require('sequelize');

const Db = new Sequelize({
  // The `host` parameter is required for other databases
  // host: 'localhost'
  dialect: 'sqlite',
  storage: './db/database.sqlite',
});

exports.Db = Db;
