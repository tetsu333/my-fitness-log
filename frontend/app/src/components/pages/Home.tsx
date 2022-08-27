import { memo, FC, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { useLoginRequired } from "../../hooks/useLoginUser";

export const Home: FC = memo(() => {
  const loginUser = useLoginRequired();
  console.log(loginUser);
  const history = useHistory();
  const onClickRepetitions = useCallback(
    () => history.push("/home/repetitions"),
    [history]
  );

  return (
    <>
      <p>{loginUser?.name}の筋トレノート</p>
      <button onClick={onClickRepetitions}>記録する</button>
    </>
  );
});
