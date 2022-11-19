const Sequelize = require("sequelize");
const connection = require("../database/database");
const Deal = require("./Deal");
const Product = require("../models/Product");

const DealProduct = connection.define('dealProducts',{
})

Deal.hasMany(DealProduct);
DealProduct.belongsTo(Deal);

Product.hasMany(DealProduct);
DealProduct.belongsTo(Product);

// DealProduct.sync({force: true});

module.exports = DealProduct