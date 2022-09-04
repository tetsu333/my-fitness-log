import { FC, memo } from "react";

export const EventButton: FC<{
  children: string;
  event: () => void;
}> = memo((props) => {
  const { children, event } = props;
  return <button onClick={event}>{children}</button>;
});
