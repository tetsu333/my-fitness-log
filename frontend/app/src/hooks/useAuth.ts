import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { Login } from "../types/api/login";
import { User } from "../types/api/user";
import { useLoginUser } from "./useLoginUser";
import { RootURL } from "../RequestTypes";

export const useAuth = () => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const { setLoginUser } = useLoginUser();

  const login = useCallback(
    (data: Login) => {
      setLoading(true);
      axios
        .post<User>(`${RootURL}api/v1/login`, data, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data) {
            setLoginUser(res.data);
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
      .delete(`${RootURL}api/v1/logout`, {
        withCredentials: true,
      })
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        alert("ログアウトできません");
      });
  }, [history]);
  return { login, loading, logout };
};
