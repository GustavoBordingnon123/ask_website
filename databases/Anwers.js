const Sequelize = require('sequelize');
const connection = require('./database')

const Answer = connection.define('answer', {
    answer_text:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    answer_id:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Answer.sync({force:false}).then(() => {});

module.exports = Answer;