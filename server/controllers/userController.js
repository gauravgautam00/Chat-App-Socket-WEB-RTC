const userModel = require("../models/userModel");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      if (existingUser.password !== password) {
        res.status(400).send("password is not valid");
      } else {
        const newUser = await userModel.findOne({
          email,
        });
        res.status(200).json({
          message: "successfully logged in ",
          user: newUser,
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
    } else {
      const newUser = await userModel.create({
        name,
        email,
        password,
      });
      res.status(200).json({
        message: "successfully sign up",
        user: newUser,
      });
    }
  } catch (error) {
    console.log("error in adding the user ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { loginController, signupController };
