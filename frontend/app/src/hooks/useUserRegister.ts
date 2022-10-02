import { useCallback, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { User } from "../types/api/user";
import { UserRegister } from "../types/api/user";
import { useLoginUser } from "./useLoginUser";
import { RootURL } from "../RequestTypes";

export const useUserRegister = () => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const { setLoginUser } = useLoginUser();

  const register = useCallback(
    (data: UserRegister) => {
      setLoading(true);
      axios
        .post<User>(`${RootURL}api/v1/users`, data, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data) {
            setLoginUser(res.data);
            alert(`ようこそ！${res.data.name}さん`);
            history.push("/home");
          } else {
            setLoading(false);
          }
        })
        .catch((res) => {
          alert(res.response.data);
          setLoading(false);
        });
    },
    [history, setLoginUser]
  );
  return { register, loading };
};
