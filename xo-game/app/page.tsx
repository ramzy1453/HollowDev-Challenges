"use client";
import { useStore } from "@/libs/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const { setSocket, socket } = useStore();
  const { data } = useSession();
  const [input, setInput] = useState("");
  const router = useRouter();

  function joinGame(room: string, event: string) {
    return () => {
      const ws = io("http://localhost:7000", {
        //@ts-expect-error : Ws Query problem
        query: `username=${data?.user?.name}&room=${room}`,
      });

      ws.on("connect", () => {
        console.log("Connected to server");
      });

      ws.on("disconnect", () => {
        console.log("Disconnected from server");
        setSocket(null);
      });

      ws.emit(event + '-room', room);
      ws.on(event+"-error", ({ error }) => {
        alert(error);
      });
      ws.on(event+"-success", () => {
        console.log("nm");
        router.push(`/play/${room}`);
      });

      setSocket(ws);
    };
  }

  return (
    <div>
      <p>Tic Tac Toe Discord</p>

      <div className="flex flex-col">
        <input
          type="text"
          placeholder="room"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border"
        />
        <button onClick={joinGame(input, "join")}>Join</button>
        <button onClick={joinGame(input, "create")}>Create</button>
      </div>
    </div>
  );
}
