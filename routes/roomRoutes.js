const express = require("express")
const router = express.Router()
const Room = require("../models/Room")

router.post("/", async (req, res) => {
  const { name, isPrivate } = req.body
  const code = Math.random().toString(36).substring(2, 8).toUpperCase()

  const room = new Room({ name, isPrivate, code, memebers: [] })
  await room.save()
  res.json({ roomCode: code })
})

router.get("/:code", async (req, res) => {
  const { code } = req.params
  const room = await Room.findOne({ code })

  if (!room) return res.status(404).json({ error: "Room not found" })
  res.json(room)
})

module.exports = router
