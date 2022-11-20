const express = require("express");
const Product = require("../models/Product");
const Category = require("../models/Category");
const DealProduct = require("../models/DealProducts");
const Deal = require("../models/Deal");

exports.newProduct = (req, res) => {
  switch (req.method) {
    case "GET":
      res.render("products/new", {
        user: req.session.user,
        categories: sessionCategories,
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
            res.redirect("/user/" + req.session.user.id + "/products");
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
        Product.update({ active: false }, { where: { id: product.id } }).then(
          () => {
            DealProduct.findAll({
              where: { productId: req.params.id },
            }).then((deals) => {
              var dealsOthers = [];
              deals.forEach((deal) => {
                dealsOthers.push(deal.dataValues.dealId);
              });
              Deal.update(
                { status: "Canceled" },
                {
                  where: {
                    id: dealsOthers,
                    status: "Open",
                  },
                }
              ).then(() => {
                res.send("Remoção concluída");
              });
            });
          }
        );
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
    Product.findAll({ where: { categoryId: req.query.category } }).then(
      (products) => {
        res.render("products/products", { products: products });
      }
    );
  } else if (req.query.category === undefined) {
    Product.findAll({ where: { userId: req.query.user } }).then((products) => {
      res.render("products/products", { products: products });
    });
  } else {
    Product.findAll({
      where: { userId: req.query.user, categoryId: req.query.category },
    }).then((products) => {
      res.render("products/products", { products: products });
    });
  }
};
