"use client";

import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useModal } from "@/utils/use-modal";
import Image from "next/image";
import { signIn } from "next-auth/react";

export const AuthModal = () => {
  const modalProperties = useModal();

  return (
    <Modal id="authModal" {...modalProperties}>
      <div className="flex flex-col py-5 px-10 w-[500px]">
        <div className="flex flex-col px-4 py-2">
          <Button className="py-5" onClick={() => signIn("twitch")}>
            <Image
              alt=""
              className="mr-2 h-6 opacity-90"
              height={24}
              src="/icons/twitch.svg"
              width={24}
            />
            <span className="text-white opacity-80 text-xs uppercase tracking-widest mx-5 text-center w-full">
              Login with Twitch
            </span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};
