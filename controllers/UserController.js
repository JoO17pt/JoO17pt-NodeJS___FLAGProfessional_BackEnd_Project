const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Product = require("../models/Product");
const Category = require("../models/Category");

exports.register = (req, res) => {
  switch (req.method) {
    case "GET":
      res.render("users/register", {
        user: sessionUser,
        categories: sessionCategories,
      });
      break;
    case "POST":
      User.findOne({ where: { email: req.body.email } }).then((user) => {
        if (user == undefined) {
          var salt = bcrypt.genSaltSync(10);
          var hash = bcrypt.hashSync(req.body.password, salt);

          var picture = "";
          req.file == undefined
            ? (picture = null)
            : (picture = req.file.filename);

          User.create({
            email: req.body.email,
            password: hash,
            name: req.body.name,
            location: req.body.location,
            picture: picture,
          })
            .then(() => {
              res.render("users/login", {
                user: sessionUser,
                categories: sessionCategories,
              });
            })
            .catch((err) => {
              res.send("Importação falhou");
            });
        } else {
          res.send("User já existente");
        }
      });
      break;
  }
};

exports.login = (req, res) => {
  if (req.method == "GET") {
    res.render("users/login", {
      user: sessionUser,
      categories: sessionCategories,
    });
  } else {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ where: { email: email } }).then((user) => {
      if (user != undefined) {
        var correct = bcrypt.compareSync(password, user.password);

        if (correct) {
          sessionUser = {
            id: user.id,
            name: user.name,
            email: user.email,
          };

          req.session.user = sessionUser;

          res.redirect("/");
        } else {
          res.redirect("/user/login");
        }
      } else {
        res.redirect("/user/login");
      }
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  global.sessionUser = null;
  res.redirect("/");
};

exports.profile = (req, res) => {
  if (isNaN(req.params.id) || req.session.user.id !== Number(req.params.id)) {
    res.redirect("/");
  }

  User.findByPk(req.params.id)
    .then((user) => {
      if (user != undefined) {
        res.render("users/profile", {
          user: user.dataValues,
          categories: sessionCategories,
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((erro) => {
      res.redirect("/");
    });
};

exports.update = (req, res) => {
  switch (req.method) {
    case "GET":
      if (req.session.user.id !== Number(req.params.id)) {
        res.redirect("/");
      } else {
        User.findOne({ where: { id: req.params.id } }).then((user) => {
          res.render("users/update", {
            user: user,
            categories: sessionCategories,
          });
        });
      }
      break;

    case "POST":
      if (req.body.email !== req.session.user.email) {
        res.redirect("/");
      } else {
        User.findOne({ where: { email: req.body.email } }).then((user) => {
          User.update(
            { name: req.body.name, location: req.body.location },
            {
              where: {
                id: user.id,
              },
            }
          );
          if (req.body.password !== "") {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(req.body.password, salt);
            User.update(
              { password: hash },
              {
                where: {
                  id: user.id,
                },
              }
            );
          }
          if (req.file !== undefined) {
            User.update(
              { picture: req.file.filename },
              {
                where: {
                  id: user.id,
                },
              }
            );
          }
          res.redirect("" + req.session.user.id);
        });
      }
      break;
  }
};

exports.products = (req, res) => {
  if (req.session.user.id !== Number(req.params.id)) {
    res.redirect("/");
  } else if (
    req.query.category !== undefined &&
    req.query.category !== null &&
    (req.query.active == undefined || req.query.active == null)
  ) {
    Product.findAll({
      where: { userId: req.params.id, categoryId: req.query.category },
      include: Category,
      order: [
        ['active', 'DESC'],
        ['updatedAt', 'DESC']
      ]
    }).then((products) => {
      res.render("users/products", {
        products: products,
        user: sessionUser,
        categories: sessionCategories,
      });
    });
  } else if (
    req.query.active !== undefined &&
    req.query.active !== null &&
    (req.query.category == undefined || req.query.category == null)
  ) {
    Product.findAll({
      where: { userId: req.params.id, active: req.query.active },
      include: Category,
      order: [
        ['active', 'DESC'],
        ['updatedAt', 'DESC']
      ]
    }).then((products) => {
      res.render("users/products", {
        products: products,
        user: sessionUser,
        categories: sessionCategories,
      });
    });
  } else {
    Product.findAll({
      where: { userId: req.params.id },
      include: Category,
      order: [
        ['active', 'DESC'],
        ['updatedAt', 'DESC']
      ]
    }).then((products) => {
      res.render("users/products", {
        products: products,
        user: sessionUser,
        categories: sessionCategories,
      });
    });
  }
};
