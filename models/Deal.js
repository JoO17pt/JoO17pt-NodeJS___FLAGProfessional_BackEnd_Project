const Sequelize = require("sequelize");
const connection = require("../database/database");
const DealUser = require("./DealUser");
const User = require("./User");

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

// User.belongsToMany(Deal, { through: DealUser });
// Deal.belongsToMany(User, { through: DealUser });

// Deal.hasMany(DealUser);
// DealUser.belongsTo(Deal);

module.exports = Deal