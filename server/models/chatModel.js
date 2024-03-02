const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customCreatedAt: {
      type: Date,
      default: Date.now, // Set a default value to the current date and time when the document is created
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
