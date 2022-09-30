import { memo, FC, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const Header: FC = memo(() => {
  const history = useHistory();
  const onClickHome = useCallback(() => history.push("/home"), [history]);
  const onClickExercises = useCallback(
    () => history.push("/home/exercises"),
    [history]
  );
  const { logout } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={onClickHome}
          >
            MyFitnessLog
          </Typography>
          <Button color="inherit" onClick={onClickExercises}>
            種目一覧
          </Button>
          <Button color="inherit" onClick={() => logout()}>
            ログアウト
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
});
