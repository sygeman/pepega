import cn from "clsx";
import Link from "next/link";

import { ScrollArea } from "../ui/scroll-area";
import { CardMedia } from "./card-media";
import { dateDistanceInWordsToNow } from "./date";
import { VideoPreview } from "./video-preview";

export const Clips = ({ clips }: { clips: any[] }) => (
  <ScrollArea>
    <div
      className={cn(
        "w-full p-4 grid auto-rows-max gap-2 justify-center",
        "grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      )}
    >
      {clips.map((clip) => (
        <CardMedia
          key={clip.id}
          media={
            <div className="absolute top-0 left-0 w-full h-full">
              <Link href={`/clip/${clip.id}`}>
                <VideoPreview
                  cover={clip.thumbnail_url}
                  date={dateDistanceInWordsToNow(clip?.created_at)}
                />
              </Link>
            </div>
          }
          title={clip?.title}
          count={clip?.score || 0}
        />
      ))}
    </div>
  </ScrollArea>
);
