import { memo, FC, useEffect, useState, ChangeEvent, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { useLoginRequired } from "../../hooks/useLoginUser";
import { useAllExercises } from "../../hooks/useAllExercises";
import { Exercise } from "../../types/api/exercise";
import { ExerciseTypes } from "../../ExerciseTypes";
import { useCreateExercise } from "../../hooks/useCreateExercise";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";

export const Exercises: FC = memo(() => {
  const loginUser = useLoginRequired();
  const history = useHistory();
  const { createExercise, createMessage } = useCreateExercise();
  const { getExercises, loading, exercises } = useAllExercises();
  const [exerciseType, setExerciseType] = useState<string>("");
  const [exerciseName, setExerciseName] = useState<string>("");

  useEffect(() => getExercises(loginUser?.id), [createMessage]);

  const onChangeExerciseType = (e: SelectChangeEvent) =>
    setExerciseType(e.target.value);
  const onChangeExerciseName = (e: ChangeEvent<HTMLInputElement>) =>
    setExerciseName(e.target.value);
  const onClickCreateExercise = () => {
    createExercise({
      user_id: loginUser?.id,
      name: exerciseName,
      exercise_type: exerciseType,
    });
    setExerciseType("");
    setExerciseName("");
  };
  const onClickEdit = useCallback(
    (
      exercise_id: number,
      name: string,
      memo: string,
      exercise_type: string | number
    ) =>
      history.push("/home/exercise/edit", {
        exercise_id: exercise_id,
        name: name,
        memo: memo,
        exercise_type: exercise_type,
      }),
    [history]
  );

  let chest: Array<Exercise> = [];
  let back: Array<Exercise> = [];
  let leg: Array<Exercise> = [];
  let shoulder: Array<Exercise> = [];
  let arm: Array<Exercise> = [];
  let abdominal: Array<Exercise> = [];
  exercises.forEach((e) => {
    if (e.exercise_type == "chest") {
      chest.push(e);
    } else if (e.exercise_type == "back") {
      back.push(e);
    } else if (e.exercise_type == "leg") {
      leg.push(e);
    } else if (e.exercise_type == "shoulder") {
      shoulder.push(e);
    } else if (e.exercise_type == "arm") {
      arm.push(e);
    } else if (e.exercise_type == "abdominal") {
      abdominal.push(e);
    }
  });

  return (
    <>
      {loading ? (
        <p>Laoding...</p>
      ) : (
        <Grid
          p={2}
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Grid
            sx={{ maxWidth: "400px" }}
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Grid container justifyContent="center">
              <h3>登録種目一覧</h3>
            </Grid>
            <FormControl fullWidth>
              <InputLabel id="select-label">部位を選択</InputLabel>
              <Select
                labelId="select-label"
                label="部位を選択"
                onChange={onChangeExerciseType}
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
                endIcon={<AddIcon />}
                onClick={onClickCreateExercise}
                disabled={exerciseType == "" || exerciseName == "" || loading}
              >
                登録
              </Button>
            </Grid>
          </Grid>
          <h3>胸部</h3>
          <List>
            {chest.map((e) => (
              <ListItem
                key={e.id}
                disableGutters
                secondaryAction={
                  <IconButton
                    aria-label="edit"
                    onClick={() =>
                      onClickEdit(e.id, e.name, e.memo, e.exercise_type)
                    }
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                <ListItemText>{e.name}</ListItemText>
              </ListItem>
            ))}
          </List>
          <h3>背部</h3>
          <List>
            {back.map((e) => (
              <ListItem
                key={e.id}
                disableGutters
                secondaryAction={
                  <IconButton
                    aria-label="edit"
                    onClick={() =>
                      onClickEdit(e.id, e.name, e.memo, e.exercise_type)
                    }
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                <ListItemText>{e.name}</ListItemText>
              </ListItem>
            ))}
          </List>
          <h3>脚部</h3>
          <List>
            {leg.map((e) => (
              <ListItem
                key={e.id}
                disableGutters
                secondaryAction={
                  <IconButton
                    aria-label="edit"
                    onClick={() =>
                      onClickEdit(e.id, e.name, e.memo, e.exercise_type)
                    }
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                <ListItemText>{e.name}</ListItemText>
              </ListItem>
            ))}
          </List>
          <h3>肩部</h3>
          <List>
            {shoulder.map((e) => (
              <ListItem
                key={e.id}
                disableGutters
                secondaryAction={
                  <IconButton
                    aria-label="edit"
                    onClick={() =>
                      onClickEdit(e.id, e.name, e.memo, e.exercise_type)
                    }
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                <ListItemText>{e.name}</ListItemText>
              </ListItem>
            ))}
          </List>
          <h3>腕部</h3>
          <List>
            {arm.map((e) => (
              <ListItem
                key={e.id}
                disableGutters
                secondaryAction={
                  <IconButton
                    aria-label="edit"
                    onClick={() =>
                      onClickEdit(e.id, e.name, e.memo, e.exercise_type)
                    }
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                <ListItemText>{e.name}</ListItemText>
              </ListItem>
            ))}
          </List>
          <h3>腹部</h3>
          <List>
            {abdominal.map((e) => (
              <ListItem
                key={e.id}
                disableGutters
                secondaryAction={
                  <IconButton
                    aria-label="edit"
                    onClick={() =>
                      onClickEdit(e.id, e.name, e.memo, e.exercise_type)
                    }
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                <ListItemText>{e.name}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
      )}
    </>
  );
});
