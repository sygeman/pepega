"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const RangeFilter = ({ value = "all" }) => {
  const searchParameters = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const onValueChange = (value: string) => {
    const nextParameters = new URLSearchParams([...searchParameters.entries()]);
    nextParameters.set("range", value);
    router.push(`${pathname}?${nextParameters?.toString()}`);
  };

  return (
    <Tabs onValueChange={onValueChange} value={value}>
      <TabsList>
        <TabsTrigger value="24h">24 часа</TabsTrigger>
        <TabsTrigger value="7d">7 дней</TabsTrigger>
        <TabsTrigger value="30d">30 дней</TabsTrigger>
        <TabsTrigger value="all">Все</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
