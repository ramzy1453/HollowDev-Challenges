import express from "express";
import cors from "cors";
import http from "http";
import { Server, Socket } from "socket.io";
import { checkWinner } from "./utils/tictactoe";

const app = express();
const PORT = 7000;

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Hello from server!");
});

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

function getQuery(socket: Socket, q: string) {
  return socket.handshake.query[q] as string;
}
const rooms = new Map();
rooms.set("damar", { board: Array(9).fill(null), players: [] });

io.on("connection", (socket) => {
  console.log("Connected user : ", socket.id);

  socket.on("disconnect", () => {
    console.log("disconnected user : ", socket.id);
  });

  socket.on("join-room", () => {
    const room = getQuery(socket, "room");
    const username = getQuery(socket, "username");
    const roomData = rooms.get(room);
    console.log(rooms);
    if (!roomData) {
      return socket.emit("join-error", { error: "Room not found" });
    }
    if (roomData.players.length === 2) {
      return socket.emit("join-error", { error: "Room is full" });
    }
    roomData.players.push(username);
    socket.join(room);
    socket.emit("join-success", { room, players: roomData.players });
  });

  socket.on("create-room", () => {
    const room = getQuery(socket, "room");
    const username = getQuery(socket, "username");

    // cant create room if room already exist
    if (rooms.has(room)) {
      return socket.emit("create-error", { error: "Room already exist" });
    }
    rooms.set(room, { board: Array(9).fill(null), players: [username] });
    socket.join(room);
    socket.emit("create-success", { room, players: [username] });
  });

  socket.on("play", ({ pos }) => {
    const player = getQuery(socket, "username");
    const room = getQuery(socket, "room");
    const roomData = rooms.get(room);
    const { board } = roomData;

    if (board[pos]) return;
    console.log(rooms);
    board[pos] = player === roomData.players[0] ? "X" : "O";

    io.emit("update-board", { board });

    if (checkWinner(board, "X")) {
      io.emit("winner", { winner: roomData.players[0] });
    }
    if (checkWinner(board, "O")) {
      io.emit("winner", { winner: roomData.players[1] });
    }
  });

  socket.on("reset", () => {
    const room = getQuery(socket, "room");
    rooms.delete(room);
  });

  socket.on("init", () => {
    const room = getQuery(socket, "room");
    const roomData = rooms.get(room);
    io.emit("update-board", { board: roomData.board });
  });
});
