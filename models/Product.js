const Sequelize = require("sequelize");
const connection = require("../database/database");
const User = require("../models/User");
const Category = require("../models/Category");

const Product = connection.define('products',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },description: {
        type: Sequelize.STRING,
        allowNull: false
    },picture: {
        type: Sequelize.STRING,
        allowNull: true
     }
})

User.hasMany(Product);
Product.belongsTo(User);

Category.hasMany(Product);
Product.belongsTo(Category);

// Product.sync({force: true});

module.exports = Product