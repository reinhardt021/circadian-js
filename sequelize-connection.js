const { Sequelize } = require('sequelize');
const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_TYPE } = process.env;
console.log(DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_TYPE);
//console.log('process.env', process.env);
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_TYPE
});

try {
    sequelize.authenticate().then(() => console.log('Database Connection has been established successfully.'));
} catch(error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;
