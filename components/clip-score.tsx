import React from "react";
import Image from "next/image";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import { useAccess } from "../utils/use-access";

export interface ScoreButtonProps {
  action: () => void;
  children?: React.ReactNode;
}

const ScoreButton: React.FC<ScoreButtonProps> = ({ action, children }) => {
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

export interface ClipScoreProps {
  clipId: string;
}

export function ClipScore({ clipId }: ClipScoreProps) {
  const clipScoreQuery = trpc.clipScore.byId.useQuery(
    { id: clipId },
    { refetchInterval: 5000 }
  );
  const clipScore = clipScoreQuery?.data || 0;

  const increaseClipScoreMutation = trpc.clipScore.increase.useMutation();
  const increaseClipScore = () =>
    increaseClipScoreMutation.mutate(
      { id: clipId },
      {
        onSuccess: () => {
          clipScoreQuery.refetch();
        },
      }
    );

  const decreaseClipScoreMutation = trpc.clipScore.decrease.useMutation();
  const decreaseClipScore = () =>
    decreaseClipScoreMutation.mutate(
      { id: clipId },
      {
        onSuccess: () => {
          clipScoreQuery.refetch();
        },
      }
    );

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
