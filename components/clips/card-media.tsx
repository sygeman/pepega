"use client";

import { type ReactNode } from "react";

import { shortNumbers } from "@/utils/count";

interface CardMediaProperties {
  media?: ReactNode;
  avatar?: string;
  title?: string;
  description?: string;
  descriptionLink?: string;
  overlay?: ReactNode;
  count?: number;
  countIcon?: ReactNode;
}

export const CardMedia = ({
  media,
  title,
  overlay,
  count = 0,
}: CardMediaProperties) => (
  <div className="flex flex-col items-center rounded overflow-hidden relative">
    <div className="relative w-full aspect-video bg-surface/50">{media}</div>
    <div className="flex bg-surface w-full h-12 px-1 text-sm">
      <div
        className="flex flex-1 h-full items-center px-2 truncate"
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
