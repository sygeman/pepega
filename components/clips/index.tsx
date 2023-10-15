import cn from "clsx";
import Link from "next/link";

import { CardMedia } from "@/components/card-media";
import { VideoPreview } from "@/components/video-preview";

import { dateDistanceInWordsToNow } from "./date";

export const Clips = ({ clips }: { clips: any[] }) => (
  <div
    className={cn(
      "w-full p-4 grid auto-rows-max gap-2 justify-center overflow-y-auto",
      "grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
    )}
  >
    {clips.map((clip) => {
      const date = dateDistanceInWordsToNow(clip?.created_at);

      return (
        <CardMedia
          key={clip.id}
          media={
            <div className="absolute top-0 left-0 w-full h-full">
              <Link href={`/clip/${clip.id}`}>
                <VideoPreview cover={clip.thumbnail_url} date={date} />
              </Link>
            </div>
          }
          title={clip?.title}
          count={clip?.score || 0}
        />
      );
    })}
  </div>
);
