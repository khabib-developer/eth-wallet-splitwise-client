/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from "react-router-dom";
import SignIn from "./auth/sign-in";
import { SignUp } from "./auth/sign-up";
import { Main } from "./main";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/auth.hook";
import { useAuthStore } from "../store/auth.store";
import { Transaction } from "./transaction";
import { pages } from "../types/enum";
import { SplitWise } from "./splitwise";
import { useConverter } from "../hooks/converter.hook";
import { GroupPage } from "./splitwise/group";

export const Pages: React.FC = () => {
  const { check, logout } = useAuth();
  const { token } = useAuthStore();
  const [permission, setPermission] = useState(false);
  const { getRate } = useConverter();
  useEffect(() => {
    (async function () {
      await getRate();
      if (token) {
        const data = await check();
        if (!data) return logout();
        setPermission(true);
        return;
      }
      logout();
    })();
  }, []);

  return (
    <Routes>
      {permission && (
        <>
          <Route path={pages.home} element={<Main />} />
          <Route path={pages.transaction} element={<Transaction />} />
          <Route path={pages.splitwise} element={<SplitWise />} />
          <Route path={`${pages.splitwise}/:group`} element={<GroupPage />} />
        </>
      )}
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
  );
};
