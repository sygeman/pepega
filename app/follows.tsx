import Link from "next/link";

import { Follower } from "@/types/follower";

export const Follows = ({ follows }: { follows: Follower[] }) => (
  <div className="flex flex-1 w-full overflow-hidden">
    <div className="w-full text-sm font-medium overflow-auto">
      {follows.map((channel) => (
        <Link
          key={channel.broadcaster_id}
          href={`/${channel.broadcaster_id}`}
          passHref
          className="flex w-full h-10 px-2 items-center hover:bg-background"
        >
          <div>{channel.broadcaster_name}</div>
        </Link>
      ))}
    </div>
  </div>
);
