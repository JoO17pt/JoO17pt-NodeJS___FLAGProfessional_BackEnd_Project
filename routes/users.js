const express = require('express');
const router = express.Router();

const upload = require("../middlewares/uploadPicture");
const {register, login, logout} = require('../controllers/UserController');

router.get("/register", register);
router.post("/register", upload.single('picture'), register)

router.get("/login", login);
router.post("/login", login);

router.get("/logout", logout);

module.exports = router;