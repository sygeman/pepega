"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { VirtuosoGrid } from "react-virtuoso";

import { CardMedia } from "../card-media";
import { VideoPreview } from "../video-preview";
import { dateDistanceInWordsToNow } from "./date";
import { Scroller } from "./scrollbar";

export const Clips = ({ clips }: { clips: any[] }) => {
  const maxOnRow = 6;
  const elementWidth = 320;

  const router = useRouter();
  const { width, ref } = useResizeDetector({
    skipOnMount: true,
    handleHeight: false,
  });
  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(() => {
    const containerWidth = width || 0;
    let countOnRow = Math.floor(containerWidth / elementWidth);

    if (countOnRow < 1) {
      countOnRow = 1;
    } else if (countOnRow > maxOnRow) {
      countOnRow = maxOnRow;
    }

    let gridWidth = countOnRow * elementWidth;

    if (gridWidth < elementWidth) {
      gridWidth = elementWidth;
    }

    setInnerWidth(gridWidth);
  }, [width, maxOnRow, elementWidth]);

  const currentCount = clips.length;

  const getClipByIndex = (index: number) => {
    const clip = clips[index];

    if (!clip) {
      return (
        <div className="m-2">
          <CardMedia title="" />
        </div>
      );
    }

    const date =
      clip && clip.created_at && dateDistanceInWordsToNow(clip.created_at);

    return (
      <div className="m-2">
        <CardMedia
          media={
            <div className="absolute top-0 left-0 w-full h-full">
              {clip && (
                <Link href={`/clip/${clip.id}`}>
                  <VideoPreview cover={clip.thumbnail_url} date={date} />
                </Link>
              )}
            </div>
          }
          title={clip?.title}
          count={clip?.score || 0}
        />
      </div>
    );
  };

  return (
    <div ref={ref} className="w-full h-full py-4">
      <style>{`
        .virtuoso-grid-list {
          margin: 0 auto;
          width: ${innerWidth}px;
          display: grid;
          grid-template-columns: repeat(auto-fit, ${elementWidth}px);
        }
      `}</style>
      <VirtuosoGrid
        totalCount={currentCount}
        overscan={200}
        components={{
          // @ts-ignore
          Scroller,
        }}
        itemContent={(index) => getClipByIndex(index)}
      />
    </div>
  );
};
