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
const rooms = new Map<string, any>();
let timeout: NodeJS.Timeout;
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
    if (roomData.players.length === 2 && !roomData.players.includes(username)) {
      return socket.emit("join-error", { error: "Room is full" });
    }

    // when u join an inactive room delete the timer and set it for true
    if (!roomData.active) {
      clearTimeout(timeout);
      roomData.active = true;
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
    rooms.set(room, {
      board: Array(9).fill(null),
      players: [username],
      active: true,
    });
    socket.join(room);

    socket.emit("create-success", { room, players: [username] });
  });

  socket.on("play", ({ pos }) => {
    const player = getQuery(socket, "username");
    const room = getQuery(socket, "room");

    const roomData = rooms.get(room);
    const { board } = roomData;

    // you cant play if you are lonely in the room
    if (roomData.players.length === 1) {
      return socket.emit("play-error", { error: "Waiting for another player" });
    }

    if (board[pos]) return;
    board[pos] = player === roomData.players[0] ? "X" : "O";

    io.to(room).emit("update-board", { board });

    if (checkWinner(board, "X")) {
      io.to(room).emit("game-over", { winner: roomData.players[0] });
    } else if (checkWinner(board, "O")) {
      io.to(room).emit("game-over", { winner: roomData.players[1] });
    }
  });

  socket.on("reset", () => {
    const room = getQuery(socket, "room");
    rooms.delete(room);
    io.socketsLeave(room);
  });

  socket.on("init", () => {
    const room = getQuery(socket, "room");
    const roomData = rooms.get(room);
    io.to(room).emit("update-board", { board: roomData.board });
  });

  socket.on("leave-room", () => {
    const room = getQuery(socket, "room");
    const username = getQuery(socket, "username");
    const roomData = rooms.get(room);
    roomData.players = roomData.players.filter(
      (player: string) => player !== username
    );
    socket.leave(room);
    io.to(room).emit("leave-success", {
      room,
      players: roomData.players,
    });
    if (roomData.players.length === 0) {
      roomData.active = false;
      timeout = setTimeout(() => {
        if (roomData.players.length === 0 && !roomData.active) {
          rooms.delete(room);
        }
      }, 15000);
    }
  });
});
