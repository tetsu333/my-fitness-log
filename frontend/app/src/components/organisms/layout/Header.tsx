import { memo, FC, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export const Header: FC = memo(() => {
  const history = useHistory();
  const onClickHome = useCallback(() => history.push("/home"), [history]);
  const onClickExercises = useCallback(
    () => history.push("/home/exercises"),
    [history]
  );
  const onClickRepetitions = useCallback(
    () => history.push("/home/repetitions"),
    [history]
  );
  const { logout } = useAuth();

  return (
    <>
      <div onClick={onClickHome}>
        <h1>MyFitnessLog</h1>
      </div>
      <div>
        <h2 onClick={onClickExercises}>種目</h2>
        <h2 onClick={onClickRepetitions}>回数</h2>
        <button onClick={() => logout()}>ログアウト</button>
      </div>
    </>
  );
});
