"use client";

import { useAccess } from "@/utils/use-access";
import { useRef } from "react";

export const ClipCommentBottom = ({ clipId }: { clipId: string }) => {
  const textInput = useRef<HTMLInputElement>(null);
  const [{ allow: isAllow }] = useAccess();
  let lock = false;

  // const [createClipComment] = useCreateClipCommentMutation({
  //   onCompleted: (data) => {
  //     if (data.createClipComment && textInput.current) {
  //       textInput.current.value = '';
  //       lock = false;
  //     }
  //   },
  // });

  return (
    <div className="h-16 flex relative">
      <input
        className="w-[calc(100%-20px)] px-4 h-8 bg-background rounded text-sm outline-none m-2"
        disabled={!isAllow}
        maxLength={500}
        onKeyPress={(event) => {
          if (!textInput.current) return;

          const content = textInput.current.value.trim();

          if (event.key === "Enter" && !lock && content.length > 0) {
            lock = true;
            // createClipComment({
            //   variables: { input: { clipId, content } },
            // });
          }
        }}
        placeholder={
          isAllow
            ? "Написать комментарий..."
            : "Войдите чтобы писать комментарии"
        }
        ref={textInput}
        type="text"
      />
    </div>
  );
};
