const Sequelize = require("sequelize");

const connection = new Sequelize('ask_questions','root','******', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;