const Sequelize = require("sequelize");
const connection = require("../database/database");

const DealUser = connection.define("dealUsers", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  rate: {
    type: Sequelize.INTEGER,
    defaultValue: null,
    allowNull: true,
  },
});

module.exports = DealUser;
