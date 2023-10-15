"use server";
import { prisma } from "@/server/prisma";
import { getCurretUserId } from "@/utils/get-current-user";

export const userCoinsQueryAction = async () => {
  const userId = await getCurretUserId();
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user ? user.coins : 0;
};
