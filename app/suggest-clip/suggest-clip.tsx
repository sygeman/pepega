"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { CoinIconGold } from "@/components/coin-icon";
import { Input } from "@/components/input";
import { Modal } from "@/components/modal";
import { TwitchClipPlayer } from "@/components/twitch-clip-player";
import { Button } from "@/components/ui/button";
import { CHANGE_SCORE_COST } from "@/server/actions/clip-score/constants";
import { increaseClipScoreMutationAction } from "@/server/actions/clip-score/increase";
import { useModal } from "@/utils/use-modal";

import { parseSource } from "./parse-source";

export const SuggestClip = () => {
  const router = useRouter();
  const modalProperties = useModal();
  const [clipId, setClipId] = useState("");

  const increaseClipScore = useCallback(async () => {
    await increaseClipScoreMutationAction(clipId);
    router.push(`/clip/${clipId}`);
  }, [clipId, router]);

  return (
    <Modal id="newClip" {...modalProperties}>
      <div className="w-[600px] bg-surface p-4 rounded overflow-hidden">
        <Input
          autoFocus
          placeholder="Ссылка на Twitch клип"
          onChange={(event) => {
            const soruceData = parseSource(event.target.value);
            if (!soruceData?.payload?.sourceId) return;
            setClipId(soruceData.payload.sourceId);
          }}
        />
        {clipId && <TwitchClipPlayer sourceId={clipId} />}
        <div className="mt-5 flex justify-end">
          {CHANGE_SCORE_COST > 0 && (
            <div className="flex px-5 items-center">
              <CoinIconGold /> {CHANGE_SCORE_COST}
            </div>
          )}
          <Button variant="default" size="sm" onClick={increaseClipScore}>
            Предложить
          </Button>
        </div>
      </div>
    </Modal>
  );
};
