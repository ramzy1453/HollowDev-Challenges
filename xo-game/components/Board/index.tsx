"use client";
import { useEffect, useState } from "react";

import BoardItem from "./BoardItem";
import { useSession } from "next-auth/react";
import { useStore } from "@/libs/store";
import { useRouter } from "next/navigation";

type Props = {
  size: number;
};

export default function Board({ size }: Props) {
  const [board, setBoard] = useState(Array(size).fill(null));
  const { socket } = useStore();
  const { data } = useSession();
  const router = useRouter();

  const play = (i: number) => {
    socket?.emit("play", {
      pos: i,
    });
  };

  useEffect(() => {
    socket?.emit("init");

    socket?.on("update-board", ({ board }) => {
      console.log({ board });
      setBoard(board);
    });

    socket?.on("winner", ({ winner }) => {
      alert(winner === data?.user?.name ? "You win" : "You lose");
      socket.emit("reset");
      router.push("/");
    });
  }, []);

  return (
    <div className="border grid grid-cols-3">
      {board.map((boardValue, i) => (
        <BoardItem
          key={i}
          value={boardValue}
          play={() => {
            play(i);
          }}
        />
      ))}
    </div>
  );
}
