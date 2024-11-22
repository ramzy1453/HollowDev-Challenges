"use client";
import { useEffect, useState } from "react";

import BoardItem from "./BoardItem";
import { useSession } from "next-auth/react";
import { useStore } from "@/libs/store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

    let timeout: NodeJS.Timeout;

    socket?.on("game-over", ({ winner }) => {
      if (winner === data?.user?.name) {
        toast.success("You won!");
      } else {
        toast.error("You lost!");
      }
      timeout = setTimeout(() => {
        socket.emit("reset");
        router.push("/");
      }, 1000);
    });

    socket?.on("play-error", ({ error }) => {
      console.log(error);
      toast.error(error);
    });

    return () => {
      clearTimeout(timeout);
      socket?.off("update-board");
      socket?.off("game-over");
      socket?.off("reset");
      socket?.off("play-error");
    };
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
