import { PeerServer } from "peer";
import dotenv from "dotenv";
dotenv.config();

const peerServer = PeerServer({ port: process.env.PORT, path: "/peerjs" });

peerServer.on("connection", (client) => {
  console.log("Client connected:", client.id);
});

peerServer.on("disconnect", (client) => {
  console.log("Client disconnected:", client.id);
});
