const Sequelize = require("sequelize");
const connection = require("../database/database");

const Deal = connection.define('deals',{
    status:{
        type: Sequelize.STRING,
        allowNull: false
    },
    owner: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
})

module.exports = Deal