import "./globals.css";

import cn from "clsx";
import { type PropsWithChildren, ReactNode, useState } from "react";

import { prisma } from "@/server/prisma";
import { twitch } from "@/server/twitch";
import { Follower } from "@/types/follower";
import { getCurretUser } from "@/utils/get-current-user";

import { AuthModal } from "./auth-modal";
import { Follows } from "./follows";
import { roboto } from "./fonts";
import { Logo } from "./logo";
import { Providers } from "./provider";
import { SuggestClip } from "./suggest-clip/suggest-clip";
import { UserBox } from "./user";

type Properties = PropsWithChildren & {
  modal?: ReactNode;
};

const MainLayout = async ({ children, modal }: Properties) => {
  const user = await getCurretUser();
  let channels: Follower[] = [];

  if (user) {
    const account = await prisma.account.findFirst({
      where: { userId: user.id },
    });

    if (!account) throw "Account not found";

    const twitchId = account.providerAccountId;

    const query = await twitch.helixGet(
      "channels/followed",
      { user_id: twitchId, first: 100 },
      user.id
    );

    channels = query?.data?.data;
  }

  return (
    <html className={roboto.className}>
      <head>
        <title>PepegaCom</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body>
        <Providers>
          <div className="flex flex-col h-full overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full" />
            <div className="absolute top-0 left-0 w-full h-full bg-background/95">
              <SuggestClip />
              <AuthModal />
              <div className="relative w-full h-full overflow-hidden flex flex-col">
                <div className="flex-1 overflow-hidden relative">
                  <div className="h-full flex">
                    <div
                      className={cn(
                        "w-[240px] flex flex-col absolute top-0 h-full z-[100] transition-all delay-150 bg-surface",
                        "left-0"
                      )}
                    >
                      <div className="flex flex-col w-full flex-1">
                        <Logo />
                        {user && <Follows channels={channels} />}
                      </div>

                      <UserBox user={user} />
                    </div>
                    <div
                      className={cn(
                        "flex flex-col w-full transition-all delay-150 sm:pl-[240px]"
                      )}
                    >
                      {children}
                      {modal}
                    </div>
                  </div>
                  <div
                    className={cn(
                      "absolute left-0 top-0 w-full h-full z-50 bg-background/95 transition-all delay-150",
                      "sm:hidden"
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default MainLayout;
