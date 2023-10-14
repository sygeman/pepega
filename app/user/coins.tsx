import { useQuery } from "@tanstack/react-query";

import { CoinIconGold } from "@/components/coin-icon";
import { userCoinsQueryAction } from "@/server/actions/user-coins";
import { humanNumbers, shortNumbers } from "@/utils/count";

export const Coins = () => {
  const userCoinsQuery = useQuery({
    queryKey: ["userCoins"],
    queryFn: userCoinsQueryAction,
    refetchInterval: 3000,
  });
  const userCoins = userCoinsQuery?.data || 0;

  return (
    <div className="flex items-center justify-center h-10 w-full text-sm font-medium text-white/90">
      <CoinIconGold />
      <span title={humanNumbers(userCoins)}>{shortNumbers(userCoins)}</span>
    </div>
  );
};
