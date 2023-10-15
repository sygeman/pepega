import React from "react";

export interface VideoPreviewProperties {
  onClick?: () => void;
  cover?: string;
  date?: string;
}

export const VideoPreview: React.FC<VideoPreviewProperties> = ({
  onClick,
  cover,
  date,
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
