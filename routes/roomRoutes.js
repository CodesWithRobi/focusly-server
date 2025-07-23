const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
const { createRoom, joinRoom } = require("../controllers/roomController");

router.post("/", createRoom);

router.get("/:code", joinRoom);

module.exports = router;
