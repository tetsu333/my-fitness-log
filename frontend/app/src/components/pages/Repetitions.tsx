import { memo, FC } from "react";

import { useLoginUser } from "../../hooks/useLoginUser";
import { useLoginRequired } from "../../hooks/useLoginUser";

export const Repetitions: FC = memo(() => {
  const { loginUser } = useLoginUser();
  console.log(loginUser);
  useLoginRequired();

  return <p>回数ページです</p>;
});
