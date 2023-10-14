"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/button";
import { useAccess } from "@/utils/use-access";

export const AddClip = () => {
  const router = useRouter();
  const [{ allow: isUser, loading }] = useAccess();

  if (loading) return;

  return (
    <div className="flex w-full px-4">
      <Link
        href={{
          pathname: router.route,
          query: {
            ...router.query,
            [isUser ? "newClip" : "authModal"]: 1,
          },
        }}
        passHref
        className="w-full"
      >
        <Button variant="primary" className="w-full">
          Предложить клип
        </Button>
      </Link>
    </div>
  );
};
