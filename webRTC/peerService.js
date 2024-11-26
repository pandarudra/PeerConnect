import { PeerServer } from "peer";

const peerServer = PeerServer({ port: 9000, path: "/peerjs" });

peerServer.on("connection", (client) => {
  console.log("Client connected:", client.id);
});

peerServer.on("disconnect", (client) => {
  console.log("Client disconnected:", client.id);
});
