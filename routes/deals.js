const express = require('express');
const router = express.Router();

const upload = require("../middlewares/uploadPicture");
const sessionInit = require("../middlewares/sessionInit");

const {prepareDeal, submitDeal, acceptDeal, declinetDeal} = require('../controllers/DealController');

router.get("/:id", sessionInit, prepareDeal);

router.post("/new", sessionInit, submitDeal);
router.post("/accept/:id", acceptDeal);
router.post("/decline/:id", sessionInit, declinetDeal);

module.exports = router;