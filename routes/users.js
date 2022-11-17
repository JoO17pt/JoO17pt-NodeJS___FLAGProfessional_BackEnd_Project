const express = require('express');
const router = express.Router();

const upload = require("../middlewares/uploadPicture");
const sessionInit = require("../middlewares/sessionInit");

const {register, login, logout, profile, update, products} = require('../controllers/UserController');

router.get("/register", register);
router.post("/register", upload.single('picture'), register)

router.get("/update/:id", sessionInit, update);
router.post("/update/", sessionInit, upload.single('picture'), update);

router.get("/login", login);
router.post("/login", login);

router.get("/logout", logout);

router.get("/:id", sessionInit, profile);

router.get("/:id/products", sessionInit, products);

module.exports = router;