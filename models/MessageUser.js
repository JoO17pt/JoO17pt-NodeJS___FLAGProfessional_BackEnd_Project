const Sequelize = require("sequelize");
const connection = require("../database/database");

const MessageUser = connection.define("messageUsers", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
});

module.exports = MessageUser;
