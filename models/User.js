const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  totalMinutes: { type: Number, default: 0 },
  rooms: [String],
  streak: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", userSchema);
