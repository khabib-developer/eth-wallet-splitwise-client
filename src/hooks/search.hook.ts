import { useCallback } from "react";
import useAxios from "../services/axios";

export const useSearch = () => {
  const { fetchData } = useAxios();

  const search = useCallback(async (email: string) => {
    const res = await fetchData("/user/api/searchByEmail", "POST", { email });
    return res;
  }, []);

  return { search };
};
