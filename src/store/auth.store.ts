import { create } from "zustand";
import { IAuthStore } from "../types/interface";
import { localStorageToken } from "../types/constants";

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  setUser: (user: any) => {
    return set({ user });
  },
  token: localStorage.getItem(localStorageToken),
  setToken: (token: null | string) => {
    console.log(token);
    if (token) localStorage.setItem(localStorageToken, token);
    else localStorage.removeItem(localStorageToken);
    return set({ token: token });
  },
}));
