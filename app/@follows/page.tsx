import Image from "next/image";
import Link from "next/link";

import { prisma } from "@/server/prisma";
import { twitch } from "@/server/twitch";
import { getCurretUserId } from "@/utils/get-current-user";

const FollowsPage = async () => {
  const userId = await getCurretUserId();
  let channels: {
    broadcaster_id: string;
    broadcaster_login: string;
    broadcaster_name: string;
    followed_at: string;
  }[] = [];

  if (userId) {
    const account = await prisma.account.findFirst({
      where: { userId },
    });

    if (!account) throw "Account not found";

    const twitchId = account.providerAccountId;

    const query = await twitch.helixGet(
      "channels/followed",
      { user_id: twitchId, first: 100 },
      userId
    );

    channels = query?.data?.data;
  }

  return (
    <div className="flex flex-1 w-full  overflow-hidden">
      <div className="w-full text-sm font-medium overflow-auto">
        {channels.map((channel) => (
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
};

export const revalidate = 60;

export default FollowsPage;
