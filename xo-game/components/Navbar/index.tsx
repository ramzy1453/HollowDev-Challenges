"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const session = useSession();
  const isAuth = session.status === "authenticated";
  const user = session.data?.user;
  return (
    <div className="border border-red-300 flex justify-between">
      {!isAuth && (
        <button
          onClick={() => {
            signIn();
          }}
          className="border border-blue-300"
        >
          Sign In
        </button>
      )}

      {isAuth && (
        <div className="flex space-x-2 justify-center items-center">
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
          className="border border-blue-300"
        >
          Sign Out
        </button>
      )}
    </div>
  );
}
