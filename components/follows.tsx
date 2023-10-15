import Image from "next/image";
import Link from "next/link";

export function Follows() {
  //   const { data } = useQuery(undefined, {
  //     refetchOnWindowFocus: false,
  //     staleTime: Number.POSITIVE_INFINITY,
  //   });

  //   const channels: any[] = data || [];
  const channels: any[] = [];

  return (
    <div className="flex flex-1 w-full">
      <div className="w-full text-sm font-medium">
        {channels.map((channel: any) => (
          <Link
            key={channel.id}
            href={`/${channel.id}`}
            passHref
            className="flex w-full h-10 items-center hover:bg-background"
          >
            <Image
              width={24}
              height={24}
              className="h-6 w-6 mx-4 rounded-full"
              src={channel.profile_image_url}
              alt=""
            />

            <div>{channel.display_name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
