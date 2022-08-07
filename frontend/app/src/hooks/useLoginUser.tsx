import { useContext } from "react";
import { useHistory } from "react-router-dom";

import {
  LoginUserContext,
  LoginUserContextType,
} from "../providers/LoginUserProvider";

export const useLoginUser = (): LoginUserContextType =>
  useContext(LoginUserContext);

export const useLoginRequired = () => {
  const history = useHistory();
  const { loginUser } = useLoginUser();
  if (loginUser == null) history.push("/");
  return loginUser;
};
