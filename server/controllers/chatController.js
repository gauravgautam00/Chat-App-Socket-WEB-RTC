const chatModel = require("../models/chatModel");

const addChat = async (req, res) => {
  const { sender, content, reciever } = req.body;
  try {
    const chat = new chatModel({
      sender,
      content,
      reciever,
      customCreatedAt: new Date(),
    });
    await chat.save();
    const chatData = await chatModel
      .find({
        sender,
        reciever,
      })
      .populate("sender")
      .populate("reciever");

    res.status(200).send(chatData);
  } catch (error) {
    console.log(`error in adding chat ${error}`);
  }
};

const getChat = async (req, res) => {
  const { firstUser, secondUser } = req.body;
  // console.log(firstUser, secondUser);
  const allChats = await chatModel
    .find({
      $or: [
        {
          sender: firstUser,
          reciever: secondUser,
        },
        {
          sender: secondUser,
          reciever: firstUser,
        },
      ],
    })
    .sort({
      createdAt: 1,
    });
  console.log(allChats);
  res.send(allChats);
};

module.exports = { addChat, getChat };
