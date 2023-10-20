import { prisma } from "@/server/prisma";
import { twitch } from "@/server/twitch";
import { Follower } from "@/types/follower";

export const getFollows = async (userId?: string): Promise<Follower[]> => {
  let channels: Follower[] = [];

  if (!userId) return channels;

  const user = await prisma.user.findFirst({
    where: { id: userId },
    include: { accounts: true },
  });

  const account = user?.accounts?.[0];

  if (!account) throw "Account not found";

  const userChannel: Follower = {
    broadcaster_id: account.providerAccountId,
    broadcaster_login: user?.name || "",
    broadcaster_name: user?.name || "",
    followed_at: "",
  };

  const twitchId = account.providerAccountId;
  let followers: Follower[] = [userChannel];

  try {
    const query = await twitch.helixGet(
      "channels/followed",
      { user_id: twitchId, first: 100 },
      userId
    );

    return [...followers, ...(query?.data?.data || [])];
  } catch {
    return followers;
  }
};
