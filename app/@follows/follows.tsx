"use client";
import cn from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar } from "@/components/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "@/types/follower";

export const Follows = ({ follows }: { follows: User[] }) => {
  const pathname = usePathname();

  return (
    <ScrollArea className="h-full">
      {follows.map(({ id, login, display_name, profile_image_url }) => (
        <Link
          key={id}
          href={`/${login}`}
          passHref
          className={cn(
            "flex w-full text-sm h-10 px-2 items-center hover:bg-background",
            pathname === `/${login}` && "bg-background"
          )}
        >
          <Avatar avatar={profile_image_url} />
          <div className="ml-2">{display_name}</div>
        </Link>
      ))}
    </ScrollArea>
  );
};
