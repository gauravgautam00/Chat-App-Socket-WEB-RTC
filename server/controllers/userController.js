const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      const passwordMatched = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!passwordMatched) {
        res.status(401).send("password is not valid");
      } else {
        const jwtToken = jwt.sign(
          {
            userId: existingUser._id,
          },
          process.env.SECRET_KEY
        );
        res.status(200).json({
          message: "successfully logged in ",
          token: jwtToken,
          user: existingUser,
        });
      }
    } else {
      res.status(400).json({ message: "User does not exist" });
    }
  } catch (error) {
    console.log("error in adding the user ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const signupController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      res.status(400).send("User already exist");
      return;
    } else {
      const encryptedPassword = await bcrypt.hash(password, 2);
      const newUser = await userModel.create({
        name,
        email,
        password: encryptedPassword,
      });
      const jwtToken = jwt.sign(
        {
          userId: newUser._id,
        },
        process.env.SECRET_KEY
      );

      res.status(200).json({
        message: "successfully sign up",
        token: jwtToken,
        user: newUser,
      });
    }
  } catch (error) {
    console.log("error in adding the user ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { loginController, signupController };
