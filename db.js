require('dotenv').config();
const { Sequelize } = require('sequelize');

const { DB_HOST = '23.150.24.23', DB_PORT = 5432, DB_NAME = 'weflix', DB_USER = 'weflix', DB_PASS = 'dOwJ2QmiHd8y00' } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: false 
});

module.exports = sequelize;
