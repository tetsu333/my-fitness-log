import { memo, FC, useEffect, useState, ChangeEvent, useRef } from "react";
import * as React from "react";

import { useLoginRequired } from "../../hooks/useLoginUser";
import { useCreateRepetition } from "../../hooks/useCreateRepetition";
import { useAllExercises } from "../../hooks/useAllExercises";
import { useRepetitions } from "../../hooks/useRepetitions";
import { ExerciseTypeTranslation } from "../../ExerciseTypes";
import { useDeleteRepetition } from "../../hooks/useDeleteRepetition";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const NewRepetitions: FC = memo(() => {
  const loginUser = useLoginRequired();
  const { createRepetition, loading, createMessage, successful } =
    useCreateRepetition();
  const { getExercises, exercises } = useAllExercises();
  const { getRepetitions, repetitions } = useRepetitions();
  const { deleteRepetition, deleteMessage } = useDeleteRepetition();

  const date = new Date();
  const [exerciseDate, setExerciseDate] = useState<Date>(date);
  const [exerciseType, setExerciseType] = useState<number>(0);
  const [repetitionNum, setRepetitionNum] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const isFirstRender = useRef(false);

  useEffect(() => {
    isFirstRender.current = true;
  }, []);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      setOpen(true);
    }
  }, [successful]);
  useEffect(
    () => getRepetitions(loginUser?.id, exerciseType),
    [createMessage, deleteMessage]
  );
  useEffect(() => getExercises(loginUser?.id), []);

  const onChangeExerciseDate = (e: ChangeEvent<HTMLInputElement>) =>
    setExerciseDate(new Date(e.target.value));
  const onChangeExerciseType = (e: SelectChangeEvent) => {
    setExerciseType(Number(e.target.value));
    getRepetitions(loginUser?.id, Number(e.target.value));
  };
  const onChangerepetitionNum = (e: ChangeEvent<HTMLInputElement>) =>
    setRepetitionNum(Number(e.target.value));
  const onChangeWeight = (e: ChangeEvent<HTMLInputElement>) =>
    setWeight(Number(e.target.value));
  const onClickCreateRepetition = () => {
    createRepetition({
      user_id: loginUser?.id,
      exercise_id: exerciseType,
      repetition_num: repetitionNum,
      weight: weight,
      exercise_date: exerciseDate,
    });
    setRepetitionNum(0);
  };
  const onClickDeleteRepetition = (id: number) => {
    const result = window.confirm("削除しますか？");
    if (result) {
      deleteRepetition(id);
    }
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Grid container p={2} justifyContent="center">
      <Grid
        sx={{ maxWidth: "400px" }}
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Grid container justifyContent="center">
          <h2>記録ページ</h2>
        </Grid>
        <TextField
          fullWidth
          id="date"
          label="筋トレ日"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue={`${exerciseDate.getFullYear()}-${(
            "00" +
            (exerciseDate.getMonth() + 1)
          ).slice(-2)}-${("00" + exerciseDate.getDate()).slice(-2)}`}
          onChange={onChangeExerciseDate}
        />
        <br />
        <br />
        <FormControl fullWidth>
          <InputLabel id="select-label">種目</InputLabel>
          <Select
            labelId="select-label"
            label="種目"
            onChange={onChangeExerciseType}
          >
            {exercises.map((exercise) => (
              <MenuItem key={exercise.id} value={exercise.id}>
                <>
                  {ExerciseTypeTranslation(exercise.exercise_type)}：
                  {exercise.name}
                </>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <TextField
          // inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          fullWidth
          id="outlined-basic"
          label="重量(kg)"
          variant="outlined"
          type="number"
          value={weight}
          onChange={onChangeWeight}
        />
        <br />
        <br />
        <TextField
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          fullWidth
          id="outlined-basic"
          label="回数"
          variant="outlined"
          // type="number"
          value={repetitionNum}
          onChange={onChangerepetitionNum}
        />
        <br />
        <br />
        <Grid container justifyContent="center">
          <Button
            size="large"
            variant="contained"
            endIcon={<AddIcon />}
            onClick={onClickCreateRepetition}
            disabled={exerciseType == 0 || exerciseDate == undefined || loading}
          >
            登録
          </Button>
        </Grid>
        <h3>履歴</h3>
        {repetitions.map((repetition) => (
          <div key={repetition.id}>
            <List>
              <ListItem
                secondaryAction={
                  <IconButton
                    onClick={() => onClickDeleteRepetition(repetition.id)}
                    disabled={loading}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                <ListItemText sx={{ marginRight: "16px" }}>
                  <>
                    {repetition.exercise_date}　{repetition.weight}kg　
                    {repetition.repetition_num}回
                  </>
                </ListItemText>
              </ListItem>
            </List>
          </div>
        ))}
      </Grid>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          登録しました
        </Alert>
      </Snackbar>
    </Grid>
  );
});
