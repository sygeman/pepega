"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { Button } from "@/components/button";
import { useAccess } from "@/utils/use-access";

export const AddClip = () => {
  const searchParameters = useSearchParams();
  const pathname = usePathname();
  const [{ allow: isUser, loading }] = useAccess();

  const addClipLink = useMemo(() => {
    const nextParameters = new URLSearchParams([...searchParameters.entries()]);

    if (isUser) {
      nextParameters.set("newClip", "1");
    } else {
      nextParameters.set("authModal", "1");
    }

    return `${pathname}?${nextParameters?.toString()}`;
  }, [isUser, searchParameters, pathname]);

  if (loading) return;

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
