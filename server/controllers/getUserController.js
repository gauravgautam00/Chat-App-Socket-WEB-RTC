const userModel = require("../models/userModel");

const getUserController = async (req, res) => {
  try {
    const allUsers = await userModel.find();
    res.status(200).send(allUsers);
  } catch (error) {
    console.log("error in retrieving all users", error.message);
  }
};
module.exports = getUserController;
