import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import useAxios from "../services/axios";
import { IForm } from "../types/interface";
import { useAppStore } from "../store/app.store";

export const useAuth = () => {
  const { setUser, setToken } = useAuthStore();

  const { loading, setLoading } = useAppStore();

  const navigate = useNavigate();

  const { fetchData } = useAxios();

  const auth = useCallback(
    async (data: IForm, url: string) => {
      const userData = await fetchData(`/auth/${url}`, "POST", data);
      setLoading(true);
      if (userData) {
        setToken(userData.token);
        setUser(userData.user);
        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 800);
        return;
      }
      setLoading(false);
    },
    [fetchData, navigate, setToken, setUser]
  );

  const check = useCallback(async () => {
    const userData = await fetchData(`/auth/check`, "GET");
    setUser(userData);
    return userData;
  }, [fetchData, setUser]);

  const logout = useCallback(async () => {
    setToken(null);
    setUser(null);
    navigate("/login");
  }, [navigate, setToken, setUser]);

  return { auth, logout, check };
};
