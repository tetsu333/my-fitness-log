import { memo, FC } from "react";

import { useLoginRequired } from "../../hooks/useLoginUser";

export const Repetitions: FC = memo(() => {
  const loginUser = useLoginRequired();
  console.log(loginUser);

  return <p>回数ページです</p>;
});
