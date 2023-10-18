"use client";

import "./globals.css";

import cn from "clsx";
import { type PropsWithChildren, ReactNode, useState } from "react";

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

const MainLayout = ({ children, modal, follows }: Properties) => {
  const [leftMenuIsOpen, setLeftMenuIsOpen] = useState(false);

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
                        leftMenuIsOpen ? "left-0" : "left-[-240px] sm:left-0"
                      )}
                    >
                      <div className="flex flex-col w-full flex-1">
                        <Logo />
                        {follows}
                      </div>

                      <UserBox />
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
                      leftMenuIsOpen ? "sm:hidden" : "hidden"
                    )}
                    onClick={() => setLeftMenuIsOpen(false)}
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
