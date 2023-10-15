"use client";

import { signIn } from "next-auth/react";

import { useAccess } from "@/utils/use-access";

import { AddClip } from "./add-clip";
import { Coins } from "./coins";
import { User } from "./user";

export const UserBox = () => {
  const [{ allow: isUser, loading }] = useAccess();

  if (loading) return;

  if (!isUser) {
    return (
      <>
        <AddClip />
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
      <AddClip />
      <Coins />
      <User />
    </>
  );
};
