import { Clips } from "@/components/clips";
import { twitch } from "@/server/twitch";

const ChannelPage = async ({
  params: { channel },
}: {
  params: { channel: string };
}) => {
  const clips = await twitch.clips({ broadcaster_id: channel });

  return <Clips clips={clips.data} />;
};

export default ChannelPage;
