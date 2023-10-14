import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useModal = () => {
  const router = useRouter();
  const searchParameters = useSearchParams();
  const pathname = usePathname();

  const isOpen = (id: string) => searchParameters.has(id);

  const onClose = (id: string) => {
    const newParameters = new URLSearchParams([...searchParameters.entries()]);
    newParameters.delete(id);

    router.push(`${pathname}?${newParameters?.toString()}`);
  };

  return { isOpen, onClose };
};
