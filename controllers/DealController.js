const Deal = require("../models/Deal");
const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");
const DealUser = require("../models/DealUser");
const DealProduct = require("../models/DealProducts");
const { Sequelize, Op } = require("sequelize");

exports.prepareDeal = (req, res) => {
  if (req.params.id == req.session.user.id) {
    res.redirect("/product");
  } else {
    User.findByPk(req.params.id).then((userOther) => {
      Product.findAll({
        where: { userId: [req.params.id, req.session.user.id], active: true },
        include: Category,
        order: [["updatedAt", "DESC"]],
      }).then((products) => {
        res.render("deals/new", {
          user: req.session.user,
          otherUser: userOther,
          categories: sessionCategories,
          products: products,
        });
      });
    });
  }
};

exports.submitDeal = (req, res) => {
  let productsArray = req.body.products.split(",");

  productsArray.forEach((element, index) => {
    productsArray[index] = parseInt(element);
  });

  // ================================== Validation Tests ============================================
  // Check if the products are still available, and if belong to one of the two transaction parties

  Product.findAll({
    where: { id: productsArray },
  }).then((products) => {
    var valError = "";
    var userProducts = [];
    products.forEach((product) => {
      if (
        product.active == false ||
        (product.userId !== Number(req.body.owner) &&
          product.userId !== Number(req.body.other))
      ) {
        valError = "Validation errors!";
      } else {
        valError = "No errors found.";
      }
      userProducts.push(product.userId);
    });

    // Check if the owner of the transaction has open session, and if each transaction party has at least one product

    if (
      Number(req.body.owner) !== req.session.user.id ||
      userProducts.indexOf(Number(req.body.owner)) == -1 ||
      userProducts.indexOf(Number(req.body.other)) == -1
    ) {
      valError = "Validation errors!";
    }

    if (valError == "No errors found.") {
      // ================================== End of Validation Tests ============================================
      // ================================== DB Transaction Creation ============================================

      Deal.create(
        {
          status: "Open",
          owner: req.body.owner,
        },
        {
          returning: true,
        }
      ).then((result) => {
        DealUser.bulkCreate([
          {
            userId: req.body.owner,
            dealId: result.dataValues.id,
          },
          {
            userId: req.body.other,
            dealId: result.dataValues.id,
          },
        ]).then(() => {
          const recordProducts = async () => {
            productsArray.forEach((dealProduct) => {
              DealProduct.create({
                dealId: result.dataValues.id,
                productId: dealProduct,
              });
            });
          };
          recordProducts().then(() => {
            res.redirect("/user/deals/sent");
          });
        });
      });
    } else {
      res.send("Erros de validação!");
    }
  });
};

exports.acceptDeal = (req, res) => {
  // ================================== Validation Tests ============================================
  // Check if the deal is still open

  Deal.findByPk(req.params.id).then((deal) => {
    if (deal.dataValues.status !== "Open") {
      res.send("Deal is unavailable.");
    } else {
      // Check if the user requesting the acceptance is part of the deal and if it's not the owner

      DealUser.findAll({
        where: { dealId: req.params.id },
      }).then((DealUser) => {
        var dealUser = [];
        DealUser.forEach((elem) => {
          dealUser.push(elem.dataValues.userId);
        });
        if (
          dealUser.indexOf(req.session.user.id) === -1 ||
          deal.dataValues.owner === req.session.user.id
        ) {
          res.send("User is not part of the deal / is the owner of the deal.");

          // ================================== End of Validation Tests ============================================
          // ========================================= DB Update ===================================================
          // Change the deal status to "Closed"
        } else {
          Deal.update(
            { status: "Closed" },
            {
              where: {
                id: req.params.id,
              },
            }
          ).then(() => {
            // Change the deal products to not active

            DealProduct.findAll({
              where: { dealId: req.params.id },
            }).then((products) => {
              var dealProducts = [];
              products.forEach((product) => {
                dealProducts.push(product.dataValues.productId);
              });
              Product.update(
                { active: false },
                {
                  where: {
                    id: dealProducts,
                  },
                }
              ).then(() => {
                // Change the deal status to "Canceled", to the other deals with the same products

                DealProduct.findAll({
                  where: { productId: dealProducts },
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
                    res.redirect("/user/deals/closed");
                  });
                });
              });
            });
          });
        }
      });
    }
  });
};

exports.declinetDeal = (req, res) => {
  // ================================== Validation Tests ============================================
  // Check if the deal is still open

  Deal.findByPk(req.params.id).then((deal) => {
    if (deal.dataValues.status !== "Open") {
      res.send("Deal is unavailable.");
    } else {
      // Check if the user requesting the acceptance is part of the deal

      DealUser.findAll({
        where: { dealId: req.params.id },
      }).then((DealUser) => {
        var dealUser = [];
        DealUser.forEach((elem) => {
          dealUser.push(elem.dataValues.userId);
        });
        if (dealUser.indexOf(req.session.user.id) === -1) {
          res.send("User is not part of the deal.");

          // ================================== End of Validation Tests ============================================
          // ========================================= DB Update ===================================================
          // Change the deal status to "Closed"
        } else {
          Deal.update(
            { status: "Canceled" },
            {
              where: {
                id: req.params.id,
              },
            }
          ).then(() => {
            res.redirect("/user/deals/canceled");
          });
        }
      });
    }
  });
};

exports.rateDeal = (req, res) => {
  // ================================== Validation Tests ============================================
  // Check if the deal is closed, if the session user is part of the deal, if the rate is a valid number, and if it wasn't yet rated

  DealUser.findAll({
    where: { dealId: req.params.id },
  }).then((dealUserElem) => {
    var dealUserArray = [];
    var possibleRates = [1, 2, 3, 4, 5];
    var userRate = "";
    var otherUser = "";

    dealUserElem[0].dataValues.userId == req.session.user.id
      ? (userRate = dealUserElem[1].dataValues.rate)
      : (userRate = dealUserElem[0].dataValues.rate);

    dealUserElem[0].dataValues.userId == req.session.user.id
      ? (otherUser = dealUserElem[1].dataValues.userId)
      : (otherUser = dealUserElem[0].dataValues.userId);

    dealUserElem.forEach((deal) => {
      dealUserArray.push(deal.dataValues.userId);
    });
    Deal.findByPk(req.params.id).then((deal) => {
      if (
        deal.status !== "Closed" ||
        dealUserArray.indexOf(req.session.user.id) == -1 ||
        possibleRates.indexOf(Number(req.body.rate)) == -1 ||
        userRate !== null
      ) {
        res.redirect("/user/deals/closed");
      } else {
        // ================================== End of Validation Tests ============================================
        // ========================================= DB Update ===================================================
        DealUser.update(
          { rate: Number(req.body.rate) },
          {
            where: {
              userId: { [Op.notIn]: [req.session.user.id] },
              dealId: req.params.id,
            },
          }
        ).then(() => {
          DealUser.findAll({
            where: { userId: otherUser },
            attributes: [
              [
                Sequelize.fn(
                  "AVG",
                  Sequelize.cast(Sequelize.col("rate"), "integer")
                ),
                "avgRate",
              ],
            ],
          }).then((result) => {
            User.update(
              { rate: result[0].dataValues.avgRate },
              { where: { id: otherUser } }
            ).then(() => {
              res.redirect("/user/deals/closed");
            });
          });
        });
      }
    });
  });
};
