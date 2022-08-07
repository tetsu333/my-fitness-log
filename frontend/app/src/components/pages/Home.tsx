import { memo, FC } from "react";

import { useLoginRequired } from "../../hooks/useLoginUser";

export const Home: FC = memo(() => {
  const loginUser = useLoginRequired();
  console.log(loginUser);

  return <p>HOMEページです</p>;
});
