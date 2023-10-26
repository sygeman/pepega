"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const AddClip = ({ isUser }: { isUser: boolean }) => {
  const searchParameters = useSearchParams();
  const pathname = usePathname();

  const addClipLink = useMemo(() => {
    const nextParameters = new URLSearchParams([...searchParameters.entries()]);

    if (isUser) {
      nextParameters.set("newClip", "1");
    } else {
      nextParameters.set("authModal", "1");
    }

    return `${pathname}?${nextParameters?.toString()}`;
  }, [isUser, searchParameters, pathname]);

  return (
    <div className="flex w-full px-4">
      <Link className="w-full" href={addClipLink} passHref>
        <Button className="w-full" size="sm" variant="default">
          Предложить клип
        </Button>
      </Link>
    </div>
  );
};
