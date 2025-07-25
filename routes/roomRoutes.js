const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
const { createRoom, joinRoom, publicRooms } = require("../controllers/roomController");

router.post("/", createRoom);

router.post("/join", joinRoom);

router.get("/publicrooms", publicRooms)

module.exports = router;
