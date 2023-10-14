"use server";
import { z } from "zod";

import { prisma } from "@/server/prisma";

export const clipScoreByIdQueryAction = async (clipId: string) => {
  const result = z.object({ id: z.string() }).safeParse({ id: clipId });

  if (!result.success) {
    throw result.error.issues;
  }

  const clip = await prisma.clip.findUnique({ where: { id: clipId } });
  return clip ? clip.score : 0;
};
