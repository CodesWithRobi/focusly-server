const socketToPeer = new Map();
const Room = require("../models/Room");

module.exports = function(io) {
  io.on("connection", (socket) => {

    console.log("User Connected:", socket.id);

    socket.on("joinRoom", ({ roomId, peerId }) => {
      socket.join(roomId);
      socketToPeer.set(socket.id, peerId);
      console.log(`User ${socket.id} joined room ${roomId}`);

      socket.to(roomId).emit("user-connect", peerId);
    });

    socket.on("sendMessage", async ({ roomId, user, msg }) => {
      time= new Date()
      await Room.findOneAndUpdate(
        { code: roomId },
        {
          $push: {
            chat: {
              user,
              msg,
              time,
            },
          },
        }
      );

      io.to(roomId).emit("receiveMessage", { user, msg, time });
    });

    socket.on("disconnect", () => {
      const peerId = socketToPeer.get(socket.id);
      if (peerId) {
        io.emit("user-disconnected", peerId);
      console.log("User Disconencted", socket.id);
        socketToPeer.delete(socket.id);
      }
    });

  });
};
