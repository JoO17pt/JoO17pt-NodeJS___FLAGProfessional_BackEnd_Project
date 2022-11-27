// 1. Variables Declaration =================================================================

const bcrypt = require("bcryptjs");
const { Sequelize, Op } = require("sequelize");
const geocoder = require("../utils/geocoder");

const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");
const DealUser = require("../models/DealUser");
const DealProduct = require("../models/DealProducts");
const Deal = require("../models/Deal");

// 2. Manage new users creation =============================================================

exports.register = (req, res) => {
  switch (req.method) {
    case "GET":
      res.render("users/register", {
        user: req.session.user,
        categories: sessionCategories,
        errMsg: "",
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
            return { lat: lat, lng: lng };
          };

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
                res.render("users/register", {
                  user: req.session.user,
                  categories: sessionCategories,
                  errMsg: "Error, please try again.",
                });
              });
          });
        } else {
          res.render("users/register", {
            user: req.session.user,
            categories: sessionCategories,
            errMsg: "Email not valid.",
          });
        }
      });
      break;
  }
};

// 2. Manage new user session =============================================================

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

// 3. Manage logouts ======================================================================

exports.logout = (req, res) => {
  req.session.destroy();
  global.sessionUser = null;
  res.redirect("/");
};

// 4. Manage the display of user profiles =================================================

// Get all the user personal information from the DB, plus number of active products and 
// closed deals, and display the view /users/profile

exports.profile = (req, res) => {
  if (isNaN(req.params.id) || req.session.user.id !== Number(req.params.id)) {
    res.redirect("/");
  } else {
    User.findByPk(req.params.id)
      .then((user) => {
        if (user != undefined) {
          Product.findAll({
            where: [{ userId: req.params.id }, { active: true }],
          }).then((products) => {
            DealUser.findAll({
              where: { userId: req.params.id },
            }).then((dealUser) => {
              var dealsUser = [];
              dealUser.forEach((elem) => {
                dealsUser.push(elem.dealId);
              });
              Deal.findAll({
                where: [{ id: dealsUser }, { status: "Closed" }],
              }).then((deals) => {
                res.render("users/profile", {
                  user: user.dataValues,
                  products: products,
                  deals: deals,
                  categories: sessionCategories,
                });
              });
            });
          });
        } else {
          res.redirect("/");
        }
      })
      .catch((erro) => {
        res.redirect("/");
      });
  }
};

// 4. Manage the update of user personal information ======================================

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
          const getCoordinates = async () => {
            const loc = await geocoder.geocode(req.body.location);
            const lat = loc[0].latitude;
            const lng = loc[0].longitude;
            return { lat: lat, lng: lng };
          };

          getCoordinates().then((coordinates) => {
            User.update(
              {
                name: req.body.name,
                location: req.body.location,
                latitude: coordinates.lat,
                longitude: coordinates.lng,
              },
              {
                where: {
                  id: user.id,
                },
              }
            ).then(() => {
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
              setTimeout(function () {
                res.redirect("" + req.session.user.id);
              }, 1000);
            });
          });
        });
      }
      break;
  }
};

// 5. Manage the display of user products ================================================

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
        ["active", "DESC"],
        ["updatedAt", "DESC"],
      ],
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
        ["active", "DESC"],
        ["updatedAt", "DESC"],
      ],
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
        ["active", "DESC"],
        ["updatedAt", "DESC"],
      ],
    }).then((products) => {
      res.render("users/products", {
        products: products,
        user: req.session.user,
        categories: sessionCategories,
      });
    });
  }
};

// 6. Manage the display of user deals ===================================================

exports.dealsReceived = (req, res) => {
  User.findAll({
    where: { id: req.session.user.id },
    include: [
      {
        model: Deal,
        where: { status: "Open", owner: { [Op.notIn]: [req.session.user.id] } },
        include: [
          {
            model: DealProduct,
            include: Product,
          },
          {
            model: User,
          },
        ],
      },
    ],
  }).then((deals) => {
    res.render("users/deals", {
      deals: deals,
      route: req.route.path,
      user: req.session.user,
      categories: sessionCategories,
    });
  });
};

exports.dealsSent = (req, res) => {
  User.findAll({
    where: { id: req.session.user.id },
    include: [
      {
        model: Deal,
        where: { status: "Open", owner: { [Op.in]: [req.session.user.id] } },
        include: [
          {
            model: DealProduct,
            include: Product,
          },
          {
            model: User,
          },
        ],
      },
    ],
  }).then((deals) => {
    res.render("users/deals", {
      deals: deals,
      route: req.route.path,
      user: req.session.user,
      categories: sessionCategories,
    });
  });
};

exports.dealsClosed = (req, res) => {
  User.findAll({
    where: { id: req.session.user.id },
    include: [
      {
        model: Deal,
        where: { status: "Closed" },
        include: [
          {
            model: DealProduct,
            include: Product,
          },
          {
            model: User,
          },
        ],
      },
    ],
  }).then((deals) => {

    // Get the closed deals not yet rated by the user

    var tempDeals = [];
    var notRateDealsArray = [];

    if (deals.length !== 0) {
      deals[0].deals.forEach((deal) => {
        tempDeals.push(Number(deal.dataValues.id));
      });
    }

    DealUser.findAll({
      where: {
        dealId: tempDeals,
        rate: null,
        userId: { [Op.notIn]: [req.session.user.id] },
      },
    }).then((notRatedDeals) => {
      notRatedDeals.forEach((deal) => {
        notRateDealsArray.push(deal.dataValues.dealId);
      });
      res.render("users/deals", {
        deals: deals,
        notRateDeals: notRateDealsArray,
        route: req.route.path,
        user: req.session.user,
        categories: sessionCategories,
      });
    });
  });
};

exports.dealsCanceled = (req, res) => {
  User.findAll({
    where: { id: req.session.user.id },
    include: [
      {
        model: Deal,
        where: { status: "Canceled" },
        include: [
          {
            model: DealProduct,
            include: Product,
          },
          {
            model: User,
          },
        ],
      },
    ],
  }).then((deals) => {
    res.render("users/deals", {
      deals: deals,
      route: req.route.path,
      user: req.session.user,
      categories: sessionCategories,
    });
  });
};
