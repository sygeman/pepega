import { Clips } from "@/components/clips";
import { clipListQueryAction } from "@/server/actions/clip";
import { prisma } from "@/server/prisma";

const IndexPage = async () => {
  const clips = await prisma.clip.findMany({
    orderBy: { score: "desc" },
    take: 30,
  });

  return <Clips clips={clips} />;
};

export default IndexPage;
