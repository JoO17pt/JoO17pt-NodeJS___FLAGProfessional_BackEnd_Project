const Sequelize = require("sequelize");
const connection = require("../database/database");

const Message = connection.define('messages',{
    text:{
        type: Sequelize.STRING,
        allowNull: true
    },
    owner: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
})

module.exports = Message