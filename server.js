const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const http = require("http")
const socketHandler = require("./socket")
const { ExpressPeerServer } = require("peer")

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const server = http.createServer(app)
const io = require("socket.io")(server, { cors: { origin: "*" } })

const peerServer = ExpressPeerServer(server, { debug: true, path: "/peerjs" })
app.use("/peerjs", peerServer)

app.use("/api/rooms", require("./routes/roomRoutes"))

socketHandler(io)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Mongo Error", err))

const PORT = 3000
server.listen(PORT, () => console.log(`server running on ${PORT}`))
