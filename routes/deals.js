// 1. Variables Declaration =================================================================

const express = require('express');
const router = express.Router();

const upload = require("../middlewares/uploadPicture");
const sessionInit = require("../middlewares/sessionInit");

const {prepareDeal, submitDeal, acceptDeal, declinetDeal, rateDeal, dealChat} = require('../controllers/DealController');

// 2. Set Routes ===========================================================================

router.get("/:id", sessionInit, prepareDeal);

router.post("/new", sessionInit, submitDeal);

router.post("/accept/:id", sessionInit, acceptDeal);
router.post("/decline/:id", sessionInit, declinetDeal);

router.post("/rate/:id", sessionInit, rateDeal);

router.get("/chat/:id", sessionInit, dealChat);

module.exports = router;