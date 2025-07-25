const socketToPeer = new Map();
const userLastSeen = new Map();
const Room = require("../models/Room");

module.exports = function(io) {
  io.on("connection", (socket) => {

    console.log("User Connected:", socket.id);

    socket.on("joinRoom", ({ roomId, peerId, username }) => {
      socket.join(roomId)
      socket.roomId = roomId
      socket.username = username

      socketToPeer.set(socket.id, peerId);
      userLastSeen.set(socket.id, Date.now());

      console.log(`User ${socket.id} joined room ${roomId}`);

      socket.to(roomId).emit("user-connect", peerId);
    });

    socket.on("heartbeat", ({ user }) => {
      userLastSeen.set(socket.id, Date.now());
      console.log(user, "dup dup")
    });

    socket.on("sendMessage", async ({ roomId, user, msg }) => {
      const time = new Date();

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

      socket.to(roomId).emit("new-message");
    });

    socket.on("disconnect", async () => {
      const peerId = socketToPeer.get(socket.id);
      const roomId = socket.roomId;

      if (peerId) {
        io.to(roomId).emit("user-disconnected", peerId);
        console.log("User Disconnected:", socket.id);

        socketToPeer.delete(socket.id);
        userLastSeen.delete(socket.id);
      }

      // Is room empty?
      if (roomId) {
        const sockets = await io.in(roomId).fetchSockets();
        if (sockets.length === 0) {
          await Room.findOneAndDelete({ code: roomId });
          console.log(`Room ${roomId} deleted from DB because it's empty`);
        }
      }
    });
  });
};
