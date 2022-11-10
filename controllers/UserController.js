const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = (req, res) => {
  if (req.method == "GET") {
    res.render("register");
  } else {
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
            // res.redirect("/");
            res.send("Importação concluida");
          })
          .catch((err) => {
            // res.redirect("/");
            res.send("Importação falhou");
          });
      } else {
        // res.redirect("/admin/users/new");
        res.send("User já existente");
      }
    });
  }
};

exports.login = (req, res) => {
  if (req.method == "GET") {
    res.render("login");
  } else {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ where: { email: email } }).then((user) => {
      if (user != undefined) {
        var correct = bcrypt.compareSync(password, user.password);

        if (correct) {
          req.session.user = {
            id: user.id,
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