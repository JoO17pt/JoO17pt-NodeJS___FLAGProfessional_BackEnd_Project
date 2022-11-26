const Sequelize = require("sequelize");
const connection = require("../database/database");
const User = require("./User");
const Deal = require("./Deal");

const MessageUser = connection.define("messageUsers", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
});

// DealUser.sync({force: true});

// User.hasMany(DealUser);
// DealUser.belongsTo(User);

// Deal.hasMany(DealUser);
// DealUser.belongsTo(Deal);

module.exports = MessageUser;
