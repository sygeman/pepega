"use client";
import { Avatar } from "@/components/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "@/types/follower";
import cn from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Follows = ({ follows }: { follows: User[] }) => {
  const pathname = usePathname();

  return (
    <ScrollArea className="h-full">
      {follows.map(({ display_name, id, login, profile_image_url }) => (
        <Link
          className={cn(
            "flex w-full text-sm h-10 px-2 items-center hover:bg-background",
            pathname === `/${login}` && "bg-background"
          )}
          href={`/${login}`}
          key={id}
          passHref
        >
          <Avatar avatar={profile_image_url} />
          <div className="ml-2">{display_name}</div>
        </Link>
      ))}
    </ScrollArea>
  );
};
