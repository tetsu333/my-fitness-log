import { memo, FC, useState, ChangeEvent } from "react";
import { useLocation } from "react-router-dom";

import { useLoginRequired } from "../../hooks/useLoginUser";
import { UpdateExercise } from "../../types/api/exercise";
import { ExerciseTypes } from "../../ExerciseTypes";
import { useUpdateExercise } from "../../hooks/useUpdateExercise";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export const EditExercise: FC = memo(() => {
  const loginUser = useLoginRequired();
  const location = useLocation();
  const state = location.state as UpdateExercise;
  const { updateExercise } = useUpdateExercise();
  const [exerciseType, setExerciseType] = useState<string | number>(
    state.exercise_type
  );
  const [exerciseName, setExerciseName] = useState<string>(state.name);
  const onChangeExerciseType = (e: SelectChangeEvent) =>
    setExerciseType(e.target.value);
  const onChangeExerciseName = (e: ChangeEvent<HTMLInputElement>) =>
    setExerciseName(e.target.value);
  const onClickUpdateExercise = () => {
    updateExercise({
      exercise_id: state.exercise_id,
      name: exerciseName,
      exercise_type: exerciseType,
    });
  };

  return (
    <Grid p={2} container justifyContent="center">
      <Grid
        sx={{ maxWidth: "400px" }}
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Grid container justifyContent="center">
          <h3>更新ページ</h3>
        </Grid>
        <FormControl fullWidth>
          <InputLabel id="select-label">部位を選択</InputLabel>
          <Select
            labelId="select-label"
            label="部位を選択"
            onChange={onChangeExerciseType}
            value={String(exerciseType)}
          >
            {ExerciseTypes.map((typeName) => (
              <MenuItem value={typeName.en} key={typeName.en}>
                {typeName.ja}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <TextField
          fullWidth
          id="outlined-basic"
          label="種目名"
          variant="outlined"
          type="text"
          value={exerciseName}
          onChange={onChangeExerciseName}
        />
        <br />
        <br />
        <Grid container justifyContent="center">
          <Button
            size="large"
            variant="contained"
            endIcon={<ChangeCircleIcon />}
            onClick={onClickUpdateExercise}
            disabled={exerciseType == "" || exerciseName == ""}
          >
            更新
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
});
