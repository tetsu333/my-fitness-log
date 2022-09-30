import { memo, FC, useState, ChangeEvent } from "react";
import { useLocation } from "react-router-dom";

import { useLoginRequired } from "../../hooks/useLoginUser";
import { UpdateExercise } from "../../types/api/exercise";
import { ExerciseTypes } from "../../ExerciseTypes";
import { useUpdateExercise } from "../../hooks/useUpdateExercise";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

export const EditRepetitions: FC = memo(() => {
  const loginUser = useLoginRequired();
  console.log(loginUser);
  const location = useLocation();
  const state = location.state as UpdateExercise;
  const { updateExercise } = useUpdateExercise();
  const [exerciseType, setExerciseType] = useState<string | number>(
    state.exercise_type
  );
  const [exerciseName, setExerciseName] = useState<string>(state.name);
  const onChangeExerciseType = (e: ChangeEvent<HTMLSelectElement>) =>
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
    <>
      <p>更新ページ</p>
      <select
        onChange={onChangeExerciseType}
        defaultValue={state.exercise_type}
      >
        <option value="">部位を選択</option>
        {ExerciseTypes.map((typeName) => (
          <option value={typeName.en} key={typeName.en}>
            {typeName.ja}
          </option>
        ))}
      </select>
      <br />
      <br />
      <TextField
        id="outlined-basic"
        label="種目名"
        variant="outlined"
        type="text"
        value={exerciseName}
        onChange={onChangeExerciseName}
      />
      <br />
      <br />
      <Button
        variant="contained"
        endIcon={<ChangeCircleIcon />}
        onClick={onClickUpdateExercise}
        disabled={exerciseType == "" || exerciseName == ""}
      >
        更新
      </Button>
    </>
  );
});
