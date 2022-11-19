const Deal = require("../models/Deal");
const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");
const DealUser = require("../models/DealUser");
const DealProduct = require("../models/DealProducts");

exports.newDeal = (req, res) => {
  User.findByPk(req.params.id).then((userOther) => {
    Product.findAll({
      where: { userId: [req.params.id, sessionUser.id], active: true },
      include: Category,
      order: [["updatedAt", "DESC"]],
    }).then((products) => {
      res.render("deals/new", {
        user: sessionUser,
        otherUser: userOther,
        categories: sessionCategories,
        products: products,
      });
    });
  });
};

exports.newDeal2 = (req, res) => {
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
      Number(req.body.owner) !== sessionUser.id ||
      userProducts.indexOf(Number(req.body.owner)) == -1 ||
      userProducts.indexOf(Number(req.body.other)) == -1
    ) {
      valError = "Validation errors!";
    }
    // ================================== End of Validation Tests ============================================

    if (valError == "No errors found.") {
      // ================================== DB Transaction Creation ============================================

      Deal.create(
        {
          status: "Open",
        },
        {
          returning: true,
        }
      ).then((result) => {
        DealUser.bulkCreate([
          {
            userId: req.body.owner,
            dealId: result.dataValues.id,
            owner: true,
          },
          {
            userId: req.body.other,
            dealId: result.dataValues.id,
            owner: false,
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
            res.send("Importação concluida!");
          });
        });
      });
    } else {
      res.send("Erros de validação!");
    }
  });
};
