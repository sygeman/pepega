export const TwitchClipPlayer = ({
  sourceId,
  autoPlay,
}: {
  autoPlay?: boolean;
  sourceId?: string;
}) => (
  <div className="aspect-video relative">
    <div className=" absolute top-0 left-0 w-full h-full">
      <iframe
        title="twitch-player"
        className="w-full h-full relative"
        src={`https://clips.twitch.tv/embed?clip=${sourceId}&muted=false&autoplay=${
          autoPlay ? "true" : "false"
        }&parent=${window?.location?.hostname}`}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  </div>
);
