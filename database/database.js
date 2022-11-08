const Sequelize = require('sequelize');
require("dotenv").config({path: './config/config.env'});

const connection = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS,{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;