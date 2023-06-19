import { useCallback } from "react";
import useAxios from "../services/axios";
import { ITransaction } from "../types/interface";
import { useAuthStore } from "../store/auth.store";

export const useTransaction = () => {
  const { fetchData } = useAxios();

  const { user } = useAuthStore();

  const sendTransaction = useCallback(async (transaction: ITransaction) => {
    return await fetchData("/user/api/sendMoney", "POST", transaction);
  }, []);

  const getAddress = useCallback(async (password: string) => {
    return await fetchData("/user/api/getAccountKeys", "POST", {
      email: user?.email,
      password,
    });
  }, []);

  return { sendTransaction, getAddress };
};
