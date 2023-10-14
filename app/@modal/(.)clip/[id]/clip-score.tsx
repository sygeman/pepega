"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { clipScoreByIdQueryAction } from "@/server/actions/clip-score/by-id";
import { decreaseClipScoreMutationAction } from "@/server/actions/clip-score/decrease";
import { increaseClipScoreMutationAction } from "@/server/actions/clip-score/increase";
import { useAccess } from "@/utils/use-access";

export interface ScoreButtonProperties {
  action: () => void;
  children?: React.ReactNode;
}

const ScoreButton: React.FC<ScoreButtonProperties> = ({ action, children }) => {
  const router = useRouter();
  const [{ allow: isUser }] = useAccess();

  const openAuth = () =>
    router.push({
      pathname: router.route,
      query: {
        ...router.query,
        authModal: 1,
      },
    });

  return (
    <button
      className="px-4 py-2 hover:bg-twitch/50 text-white transition-colors delay-75"
      onClick={() => (isUser ? action() : openAuth())}
    >
      {children}
    </button>
  );
};

export interface ClipScoreProperties {
  clipId: string;
}

export function ClipScore({ clipId }: ClipScoreProperties) {
  const clipScoreQuery = useQuery({
    queryKey: [clipId],
    queryFn: () => clipScoreByIdQueryAction(clipId),
    refetchInterval: 5000,
  });
  const clipScore = clipScoreQuery?.data || 0;

  const increaseClipScore = async () => {
    await increaseClipScoreMutationAction(clipId);
    clipScoreQuery.refetch();
  };

  const decreaseClipScore = async () => {
    await decreaseClipScoreMutationAction(clipId);
    clipScoreQuery.refetch();
  };

  const loading = clipScoreQuery.isLoading;

  return (
    <div className="flex bg-background mx-2 rounded-lg overflow-hidden">
      <ScoreButton action={increaseClipScore}>
        {loading ? (
          <div className="w-4 h-4" />
        ) : (
          <Image src="/icons/plus-small.svg" alt="" height={16} width={16} />
        )}
      </ScoreButton>
      <div className="flex px-4 -mx-2 z-10 items-center bg-twitch transition rounded-lg text-sm font-medium">
        {loading ? <div className="w-4 h-4" /> : clipScore}
      </div>
      <ScoreButton action={decreaseClipScore}>
        {loading ? (
          <div className="w-4 h-4" />
        ) : (
          <Image src="/icons/minus-small.svg" alt="" height={16} width={16} />
        )}
      </ScoreButton>
    </div>
  );
}
