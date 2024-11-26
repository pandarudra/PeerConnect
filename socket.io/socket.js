import { Server } from "socket.io";

export const socketinit = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("message", (data) => {
      socket.broadcast.emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });
};
