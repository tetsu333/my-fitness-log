import { memo, FC } from "react";

import { useLoginRequired } from "../../hooks/useLoginUser";

export const Exercises: FC = memo(() => {
  const loginUser = useLoginRequired();
  console.log(loginUser);

  return <p>種目ページです</p>;
});
