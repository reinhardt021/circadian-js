// used mostly for sequelize CLI
require('dotenv').config()
const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_TYPE, DBTEST_NAME } = process.env;
module.exports = {
  "development": {
    "username": DB_USER,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": DB_TYPE
  },
  "test": {
    "username": DB_USER,
    "password": DB_PASSWORD,
    "database": DBTEST_NAME,
    "host": DB_HOST,
    "dialect": DB_TYPE
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
