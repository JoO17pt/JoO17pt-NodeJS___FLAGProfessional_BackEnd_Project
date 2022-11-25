const express = require("express");
const bcrypt = require("bcryptjs");
const { Sequelize, Op } = require('sequelize');
const geocoder = require("../utils/geocoder");

const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");
const DealUser = require("../models/DealUser");
const DealProduct = require("../models/DealProducts");
const Deal = require("../models/Deal");

exports.register = (req, res) => {  
  switch (req.method) {
    case "GET":
      res.render("users/register", {
        user: req.session.user,
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

          const getCoordinates = async () => {
            const loc = await geocoder.geocode(req.body.location);
            const lat = loc[0].latitude;
            const lng = loc[0].longitude;
            return ({lat: lat, lng: lng});
          }

          getCoordinates().then((coordinates) => {

            User.create({
              email: req.body.email,
              password: hash,
              name: req.body.name,
              location: req.body.location,
              latitude: coordinates.lat,
              longitude: coordinates.lng,
              picture: picture,
            })
              .then(() => {
                res.render("users/login", {
                  user: req.session.user,
                  categories: sessionCategories,
                });
              })
              .catch((err) => {
                res.send("Importação falhou");
              });
          })
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
      user: req.session.user,
      categories: sessionCategories,
    });
  } else {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ where: { email: email } }).then((user) => {
      if (user != undefined) {
        var correct = bcrypt.compareSync(password, user.password);

        if (correct) {
          req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
          };
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
        user: req.session.user,
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
        user: req.session.user,
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
        user: req.session.user,
        categories: sessionCategories,
      });
    });
  }
};

exports.dealsReceived = (req, res) => {
  User.findAll({
    where: { id: req.session.user.id },
    include: [
      {
        model: Deal,
        where: {status: 'Open', owner: { [Op.notIn]: [req.session.user.id] }},
        include: [
          {
            model: DealProduct,
            include : Product
          },
          {
            model: User
          }
        ]
      },
    ]
  }).then((deals) => {
    res.render("users/deals", {
      deals: deals,
      route: req.route.path,
      user: req.session.user,
      categories: sessionCategories,
    });
  })
}

exports.dealsSent = (req, res) => {
  User.findAll({
    where: { id: req.session.user.id },
    include: [
      {
        model: Deal,
        where: {status: 'Open', owner: { [Op.in]: [req.session.user.id] }},
        include: [
          {
            model: DealProduct,
            include : Product
          },
          {
            model: User
          }
        ]
      },
    ]
  }).then((deals) => {
    res.render("users/deals", {
      deals: deals,
      route: req.route.path,
      user: req.session.user,
      categories: sessionCategories,
    });
  })
}

exports.dealsClosed = (req, res) => {
  User.findAll({
    where: { id: req.session.user.id },
    include: [
      {
        model: Deal,
        where: {status: 'Closed'},
        include: [
          {
            model: DealProduct,
            include : Product
          },
          {
            model: User
          },
        ]
      },
    ]
  }).then((deals) => {
    
    var tempDeals = [];
    var notRateDealsArray = [];

    deals[0].deals.forEach(deal=> {
      tempDeals.push(Number(deal.dataValues.id));
    });

    DealUser.findAll({
      where: {dealId: tempDeals, rate: null, userId: { [Op.notIn]: [req.session.user.id] },}
    }).then((notRatedDeals) => {
      notRatedDeals.forEach(deal => {
        notRateDealsArray.push(deal.dataValues.dealId);
      })
      res.render("users/deals", {
        deals: deals,
        notRateDeals: notRateDealsArray,
        route: req.route.path,
        user: req.session.user,
        categories: sessionCategories,
      });
    });
  })
}
exports.dealsCanceled = (req, res) => {
  User.findAll({
    where: { id: req.session.user.id },
    include: [
      {
        model: Deal,
        where: {status: 'Canceled'},
        include: [
          {
            model: DealProduct,
            include : Product
          },
          {
            model: User
          }
        ]
      },
    ]
  }).then((deals) => {
    res.render("users/deals", {
      deals: deals,
      route: req.route.path,
      user: req.session.user,
      categories: sessionCategories,
    });
  })
}