const express = require('express');
const router = express.Router();

const upload = require("../middlewares/uploadPicture");
const sessionInit = require("../middlewares/sessionInit");

const {teste, newDeal, newDeal2} = require('../controllers/DealController');

router.post("/new", newDeal2);
router.get("/:id", sessionInit, newDeal);

module.exports = router;