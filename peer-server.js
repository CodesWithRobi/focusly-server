const express = require("express");
const http = require("http");
const { ExpressPeerServer } = require("peer");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());

const peerServer = ExpressPeerServer(server, {
  debug: true,
  allow_discovery: true
});

app.use("/", peerServer);

server.listen(9000, () => {
  console.log(`✅ PeerJS Server is running at http://localhost:9000/peerjs`);
});
