"use client";
import { useStore } from "@/libs/store";
import { useEffect, useState } from "react";

const events = ["join", "create", "leave"];
export default function Players() {
  const { socket } = useStore();
  const [players, setPlayers] = useState<string[]>([]);
  console.log({ socket });

  useEffect(() => {
    socket?.emit("init");

    events.forEach((event) => {
      socket?.on(`${event}-success`, ({ players }) => {
        console.log({ players, event });
        setPlayers(players);
      });
    });
  }, []);
  return (
    <ul className="space-y-2 mt-4">
      {players.map((player, i) => (
        <li key={player} className="text-lg">
          player {i + 1} : {player}
        </li>
      ))}
    </ul>
  );
}
