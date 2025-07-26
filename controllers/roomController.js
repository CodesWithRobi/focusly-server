const Room = require("../models/Room.js");

exports.createRoom = async (req, res) => {
  let { name, password } = req.body;
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();
  if(name === "") name = code;
  const room = new Room({ name, code, password, memebers: [] });
  await room.save();
  res.json({ roomCode: code });
};


exports.getRoom = async (req, res) => {
  const { code } = req.body;
  const room = await Room.findOne({ code });

  if (!room) return res.status(404).json({ error: "Room not found" });
  res.json(room);
};

exports.joinRoom = async (req, res) => {
  const { code, password } = req.body;
  const room = await Room.findOne({  $or: [
    { code: code },
    { name: code }
    ],
    password });

  if (!room) return res.status(404).json({ error: "Room not found" });
  res.json(room);
};

exports.updateRoom = async (req, res) => {
  const { name, password } = req.body
  const code = req.params.id
  try {
    const updated = await Room.findOneAndUpdate(
      { code },
      {
      ...(name && { name }),
      ...(password && { password }),
    }, { new: true })

    res.status(200).json(updated)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.publicRooms = async (req, res) => {
  const room = await Room.find({ password: ""});
  res.json(room);
};

exports.addUser = async (req, res) => {
  const { code, user } = req.body;
  const room = await Room.findOneAndUpdate(
        { code },
        {
          $push: {
            members: user
          },
        }
      );
  res.json(room);
};

exports.removeUser = async (req, res) => {
  const { code, user } = req.body;
  const room = await Room.findOneAndUpdate(
        { code },
        {
          $pull: {
            members: user
          },
        }
      );
  res.json(room);
};

