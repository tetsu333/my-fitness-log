import { memo, FC } from "react";
import { useLoginUser } from "../../hooks/useLoginUser";

export const Repetitions: FC = memo(() => {
  const { loginUser } = useLoginUser();
  console.log(loginUser);

  return <p>回数ページです</p>;
});
