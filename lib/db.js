const { Sequelize } = require('sequelize');

const Db = new Sequelize({
  dialect: 'sqlite',
  storage: './db/database.sqlite',
});

exports.Db = Db;
