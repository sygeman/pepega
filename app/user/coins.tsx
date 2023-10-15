import { useCallback, useEffect, useState } from "react";

import { CoinIconGold } from "@/components/coin-icon";
import { userCoinsQueryAction } from "@/server/actions/user-coins";
import { humanNumbers, shortNumbers } from "@/utils/count";

export const Coins = () => {
  const [userCoins, setUserCoins] = useState(0);

  const updateUserCoins = useCallback(() => {
    userCoinsQueryAction().then((value) => setUserCoins(value));
  }, []);

  useEffect(() => {
    const interval = setInterval(updateUserCoins, 3000);
    updateUserCoins();
    return () => clearInterval(interval);
  }, [updateUserCoins]);

  return (
    <div className="flex items-center justify-center h-10 w-full text-sm font-medium text-white/90">
      <CoinIconGold />
      <span title={humanNumbers(userCoins)}>{shortNumbers(userCoins)}</span>
    </div>
  );
};
