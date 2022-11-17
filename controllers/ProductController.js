const express = require("express");
const Product = require("../models/Product");
const Category = require("../models/Category");

exports.newProduct = (req, res) => {
  switch (req.method) {
    case "GET":
      Category.findAll().then((categories) => {
        categories.forEach((element) => {});
        res.render("products/new", {
          user: req.session.user.id,
          categories: categories,
        });
      });
      break;
    case "POST":
      if (Number(req.body.user) !== req.session.user.id) {
        res.redirect("/");
      } else {
        var picture = "";
        req.file == undefined
          ? (picture = null)
          : (picture = req.file.filename);

        Product.create({
          title: req.body.title,
          description: req.body.description,
          picture: picture,
          userId: req.body.user,
          categoryId: req.body.category,
        })
          .then(() => {
            res.send("Importação concluida");
          })
          .catch((err) => {
            res.send("Importação falhou");
          });
        break;
      }
  }
};

exports.delProduct = (req, res) => {
  Product.findByPk(req.params.id)
    .then((product) => {
      if (product.userId !== req.session.user.id || product === undefined) {
        res.redirect("/");
      } else {
        Product.destroy({ where: { id: product.id } });
        res.send("Remoção concluída");
      }
    })
    .catch((erro) => {
      res.redirect("/");
    });
};

exports.showProducts = (req, res) => {
  if (req.query.user === undefined && req.query.category === undefined) {
    Product.findAll().then((products) => {
      res.render("products/products", { products: products });
    });
  } else if (req.query.user === undefined) {
    Product.findAll({ where: { categoryId: req.query.category } }).then((products) => {
      res.render("products/products", { products: products });
    });
  } else if (req.query.category === undefined) {
    Product.findAll({ where: { userId: req.query.user } }).then((products) => {
      res.render("products/products", { products: products });
    });
  } else {
    Product.findAll({ where: { userId: req.query.user, categoryId: req.query.category } }).then((products) => {
      res.render("products/products", { products: products });
    });
  }
};