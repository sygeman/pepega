import Image from "next/image";

export const Avatar = ({
  avatar,
  onClick,
}: {
  avatar?: string | null;
  onClick?: () => void;
}) => (
  <div className="relative w-8 h-8">
    <div className="h-8 w-8 rounded-full overflow-hidden" onClick={onClick}>
      {avatar && (
        <Image
          height={32}
          width={32}
          className="h-full w-full"
          alt=""
          src={avatar}
        />
      )}
    </div>
  </div>
);
