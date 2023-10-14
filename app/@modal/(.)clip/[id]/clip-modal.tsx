"use client";
import { useSearchParams } from "next/navigation";

import { Modal } from "@/components/modal";
import { useModal } from "@/utils/use-modal";

import { Clip } from "./index";

export const ClipModal = () => {
  const searchParameters = useSearchParams();
  const modalProperties = useModal();
  const clipId = searchParameters.get("clipId") || "";

  return (
    <Modal id="clipId" {...modalProperties}>
      <div
        className="max-w-[1000px] min-w-[320px] w-[1000px] rounded overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <Clip clipId={clipId} autoPlay />
      </div>
    </Modal>
  );
};
