import { memo, FC, useState, ChangeEvent } from "react";
import { useUserRegister } from "../../hooks/useUserRegister";

export const UserRegister: FC = memo(() => {
  const { register, loading } = useUserRegister();
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) =>
    setUserName(e.target.value);
  const onChangeUserEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setUserEmail(e.target.value);
  const onChangeUserPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setUserPassword(e.target.value);

  const onClickRegister = () =>
    register({
      name: userName,
      email: userEmail,
      password: userPassword,
    });

  return (
    <>
      <h1>MyFitnessLogユーザー登録</h1>
      <input
        type="text"
        placeholder="ユーザー名"
        value={userName}
        onChange={onChangeUserName}
      ></input>
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
        onClick={onClickRegister}
        disabled={
          userName == "" || userEmail == "" || userPassword == "" || loading
        }
      >
        登録
      </button>
    </>
  );
});
