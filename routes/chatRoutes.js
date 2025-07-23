const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

router.get("/:roomId", async (req, res) => {
  const { roomId } = req.params;
  try {
    const messages = await Room.findOne({ code: roomId })
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

module.exports = router;
