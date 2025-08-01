const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  todos: [
    {
      text: {
        type: String,
        required: true,
      },
      completed: {
        type: Boolean,
        default: false,
      },
    }
  ],
  streak: { 
    type: Number, 
    default: 0
   },
   lastActivate: {
    type: Date,
    default: new Date()
   }
});

module.exports = mongoose.model("User", userSchema);
