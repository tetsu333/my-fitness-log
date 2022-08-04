import { memo, FC } from "react";
import { useLoginUser } from "../../hooks/useLoginUser";

export const Exercises: FC = memo(() => {
  const { loginUser } = useLoginUser();
  console.log(loginUser);

  return <p>種目ページです</p>;
});
