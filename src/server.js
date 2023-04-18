import express from "express";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import path from "path";
const __dirname = path.resolve();

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/src/public/views");
app.use("/public", express.static(__dirname + "/src/public"));
app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

const sockets = [];
wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("Connected to Browser ✅");
  socket.on("close", () => console.log("Disconnected from the Browser ❌"));
  socket.on("message", (message) => {
    sockets.forEach((aSocket) => aSocket.send(message));
  });
});

server.listen(3000, handleListen);
