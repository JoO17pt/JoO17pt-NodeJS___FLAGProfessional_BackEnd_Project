// 1. Variables Declaration =================================================================

const express = require('express');
const router = express.Router();

const upload = require("../middlewares/uploadPicture");
const sessionInit = require("../middlewares/sessionInit");

const {register, login, logout, profile, update, products, dealsReceived, dealsSent, dealsClosed, dealsCanceled} = require('../controllers/UserController');

// 2. Set Routes ===========================================================================

router.get("/register", register);
router.post("/register", upload.single('picture'), register)

router.get("/login", login);
router.post("/login", login);

router.get("/logout", logout);

router.get("/:id", sessionInit, profile);

router.get("/update/:id", sessionInit, update);
router.post("/update/", sessionInit, upload.single('picture'), update);

router.get("/:id/products", sessionInit, products);

router.get("/deals/received", sessionInit, dealsReceived);
router.get("/deals/sent", sessionInit, dealsSent);
router.get("/deals/closed", sessionInit, dealsClosed);
router.get("/deals/canceled", sessionInit, dealsCanceled);

module.exports = router;