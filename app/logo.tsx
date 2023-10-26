import Image from "next/image";
import Link from "next/link";

export const Logo = () => (
  <Link
    className="flex shrink-0 items-center h-10 bg-primary mb-2 px-2"
    href="/"
  >
    <Image alt="" className="mx-4" height={16} src="/logo.svg" width={16} />
    <div className="text-sm tracking-wider text-white/80 font-medium">
      PepegaCom
    </div>
  </Link>
);
