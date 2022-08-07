import { memo, FC } from "react";

import { useLoginUser } from "../../hooks/useLoginUser";
import { useLoginRequired } from "../../hooks/useLoginUser";

export const Exercises: FC = memo(() => {
  const { loginUser } = useLoginUser();
  console.log(loginUser);
  useLoginRequired();

  return <p>種目ページです</p>;
});
