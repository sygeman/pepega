"use server";
import { Clip, Prisma } from "@prisma/client";
import { z } from "zod";

import { prisma } from "@/server/prisma";

import { twitch } from "../twitch";

type ClipFromTwitch = Omit<Clip, "score" | "createdAt" | "updatedAt">;

/**
 * Default selector for Clip.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultClipSelect = Prisma.validator<Prisma.ClipSelect>()({
  id: true,
  title: true,
  thumbnail_url: true,
  language: true,
  broadcaster_id: true,
  creator_id: true,
  video_id: true,
  game_id: true,
  created_at: true,
  score: true,
  createdAt: true,
  updatedAt: true,
});

const ClipListQueryAction = z.object({
  cursor: z.string().nullish(),
  userId: z.string().nullish(),
});

export const clipListQueryAction = async (
  input: z.infer<typeof ClipListQueryAction>
) => {
  const result = ClipListQueryAction.safeParse(input);

  if (!result.success) {
    throw result.error.issues;
  }

  if (!input.userId) {
    const clips = await prisma.clip.findMany({
      select: defaultClipSelect,
      skip: input?.cursor ? 1 : 0,
      cursor: input.cursor ? { id: input.cursor } : undefined,
      orderBy: { score: "desc" },
      take: 30,
    });

    const clipsCount = clips.length;
    const cursor = clipsCount > 0 ? clips[clipsCount - 1]?.id : undefined;

    return { clips, cursor };
  }

  const clipsQuery = await twitch.clips({ broadcaster_id: input.userId });

  const clips: ClipFromTwitch[] = clipsQuery.data.data || [];

  return {
    clips: clips.map((c) => ({ ...c, score: 0 })),
    cursor: (clipsQuery.data.pagination.cursor || "") as string,
  };
};
