import { prisma } from "@/server/prisma";
import { twitch } from "@/server/twitch";
import { Follower } from "@/types/follower";

export const getFollows = async (userId?: string): Promise<Follower[]> => {
  let channels: Follower[] = [];

  if (!userId) return channels;

  const account = await prisma.account.findFirst({
    where: { userId },
  });

  if (!account) throw "Account not found";

  const twitchId = account.providerAccountId;

  try {
    console.log({ twitchId, userId });
    const query = await twitch.helixGet(
      "channels/followed",
      { user_id: twitchId, first: 100 },
      userId
    );

    return query?.data?.data || [];
  } catch {
    return [];
  }
};
