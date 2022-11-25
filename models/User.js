const Sequelize = require("sequelize");
const connection = require("../database/database");
const Deal = require("./Deal");
const DealUser = require("./DealUser");

const User = connection.define('users',{
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },password: {
        type: Sequelize.STRING,
        allowNull: false
    },name: {
        type: Sequelize.STRING,
        allowNull: false
    }
    ,location: {
        type: Sequelize.STRING,
        allowNull: false
    } 
    ,latitude: {
        type: Sequelize.FLOAT(10, 6) 
    }
    ,longitude: {
        type: Sequelize.FLOAT(10, 6) 
    },
    picture: {
        type: Sequelize.STRING,
        allowNull: true
     }
     ,rate: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
     }
})

User.belongsToMany(Deal, { through: DealUser });
Deal.belongsToMany(User, { through: DealUser });

User.hasMany(DealUser);
DealUser.belongsTo(User);

// connection.sync({force: true});

module.exports = User