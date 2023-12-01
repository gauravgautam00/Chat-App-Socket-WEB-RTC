const express = require("express");
const router = express.Router();
const getUserController = require("../controllers/getUserController");

router.get("/", getUserController);
module.exports = router;
