// import { useRouter } from "next/navigation";

// import { Clip } from "@/components/clip";

export default function ClipPage({
  params: { id: clipId },
}: {
  params: { id: string };
}) {
  return `Clip Page ${clipId}`;
}

// const ClipPage = () => {
//   return "Clip page";

// const {
//   query: { id: clipId },
// } = useRouter();

// if (typeof clipId !== "string") return;

// return (
//   <div className="flex w-full justify-center">
//     <div className="flex flex-1 m-4 max-w-[1200px]">
//       <div className="flex flex-1 px-5">
//         <Clip clipId={clipId} />
//       </div>
//       <div className="w-80 mr-2 hidden xl:flex" />
//     </div>
//   </div>
// );
// };
