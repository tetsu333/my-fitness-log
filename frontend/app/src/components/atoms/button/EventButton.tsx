import { FC, memo } from "react";

import Button from "@mui/material/Button";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

export const EventButton: FC<{
  children: string;
  event: () => void;
}> = memo((props) => {
  const { children, event } = props;
  return (
    <Button variant="contained" endIcon={<FitnessCenterIcon />} onClick={event}>
      {children}
    </Button>
  );
});
