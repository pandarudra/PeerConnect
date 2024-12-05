import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/router.js";
import { connectDB } from "./db/dbconfig.js";
import cookieParser from "cookie-parser";
import { PeerServer } from "peer";
import http from "http";
import { socketinit } from "./socket.io/socket.js";

dotenv.config();
const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", router);
socketinit(server);
const peerServer = PeerServer({ port: process.env.PORT, path: "/peerjs" });
connectDB().then(() => {
  console.log("Database connected successfully");
  server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
