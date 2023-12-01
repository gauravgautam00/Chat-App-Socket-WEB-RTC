const express = require("express");
const router = express.Router();
const {
  loginController,
  signupController,
} = require("../controllers/userController");

router.get("/", (req, res) => {
  res.send(success);
});
router.post("/login", loginController);
router.post("/signup", signupController);

module.exports = router;
