"use client";

import { Clip } from "@/components/clip/clip";
import { Modal } from "@/components/modal";
import { useRouter } from "next/navigation";

export const ClipModal = ({ clipId }: { clipId: string }) => {
  const router = useRouter();

  return (
    <Modal id="clipId" isOpen={() => true} onClose={() => router.back()}>
      <div
        className="max-w-[1000px] min-w-[320px] w-[1000px] rounded overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <Clip autoPlay clipId={clipId} />
      </div>
    </Modal>
  );
};
