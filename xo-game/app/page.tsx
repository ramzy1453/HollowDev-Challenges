"use client";
import Navbar from "@/components/Navbar";
import { useStore } from "@/libs/store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export default function Home() {
  const { setSocket } = useStore();
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

      ws.emit(event + "-room", room);
      ws.on(event + "-error", ({ error }) => {
        toast.error(error);
      });
      ws.on(event + "-success", () => {
        router.push(`/play/${room}`);
      });

      setSocket(ws);
    };
  }

  return (
    <div>
      <Navbar />

      <div
        className="flex justify-center flex-col space-y-12 max-w-3xl mx-auto"
        style={{
          height: "calc(100vh - 4rem)",
        }}
      >
        <p className="text-5xl text-center">Tic Tac Toe Discord</p>

        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter room name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-gray-900 p-2 rounded-md"
          />
          <button
            className="bg-gray-900 text-white p-2 rounded-md hover:bg-gray-800"
            onClick={joinGame(input, "join")}
          >
            Join
          </button>
          <button
            className="bg-gray-900 text-white p-2 rounded-md hover:bg-gray-800"
            onClick={joinGame(input, "create")}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
