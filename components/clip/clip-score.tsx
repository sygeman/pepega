"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";

import { clipScoreByIdQueryAction } from "@/server/actions/clip-score/by-id";
import { decreaseClipScoreMutationAction } from "@/server/actions/clip-score/decrease";
import { increaseClipScoreMutationAction } from "@/server/actions/clip-score/increase";
import { useAccess } from "@/utils/use-access";

export interface ScoreButtonProperties {
  action: () => void;
  children?: React.ReactNode;
}

const ScoreButton: React.FC<ScoreButtonProperties> = ({ action, children }) => {
  const [{ allow: isUser }] = useAccess();

  return (
    <button
      className="px-4 py-2 hover:bg-twitch/50 text-white transition-colors delay-75"
      onClick={() => (isUser ? action() : signIn("twitch"))}
    >
      {children}
    </button>
  );
};

export interface ClipScoreProperties {
  clipId: string;
}

export function ClipScore({ clipId }: ClipScoreProperties) {
  const [clipScore, setClipScore] = useState(0);

  const updateClipScore = useCallback(() => {
    clipScoreByIdQueryAction(clipId).then((value) => {
      if (typeof value === "number") {
        setClipScore(value);
      }
    });
  }, [clipId]);

  useEffect(() => {
    const interval = setInterval(updateClipScore, 5000);
    updateClipScore();
    return () => clearInterval(interval);
  }, [updateClipScore]);

  const increaseClipScore = async () => {
    await increaseClipScoreMutationAction(clipId);
    updateClipScore();
  };

  const decreaseClipScore = async () => {
    await decreaseClipScoreMutationAction(clipId);
    updateClipScore();
  };

  return (
    <div className="flex bg-background mx-2 rounded-lg overflow-hidden">
      <ScoreButton action={increaseClipScore}>
        <Image src="/icons/plus-small.svg" alt="" height={16} width={16} />
      </ScoreButton>
      <div className="flex px-4 -mx-2 z-10 items-center bg-twitch transition rounded-lg text-sm font-medium">
        {clipScore}
      </div>
      <ScoreButton action={decreaseClipScore}>
        <Image src="/icons/minus-small.svg" alt="" height={16} width={16} />
      </ScoreButton>
    </div>
  );
}
