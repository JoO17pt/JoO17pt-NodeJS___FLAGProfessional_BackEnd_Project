const Sequelize = require("sequelize");
const connection = require("../database/database");
const User = require("../models/User");
const Deal = require("./Deal");

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

// DealUser.sync({force: true});

// User.hasMany(DealUser);
// DealUser.belongsTo(User);

// Deal.hasMany(DealUser);
// DealUser.belongsTo(Deal);

module.exports = DealUser;
