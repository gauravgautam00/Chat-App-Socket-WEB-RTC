const express = require("express");
const router = express.Router();
const { addChat, getChat } = require("../controllers/chatController");

router.post("/addChat", addChat);
router.post("/getChat", getChat);

module.exports = router;
