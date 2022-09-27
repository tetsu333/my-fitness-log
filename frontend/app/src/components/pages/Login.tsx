import { memo, FC, useState, ChangeEvent, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

export const Login: FC = memo(() => {
  const { login, loading } = useAuth();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const onChangeUserEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setUserEmail(e.target.value);
  const onChangeUserPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setUserPassword(e.target.value);

  const onClickLogin = () =>
    login({ email: userEmail, password: userPassword });

  const history = useHistory();
  const onClickUserRegister = useCallback(
    () => history.push("/user_register"),
    [history]
  );

  return (
    <>
      <h1>MyFitnessLog</h1>
      <h2>ログイン</h2>
      <input
        type="text"
        placeholder="メールアドレス"
        value={userEmail}
        onChange={onChangeUserEmail}
      ></input>
      <input
        type="text"
        placeholder="パスワード"
        value={userPassword}
        onChange={onChangeUserPassword}
      ></input>
      <button
        onClick={onClickLogin}
        disabled={userEmail == "" || userPassword == "" || loading}
      >
        ログイン
      </button>
      <p>ブラウザ情報：{window.navigator.userAgent}</p>
      <h2 onClick={onClickUserRegister}>新規ユーザー登録はこちら</h2>
    </>
  );
});
