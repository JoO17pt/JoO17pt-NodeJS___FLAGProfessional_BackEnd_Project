const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = (req, res) => {
  switch (req.method) {
    case "GET":
      res.render("users/register");
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
              res.render("users/login");
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
    res.render("users/login");
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
  res.redirect("/");
};

exports.profile = (req, res) => {
  if (isNaN(req.params.id) || req.session.user.id !== Number(req.params.id)) {
    res.redirect("/");
  }

  User.findByPk(req.params.id)
    .then((user) => {
      if (user != undefined) {
        res.render("users/profile", { user: user.dataValues });
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
          res.render("users/update", { user: user });
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
          res.redirect(""+req.session.user.id);
        });
      }
      break;
  }
};
