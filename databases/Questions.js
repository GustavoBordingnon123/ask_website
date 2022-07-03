const Sequelize = require('sequelize');
const connection = require('./database')

const Question = connection.define('question', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    the_question:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Question.sync({force:false}).then(() => {});

module.exports = Question;
