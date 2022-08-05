import { useCallback, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { User } from "../types/api/user";
import { UserRegister } from "../types/api/userRegister";
import { useLoginUser } from "./useLoginUser";

export const useUserRegister = () => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const { setLoginUser } = useLoginUser();

  const register = useCallback(
    (data: UserRegister) => {
      setLoading(true);

      axios
        .post<User>("http://localhost:3001/api/v1/users", data)
        .then((res) => {
          if (res.data) {
            setLoginUser(res.data);
            alert("ユーザーを作成しました");
            history.push("/home");
          } else {
            alert("error");
            setLoading(false);
            history.push("/home");
          }
        })
        .catch((res) => {
          alert("ユーザーを作成できません");
          console.log(res);
          setLoading(false);
        });
    },
    [history, setLoginUser]
  );
  return { register, loading };
};
