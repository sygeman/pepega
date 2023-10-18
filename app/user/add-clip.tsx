"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { Button } from "@/components/button";

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
      <Link href={addClipLink} passHref className="w-full">
        <Button variant="primary" className="w-full">
          Предложить клип
        </Button>
      </Link>
    </div>
  );
};
