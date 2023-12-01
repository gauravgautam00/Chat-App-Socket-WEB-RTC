const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(uri);

    console.log(`MongoDB connected ${connect.connection.host}`);
  } catch (err) {
    console.log("error in connection with mongodb", err.message);
  }
};
module.exports = connectDB;
