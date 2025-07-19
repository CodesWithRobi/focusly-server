module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on("sendMessage", ({ roomId, user, msg }) => {
      io.to(roomId).emit("receiveMessage", { user, msg, time: new Date() });
    });

    socket.on("disconnect", () => {
      console.log("User Disconencted", socket.id);
    });
  });
};
