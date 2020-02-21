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
    console.log("wEATHER");
    io.emit("weather");
  });

  socket.on("disconnect", () => {
    console.log("user has left");
  });
});

app.use(router);

server.listen(PORT, "0.0.0.0", () =>
  console.log(`Server has started on port ${PORT}`)
);
