"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

export function Providers({ children }: React.PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}
