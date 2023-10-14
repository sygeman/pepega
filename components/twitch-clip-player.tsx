import React from "react";

export interface TwitchClipPlayerProperties {
  autoPlay?: boolean;
  sourceId?: string;
}

export const TwitchClipPlayer: React.FC<TwitchClipPlayerProperties> = ({
  sourceId,
  autoPlay,
}) => (
  <div className="aspect-video relative">
    <div className=" absolute top-0 left-0 w-full h-full">
      <iframe
        title="twitch-player"
        className="w-full h-full relative"
        src={`https://clips.twitch.tv/embed?clip=${sourceId}&muted=false&autoplay=${
          autoPlay ? "true" : "false"
        }&parent=${window?.location?.hostname}`}
        allowFullScreen
      />
    </div>
  </div>
);
