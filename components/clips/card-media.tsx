"use client";

import { shortNumbers } from "@/utils/count";
import { type ReactNode } from "react";

interface CardMediaProperties {
  avatar?: string;
  count?: number;
  countIcon?: ReactNode;
  description?: string;
  descriptionLink?: string;
  media?: ReactNode;
  overlay?: ReactNode;
  title?: string;
}

export const CardMedia = ({
  count = 0,
  media,
  overlay,
  title,
}: CardMediaProperties) => (
  <div className="flex flex-col items-center rounded overflow-hidden relative">
    <div className="relative w-full aspect-video bg-surface/50">{media}</div>
    <div className="flex bg-surface w-full h-12 px-1 text-sm">
      <div
        className="flex flex-1 h-full text-sm items-center px-2 truncate"
        title={title}
      >
        {title}
      </div>
      <div className="flex justify-center items-center h-full px-2">
        <span
          className={
            "text-white/75 px-2 py-1 rounded font-medium " +
            `${count > 0 ? "bg-primary" : "bg-background"}`
          }
        >
          {shortNumbers(count)}
        </span>
      </div>
    </div>
    {overlay && (
      <div className="absolute top-0 left-0 w-full h-full bg-surface">
        {overlay}
      </div>
    )}
  </div>
);
