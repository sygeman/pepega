"use client";

import { signIn } from "next-auth/react";

import { AddClip } from "./add-clip";
import { Coins } from "./coins";
import { User } from "./user";

export const UserBox = ({ user }: { user: any }) => {
  if (!user) {
    return (
      <>
        <AddClip isUser={!!user} />
        <button
          className="p-2 text-sm text-white/75 flex items-center justify-center w-full uppercase hover:bg-surface"
          onClick={() => signIn("twitch")}
        >
          Войти
        </button>
      </>
    );
  }

  return (
    <>
      <AddClip isUser={!!user} />
      <Coins />
      <User user={user} />
    </>
  );
};
