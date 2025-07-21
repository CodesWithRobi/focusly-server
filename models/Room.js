const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: String,
  code: String,
  isPrivate: Boolean,
  members: [String],
  chat: [
    {
      user: String,
      msg: String,
      time: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Room", roomSchema);