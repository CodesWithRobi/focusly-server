const Room = require("../models/Room.js");

exports.createRoom = async (req, res) => {
  const { name, isPrivate } = req.body;
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  const room = new Room({ name, isPrivate, code, memebers: [] });
  await room.save();
  res.json({ roomCode: code });
};

exports.joinRoom = async (req, res) => {
  const { code } = req.params;
  const room = await Room.findOne({ code });

  if (!room) return res.status(404).json({ error: "Room not found" });
  res.json(room);
};
