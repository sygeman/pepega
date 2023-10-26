import { Avatar } from "@/components/avatar";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export const User = ({ user }: { user: any }) => {
  return (
    <div className="h-10 flex items-center bg-surface/50">
      <div className="px-4">
        <Avatar avatar={user.image} />
      </div>
      <div className="flex flex-1 items-center text-white/75 font-medium text-sm">
        {user.name}
      </div>
      <button
        className="hover:bg-background/50 p-2 mx-2 rounded-lg"
        onClick={() => signOut()}
      >
        <Image alt="" height={16} src="/icons/exit.svg" width={16} />
      </button>
    </div>
  );
};
