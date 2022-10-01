import { memo, FC, useCallback, useEffect, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";

import { useLoginRequired } from "../../hooks/useLoginUser";
import { useAllRepetitionDates } from "../../hooks/useAllRepetitionDates";
import { useDayRepetitions } from "../../hooks/useDayRepetitions";
import { DayRepetitionList } from "../molecules/DayRepetitionList";
import { EventButton } from "../atoms/button/EventButton";

import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export const Home: FC = memo(() => {
  const loginUser = useLoginRequired();
  const history = useHistory();
  const { getRepetitionDates, repetitionDates } = useAllRepetitionDates();
  const { getDayRepetitions, dayRepetitions } = useDayRepetitions();
  const onChangeRepetitionDate = (e: SelectChangeEvent) => {
    getDayRepetitions(loginUser?.id, e.target.value);
  };
  const onClickNewRepetitions = useCallback(
    () => history.push("/home/repetitions/new"),
    [history]
  );

  useEffect(() => getRepetitionDates(loginUser?.id), []);

  return (
    <Grid container justifyContent="center" p={2}>
      <Grid
        sx={{ maxWidth: "400px" }}
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <br />
        <p>{loginUser?.name}の筋トレノート</p>
        <br />
        <EventButton event={onClickNewRepetitions}>記録する</EventButton>
        <br />
        <br />
        <h3>記録表示</h3>
        <br />
        <FormControl fullWidth>
          <InputLabel id="select-label">筋トレ日を選択</InputLabel>
          <Select
            labelId="select-label"
            label="筋トレ日を選択"
            onChange={onChangeRepetitionDate}
          >
            {repetitionDates.map((date, index) => (
              <MenuItem key={index} value={String(date)}>
                {String(date)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <DayRepetitionList dayRepetitions={dayRepetitions} />
      </Grid>
    </Grid>
  );
});
