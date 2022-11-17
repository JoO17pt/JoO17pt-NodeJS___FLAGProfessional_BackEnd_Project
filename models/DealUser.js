const Sequelize = require("sequelize");
const connection = require("../database/database");

const DealUser = connection.define("dealUsers", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  owner: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = DealUser;
