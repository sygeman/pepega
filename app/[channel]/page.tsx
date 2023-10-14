import { useRouter } from "next/navigation";

import { Clips } from "@/components/clips";

const ChannelPage = () => {
  const { query } = useRouter();
  const userId =
    typeof query?.channel === "string" ? query?.channel : undefined;

  return <Clips userId={userId} />;
};

export default ChannelPage;
