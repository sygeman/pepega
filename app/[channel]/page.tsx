import { subDays, subHours } from "date-fns";

import { Avatar } from "@/components/avatar";
import { Clips } from "@/components/clips";
import { twitch } from "@/server/twitch";

import { RangeFilter } from "./range-filter";

const ChannelPage = async ({
  params: { channel },
  searchParams: { range },
}: {
  params: { channel: string };
  searchParams: { range?: string };
}) => {
  const now = new Date();
  const rangeFilter: Record<string, () => string> = {
    "24h": () => subHours(now, 24).toISOString(),
    "7d": () => subDays(now, 7).toISOString(),
    "30d": () => subDays(now, 30).toISOString(),
  };

  const started_at =
    typeof range === "string" && rangeFilter[range]
      ? rangeFilter[range]()
      : undefined;

  const [channelQuery, clips] = await Promise.all([
    twitch.helixGet("users", { id: channel }),
    twitch.clips({ broadcaster_id: channel, started_at }),
  ]);

  const channelData = channelQuery?.data?.data?.[0];
  const login = channelData?.login;
  const title = channelData?.display_name;
  const image = channelData?.profile_image_url;

  return (
    <div className="h-full">
      <div className="flex justify-between items-center px-4 pt-2">
        <div className="flex items-center">
          <Avatar avatar={image} />
          <div className="ml-2 font-medium">
            Клипы канала{" "}
            <a
              className="underline"
              target="_blank"
              href={`https://www.twitch.tv/${login}`}
            >
              {title}
            </a>
          </div>
        </div>

        <RangeFilter value={range} />
      </div>
      <Clips clips={clips.data} />
    </div>
  );
};

export default ChannelPage;
