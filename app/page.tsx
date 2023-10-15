import { Clips } from "@/components/clips";
import { prisma } from "@/server/prisma";

const IndexPage = async () => {
  const clips = await prisma.clip.findMany({
    orderBy: { score: "desc" },
    take: 30,
  });

  return <Clips clips={clips} />;
};

export default IndexPage;
