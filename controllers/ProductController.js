const express = require("express");
const { Sequelize, Op } = require("sequelize");
const Product = require("../models/Product");
const Category = require("../models/Category");
const DealProduct = require("../models/DealProducts");
const Deal = require("../models/Deal");
const User = require("../models/User");

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
  const haversine = `(
      6371 * acos(
          cos(radians(${req.query.lat}))
          * cos(radians(latitude))
          * cos(radians(longitude) - radians(${req.query.lng}))
          + sin(radians(${req.query.lat})) * sin(radians(latitude))
      )
    )`;

  // NONE
  if (
    req.query.search === undefined &&
    req.query.category === undefined &&
    (req.query.lat === undefined ||
      req.query.lng === undefined ||
      req.query.dst === undefined)
  ) {
    User.findAll({
      include: {
        model: Product,
        include: Category,
        where: { active: true },
      },
    }).then((products) => {
      res.render("products/products", {
        products: products,
        categories: sessionCategories,
        user: req.session.user,
      });
    });

    // CATEGORY
  } else if (
    req.query.search === undefined &&
    (req.query.lat === undefined ||
      req.query.lng === undefined ||
      req.query.dst === undefined)
  ) {
    User.findAll({
      include: {
        model: Product,
        include: {
          model: Category,
          where: { id: req.query.category },
        },
        where: { active: true },
      },
    }).then((products) => {
      res.render("products/products", {
        products: products,
        categories: sessionCategories,
        user: req.session.user,
      });
    });

    // SEARCH
  } else if (
    req.query.category === undefined &&
    (req.query.lat === undefined ||
      req.query.lng === undefined ||
      req.query.dst === undefined)
  ) {
    User.findAll({
      include: {
        model: Product,
        include: {
          model: Category,
        },
        where: [
          { active: true },
          { title: { [Op.like]: "%" + req.query.search + "%" } },
        ],
      },
    }).then((products) => {
      res.render("products/products", {
        products: products,
        categories: sessionCategories,
        user: req.session.user,
      });
    });

    // DISTANCE
  } else if (
    req.query.category === undefined &&
    req.query.search === undefined
  ) {
    User.findAll({
      include: {
        model: Product,
        include: {
          model: Category,
        },
        where: [{ active: true }],
      },
      attributes: {
        include: [[Sequelize.literal(haversine), "distance"]],
      },
      having: Sequelize.literal(`distance <= ${req.query.dst}`),
    }).then((products) => {
      res.render("products/products", {
        products: products,
        categories: sessionCategories,
        user: req.session.user,
      });
    });

    // CATEGORY & SEARCH
  } else if (
    req.query.lat === undefined ||
    req.query.lng === undefined ||
    req.query.dst === undefined
  ) {
    User.findAll({
      include: {
        model: Product,
        include: {
          model: Category,
          where: { id: req.query.category },
        },
        where: [
          { active: true },
          { title: { [Op.like]: "%" + req.query.search + "%" } },
        ],
      },
    }).then((products) => {
      res.render("products/products", {
        products: products,
        categories: sessionCategories,
        user: req.session.user,
      });
    });

    // CATEGORY & DISTANCE
  } else if (req.query.search === undefined) {
    User.findAll({
      include: {
        model: Product,
        include: {
          model: Category,
          where: { id: req.query.category },
        },
        where: [{ active: true }],
      },
      attributes: {
        include: [[Sequelize.literal(haversine), "distance"]],
      },
      having: Sequelize.literal(`distance <= ${req.query.dst}`),
    }).then((products) => {
      res.render("products/products", {
        products: products,
        categories: sessionCategories,
        user: req.session.user,
      });
    });

    // SEARCH & DISTANCE
  } else if (req.query.category === undefined) {
    User.findAll({
      include: {
        model: Product,
        include: {
          model: Category,
        },
        where: [
          { active: true },
          { title: { [Op.like]: "%" + req.query.search + "%" } },
        ],
      },
      attributes: {
        include: [[Sequelize.literal(haversine), "distance"]],
      },
      having: Sequelize.literal(`distance <= ${req.query.dst}`),
    }).then((products) => {
      res.render("products/products", {
        products: products,
        categories: sessionCategories,
        user: req.session.user,
      });
    });

    // SEARCH & DISTANCE & CATEGORY
  } else if (
    req.query.search !== undefined &&
    req.query.category !== undefined &&
    req.query.lat !== undefined &&
    req.query.lng !== undefined &&
    req.query.dst !== undefined
  ) {
    User.findAll({
      include: {
        model: Product,
        include: {
          model: Category,
          where: { id: req.query.category },
        },
        where: [
          { active: true },
          { title: { [Op.like]: "%" + req.query.search + "%" } },
        ],
      },
      attributes: {
        include: [[Sequelize.literal(haversine), "distance"]],
      },
      having: Sequelize.literal(`distance <= ${req.query.dst}`),
    }).then((products) => {
      res.render("products/products", {
        products: products,
        categories: sessionCategories,
        user: req.session.user,
      });
    });
  } else {
    User.findAll({
      include: {
        model: Product,
        include: Category,
        where: { active: true },
      },
    }).then((products) => {
      res.render("products/products", {
        products: products,
        categories: sessionCategories,
        user: req.session.user,
      });
    });
  }
};
