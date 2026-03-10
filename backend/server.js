const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://share-sprint-frontend.onrender.com"
  ],
  methods: ["GET","POST"],
  credentials: true
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://share-sprint-frontend.onrender.com"
    ],
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["websocket", "polling"],
  maxHttpBufferSize: 1e8,
});

const activeRooms = new Map();

/* ================= CONNECTION ================= */

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  /* ================= CREATE ROOM ================= */

  socket.on("create-room", (code) => {
    if (!activeRooms.has(code)) {
      activeRooms.set(code, new Set());
    }

    const roomUsers = activeRooms.get(code);

    if (!roomUsers.has(socket.id)) {
      roomUsers.add(socket.id);
      socket.join(code);
    }

    io.to(code).emit("room-joined", {
      success: true,
      roomCode: code,
      users: roomUsers.size,
    });

    console.log("Room created:", code, "Users:", roomUsers.size);
  });

  /* ================= JOIN ROOM ================= */

  socket.on("join-room", (code) => {
    if (!activeRooms.has(code)) {
      socket.emit("room-error", {
        success: false,
        message: "Room not found",
      });
      return;
    }

    const roomUsers = activeRooms.get(code);

    // prevent duplicate join
    if (!roomUsers.has(socket.id)) {
      if (roomUsers.size >= 2) {
        socket.emit("room-error", {
          success: false,
          message: "Room is full",
        });
        return;
      }

      roomUsers.add(socket.id);
      socket.join(code);
    }

    // ALWAYS broadcast updated user count
    io.to(code).emit("room-joined", {
      success: true,
      roomCode: code,
      users: roomUsers.size,
    });

    console.log("User joined:", code, "Users:", roomUsers.size);
  });

  /* ================= FILE TRANSFER ================= */

  socket.on("file-chunk", (data) => {
    socket.to(data.roomCode).emit("file-chunk", data);
  });

  socket.on("file-complete", (data) => {
    socket.to(data.roomCode).emit("file-complete", data);
  });

  /* ================= DISCONNECT ================= */

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    for (const [code, users] of activeRooms.entries()) {
      if (users.has(socket.id)) {
        users.delete(socket.id);

        if (users.size === 0) {
          activeRooms.delete(code);
        }

        io.to(code).emit("room-joined", {
          success: true,
          roomCode: code,
          users: users.size,
        });
      }
    }
  });
});

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});
