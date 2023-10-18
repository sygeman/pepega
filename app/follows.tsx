import Link from "next/link";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Follower } from "@/types/follower";

export const Follows = ({ follows }: { follows: Follower[] }) => (
  <ScrollArea className="h-full">
    {follows.map((channel) => (
      <Link
        key={channel.broadcaster_id}
        href={`/${channel.broadcaster_id}`}
        passHref
        className="flex w-full text-sm h-8 px-4 items-center hover:bg-background"
      >
        <div>{channel.broadcaster_name}</div>
      </Link>
    ))}
  </ScrollArea>
);
