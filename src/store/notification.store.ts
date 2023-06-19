import { create } from "zustand";
import { INotificationStore } from "../types/interface";

export const useNotificationStore = create<INotificationStore>((set) => ({
  info: null,
  setInfo: (info: null | string) => {
    return set({ info });
  },
  error: null,
  setError: (error: string | null) => set({ error }),
}));
