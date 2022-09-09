import { useCallback, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { Login } from "../types/api/login";
import { User } from "../types/api/user";
import { useLoginUser } from "./useLoginUser";

export const useAuth = () => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const { setLoginUser } = useLoginUser();

  const login = useCallback(
    (data: Login) => {
      setLoading(true);

      axios
        .post<User>("http://localhost:3001/api/v1/login", data, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data) {
            setLoginUser(res.data);
            alert("ログインしました");
            history.push("/home");
          } else {
            alert("ユーザーが見つかりません");
            setLoading(false);
          }
        })
        .catch(() => {
          alert("ログインできません");
          setLoading(false);
        });
    },
    [history, setLoginUser]
  );

  const logout = useCallback(() => {
    axios
      .delete("http://localhost:3001/api/v1/logout", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        alert("ログアウトしました");
        history.push("/");
      })
      .catch(() => {
        alert("ログアウトできません");
      });
  }, [history]);
  return { login, loading, logout };
};
