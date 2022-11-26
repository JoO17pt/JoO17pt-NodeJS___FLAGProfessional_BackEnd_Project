const Sequelize = require("sequelize");
const connection = require("../database/database");
const DealUser = require("./DealUser");
const User = require("./User");

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

// User.belongsToMany(Deal, { through: DealUser });
// Deal.belongsToMany(User, { through: DealUser });

// Deal.hasMany(DealUser);
// DealUser.belongsTo(Deal);

module.exports = Message