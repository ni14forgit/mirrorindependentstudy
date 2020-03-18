const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", socket => {
  console.log("we have a new connection");

  socket.on("join", () => {
    console.log("Nishant JOINED");
  });

  socket.on("weather", () => {
    console.log("WEATHER backend");
    io.emit("weather");
  });

  socket.on("acne", () => {
    console.log("ACNE backend");
    io.emit("acne");
  });

  socket.on("disconnect", () => {
    console.log("user has left");
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
