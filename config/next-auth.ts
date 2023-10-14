import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type NextAuthOptions } from "next-auth";
import TwitchProvider from "next-auth/providers/twitch";

import { prisma } from "@/server/prisma";

import { twitchConfig } from "./twitch";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitchProvider({
      clientId: twitchConfig.clientId,
      clientSecret: twitchConfig.clientSecret,
      authorization: {
        params: { scope: twitchConfig.scope },
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const u = await prisma.user.findUnique({
        where: { id: user.id },
        select: { role: true, image: true },
      });
      session.user.id = user.id;
      session.user.role = u?.role as string;
      session.user.image = u?.image as string;
      return session;
    },
  },
};
