"use server";
import { z } from "zod";

import { prisma } from "@/server/prisma";
import { getCurretUserId } from "@/utils/get-current-user";

import { CHANGE_SCORE_COST } from "./constants";
import { getClip } from "./helpers/get-clip";

export const decreaseClipScoreMutationAction = async (clipId: string) => {
  const result = z.object({ id: z.string() }).safeParse({ id: clipId });

  if (!result.success) {
    throw result.error.issues;
  }

  const userId = await getCurretUserId();

  await getClip(clipId);
  const count = CHANGE_SCORE_COST;
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) throw "User not found";
  if (user.coins < count) throw "Not enough coins";

  const [_userUpdated, clipUpdated] = await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { coins: { decrement: count } },
    }),
    prisma.clip.update({
      where: { id: clipId },
      data: { score: { decrement: CHANGE_SCORE_COST } },
    }),
  ]);

  return clipUpdated.score;
};
