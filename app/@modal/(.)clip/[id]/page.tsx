import { ClipModal } from "./clip-modal";

export default function PhotoModal({
  params: { id: clipId },
}: {
  params: { id: string };
}) {
  return <ClipModal clipId={clipId} />;
}
