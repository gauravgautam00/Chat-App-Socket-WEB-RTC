const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
app.use(express.json());
dotenv.config();
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);
const connectDB = require("./db/connectDB");
app.use(cors());
connectDB();
const userRouter = require("./routers/userRouter");
const getUserRouter = require("./routers/getUserRouter");
const chatRouter = require("./routers/chatRouter");
const chatModel = require("./models/chatModel");
const userModel = require("./models/userModel");

//Routers
app.use("/", userRouter);
app.use("/getUsers", getUserRouter);
app.use("/chat", chatRouter);

//SOCKETS
io.on("connection", (socket) => {
  console.log("user connected");

  // const userId = socket.handshake.auth.userId;
  // console.log(userId);
  // socket.join(userId);

  socket.on("new message", async (messageDetails) => {
    try {
      await chatModel.create({
        sender: messageDetails.sender,
        content: messageDetails.content,
        reciever: messageDetails.reciever,
      });
      console.log("getting new message", messageDetails);

      io.emit("message", {
        sender: messageDetails.sender,
        content: messageDetails.content,
        reciever: messageDetails.reciever,
      });
    } catch (error) {
      console.log("error in adding chat", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

//LISTEN ON PORT
const PORT = process.env.PORT || 8880;
server.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
