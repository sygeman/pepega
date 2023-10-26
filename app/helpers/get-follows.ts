import { prisma } from "@/server/prisma";
import { twitch } from "@/server/twitch";
import { Follower, User } from "@/types/follower";

export const getFollows = async (userId?: string): Promise<User[]> => {
  if (!userId) return [];

  const user = await prisma.user.findFirst({
    include: { accounts: true },
    where: { id: userId },
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
    const parameters = new URLSearchParams();
    parameters.set("user_id", twitchId);
    parameters.set("first", "100");

    const followersQuery = await twitch.helixGet(
      "channels/followed",
      parameters,
      userId
    );

    followers = [...followers, ...(followersQuery?.data?.data || [])];
  } catch {}

  const usersParameters = new URLSearchParams();

  for (const follower of followers) {
    usersParameters.append("id", follower.broadcaster_id);
  }

  const usersQuery = await twitch.helixGet(`users`, usersParameters);
  const users: User[] = usersQuery?.data?.data || [];

  const mappedUsers: User[] = [];

  for (const follower of followers) {
    const user = users.find((user) => user.id === follower.broadcaster_id);
    if (!user) continue;
    mappedUsers.push(user);
  }

  return mappedUsers;
};
