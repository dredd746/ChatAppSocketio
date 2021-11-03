const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const { addUser,removeUser,getUser,getUsersInRoom} = require('./users')
const users = []
const server = http.createServer(app);
PORT = 3001;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  const users = getUsersInRoom(socket.id);
  console.log(users);

  socket.on("join_room", (room,username) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
    addUser(socket.id,username,room);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
})