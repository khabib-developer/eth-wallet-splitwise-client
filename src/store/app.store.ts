import { create } from "zustand";
import { IApp, IRate } from "../types/interface";
import { currencies } from "../types/enum";

export const useAppStore = create<IApp>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => {
    return set({ loading });
  },
  rate: {
    [currencies.usd]: 0,
    [currencies.uzs]: 0,
    [currencies.eth]: 0,
  },
  setRate: (rate: IRate) => {
    return set({ rate });
  },
}));
