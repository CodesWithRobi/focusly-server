const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const socketHandler = require("./socket");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use("/api/rooms", require("./routes/roomRoutes"));
app.use("/api/todo", require("./routes/todoRoutes"));

socketHandler(io);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Mongo Error", err));

const PORT = 3000;
server.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);
