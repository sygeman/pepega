import "./globals.css";

import cn from "clsx";
import { type PropsWithChildren, ReactNode } from "react";

import { getCurretUser } from "@/utils/get-current-user";

import { AuthModal } from "./auth-modal";
import { roboto } from "./fonts";
import { Logo } from "./logo";
import { Providers } from "./provider";
import { SuggestClip } from "./suggest-clip/suggest-clip";
import { UserBox } from "./user";

type Properties = PropsWithChildren & {
  modal?: ReactNode;
  follows?: ReactNode;
};

const MainLayout = async ({ children, modal, follows }: Properties) => {
  const user = await getCurretUser();

  return (
    <html className={`${roboto.className} dark`}>
      <head>
        <title>PepegaCom</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className="absolute w-full h-full">
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
                        "w-60 flex-col absolute top-0 h-full bg-surface",
                        "left-0 hidden md:flex"
                      )}
                    >
                      <Logo />
                      {follows}
                      <UserBox user={user} />
                    </div>
                    <div className={cn("flex flex-col w-full md:pl-60")}>
                      {children}
                      {modal}
                    </div>
                  </div>
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
