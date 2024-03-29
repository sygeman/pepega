import { getServerSession } from "next-auth";

import { authOptions } from "@/config/next-auth";

export const getCurretUserId = async () => {
  const session = await getServerSession(authOptions);
  return session?.user.id;
};

export const getCurretUser = async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
};

export const checkIsUser = async () => {
  const session = await getServerSession(authOptions);
  return !!session?.user.id;
};
