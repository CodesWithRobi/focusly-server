const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
const { createRoom, joinRoom, publicRooms, addUser, removeUser, getRoom, updateRoom } = require("../controllers/roomController");

router.post("/", createRoom);

router.post("/room", getRoom)

router.put("/:id", updateRoom)

router.post("/join", joinRoom);

router.get("/publicrooms", publicRooms)

router.post("/addUser", addUser)

router.post("/removeUser", removeUser)


module.exports = router;
