import React from "react";

type Props = {
  value: string;
  play: () => void;
};

export default function BoardItem({ value, play }: Props) {
  return (
    <div
      className="border w-32 h-32 flex items-center justify-center text-4xl"
      onClick={play}
    >
      {value ? value : ""}
    </div>
  );
}
