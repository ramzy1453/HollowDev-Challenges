"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/libs/store";

export default function Navbar() {
  const session = useSession();
  const isAuth = session.status === "authenticated";
  const user = session.data?.user;
  const pathname = usePathname();
  const { socket } = useStore();
  return (
    <div className="bg-gray-800 px-4 flex items-center justify-between h-16">
      {!isAuth && (
        <button
          onClick={() => {
            signIn();
          }}
          className="bg-gray-900 text-white p-2 rounded-md hover:bg-gray-950"
        >
          Sign In
        </button>
      )}

      {isAuth && (
        <div className="flex space-x-2 justify-center items-center">
          {pathname !== "/" && (
            <Link
              onClick={() => {
                socket?.emit("leave-room");
              }}
              href="/"
              className="bg-gray-900 text-white p-2 rounded-md hover:bg-gray-950"
            >
              Exit
            </Link>
          )}
          <Image
            src={user?.image as string}
            alt="user image"
            width={50}
            height={50}
          />
          <div>{user?.name}</div>
        </div>
      )}
      {isAuth && (
        <button
          onClick={() => {
            signOut();
          }}
          className="bg-gray-900 text-white p-2 rounded-md hover:bg-gray-950"
        >
          Sign Out
        </button>
      )}
    </div>
  );
}
