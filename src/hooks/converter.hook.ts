import { useCallback } from "react";
import { useAppStore } from "../store/app.store";

export const useConverter = () => {
  const { setRate } = useAppStore();
  const getRate = useCallback(async () => {
    const res = await fetch(
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,UZS,ETH"
    );

    const data = await res.json();
    setRate(data);
  }, [setRate]);

  return { getRate };
};
