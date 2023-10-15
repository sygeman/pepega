"use client";

import dynamic from "next/dynamic";
import { FC, useEffect } from "react";

import { useAccess } from "@/utils/use-access";

// import { ClipComments } from "../clip-comment";
import { ClipScore } from "./clip-score";

const TwitchClipPlayer = dynamic(
  () =>
    import("@/components/twitch-clip-player").then((m) => m.TwitchClipPlayer),
  { ssr: false }
);

export interface ClipProperties {
  clipId?: string;
  autoPlay?: boolean;
}

export const Clip: FC<ClipProperties> = ({ clipId = "", autoPlay }) => {
  const [{ allow: isUser }] = useAccess();

  useEffect(() => {
    if (isUser) {
      // setClipHistory({ variables: { clipId } });
    }
  }, [isUser]);

  if (!clipId) return;

  return (
    <div className="flex flex-col flex-1 bg-surface rounded overflow-hidden">
      <div className="bg-background">
        <TwitchClipPlayer sourceId={clipId} autoPlay={autoPlay} />
      </div>
      <div className="flex py-3">
        <ClipScore clipId={clipId} />
        {/* <ClipShare clipId={clipId} /> */}
      </div>
      {/* <div className="flex flex-1 relative bg-surface overflow-hidden">
        <ClipComments clipId={clipId} />
      </div> */}
    </div>
  );
};
