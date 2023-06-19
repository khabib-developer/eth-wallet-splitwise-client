import { currencies } from "./enum";
import { GroupUser } from "./type";

export interface IForm {
  name?: string;
  email: string;
  password: string;
}

export interface IAuthStore {
  token: string | null;
  setToken: (token: string | null) => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export interface INotificationStore {
  info: string | null;
  setInfo: (token: string | null) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export interface IUser {
  name: string;
  email: string;
  balance?: any;
  groups: IGroup[];
}

export interface IApp {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  rate: IRate;
  setRate: (rate: IRate) => void;
}

export interface IRate {
  [currencies.usd]: number;
  [currencies.uzs]: number;
  [currencies.eth]: number;
}

export interface ITransaction {
  to: string;
  amount: string;
  password: string;
}

export interface IKey {
  publicKey: string;
  privateKey: string;
}

export interface IGroup {
  id: number;
  name: string;
  users?: GroupUser[];
}
