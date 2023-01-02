import Image from "next/image";
import React from "react";

export interface AvatarProps {
  avatar?: string | null;
  onClick?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({ avatar, onClick }) => (
  <div className="relative w-8 h-8">
    <div className="h-8 w-8 rounded-full overflow-hidden" onClick={onClick}>
      {avatar && <Image height={32} width={32} alt="" src={avatar} />}
    </div>
  </div>
);
