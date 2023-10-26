import React from "react";

export interface VideoPreviewProperties {
  cover?: string;
  date?: string;
  onClick?: () => void;
}

export const VideoPreview: React.FC<VideoPreviewProperties> = ({
  cover,
  date,
  onClick,
}) => (
  <div className="aspect-video relative">
    <div className="absolute top-0 left-0 w-full h-full">
      <div
        className="relative w-full h-full overflow-hidden cursor-pointer"
        onClick={onClick}
      >
        <div
          className="w-full h-full"
          style={{
            background: `url("${cover}") no-repeat center center / cover`,
          }}
        />
        <div className="absolute p-1 left-0 bottom-0 flex w-full">
          <div className="flex ml-auto">
            {date && (
              <div className="flex px-2 py-1 rounded bg-black/75 text-xs">
                {date}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);
