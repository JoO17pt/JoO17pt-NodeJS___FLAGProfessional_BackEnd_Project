const Sequelize = require("sequelize");
const connection = require("../database/database");

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
    ,picture: {
        type: Sequelize.STRING,
        allowNull: true
     }
})

// User.sync({force: true});

module.exports = User