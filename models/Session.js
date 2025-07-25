const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  username: String,
  type: String, // "pomodoro", "video", etc.
  duration: Number, // in minutes
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Session", sessionSchema);

// router.post("/log-session", async (req, res) => {
//   const { username, type, duration } = req.body;

//   try {
//     const session = await Session.create({ username, type, duration });
//     res.json({ message: "Session logged", session });
//   } catch (err) {
//     res.status(500).json({ error: "Error logging session" });
//   }
// });
