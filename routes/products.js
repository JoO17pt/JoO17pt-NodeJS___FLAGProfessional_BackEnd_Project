const express = require('express');
const router = express.Router();

const upload = require("../middlewares/uploadPicture");
const sessionInit = require("../middlewares/sessionInit");

const {newProduct, delProduct, showProducts} = require('../controllers/ProductController');

router.get("/new", sessionInit, newProduct);
router.post("/new", sessionInit, upload.single('picture'), newProduct);

router.get("/delete/:id", sessionInit, delProduct);

router.get("/", sessionInit, showProducts);

module.exports = router;