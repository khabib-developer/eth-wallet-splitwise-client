import { useCallback } from "react";
import useAxios from "../services/axios";
import { useAuthStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";

export const useGroupHook = () => {
  const { fetchData } = useAxios();

  const { user, setUser } = useAuthStore();

  const navigate = useNavigate();

  const addUser = useCallback(async () => {
    const res = await fetchData("/group/api/addUser", "POST", {
      groupId: 1,
      userEmail: "mail@mail.mail",
    });

    return res;
  }, []);

  const createGroup = useCallback(async (name: string) => {
    const res = await fetchData("/group/api/create", "POST", {
      name,
    });

    if (res) {
      setUser({ ...user!, groups: [...user!.groups, res] });
    }

    console.log(res);
  }, []);

  const checkForMember = useCallback(async (id: string) => {
    const res = await fetchData(`/group/api/checkForMember/`, "POST", {
      userEmail: user?.email,
      groupId: id,
    });
    if (!res) navigate("/");
  }, []);

  return { addUser, createGroup, checkForMember };
};
