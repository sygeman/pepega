import Image from "next/image";
import React from "react";

export interface AvatarProperties {
  avatar?: null | string;
  onClick?: () => void;
}

export const Avatar: React.FC<AvatarProperties> = ({ avatar, onClick }) => (
  <div className="relative w-8 h-8">
    <div className="h-8 w-8 rounded-full overflow-hidden" onClick={onClick}>
      {avatar && <Image alt="" height={32} src={avatar} width={32} />}
    </div>
  </div>
);
