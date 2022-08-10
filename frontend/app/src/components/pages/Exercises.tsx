import { memo, FC, useEffect, useState, ChangeEvent } from "react";

import { useLoginRequired } from "../../hooks/useLoginUser";
import { useAllExercises } from "../../hooks/useAllExercises";
import { Exercise } from "../../types/api/exercise";
import { ExerciseTypes } from "../templates/ExerciseTypes";
import { useCreateExercise } from "../../hooks/useCreateExercise";

export const Exercises: FC = memo(() => {
  const loginUser = useLoginRequired();
  const { createExercise, createMessage } = useCreateExercise();
  const { getExercises, loading, exercises } = useAllExercises();
  const [exerciseType, setExerciseType] = useState<string>("");
  const [exerciseName, setExerciseName] = useState<string>("");

  useEffect(() => getExercises(loginUser?.id), [createMessage]);

  const onChangeExerciseType = (e: ChangeEvent<HTMLSelectElement>) =>
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
        <>
          <h2>種目ページ</h2>
          <select onChange={onChangeExerciseType}>
            <option value="">選択してください</option>
            {ExerciseTypes.map((typeName) => (
              <option value={typeName.en} key={typeName.en}>
                {typeName.ja}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="種目名"
            value={exerciseName}
            onChange={onChangeExerciseName}
          ></input>
          <button
            onClick={onClickCreateExercise}
            disabled={exerciseType == "" || exerciseName == "" || loading}
          >
            追加
          </button>
          <h3>胸部</h3>
          <ul>
            {chest.map((e) => (
              <li key={e.id}>{e.name}</li>
            ))}
          </ul>
          <h3>背部</h3>
          <ul>
            {back.map((e) => (
              <li key={e.id}>{e.name}</li>
            ))}
          </ul>
          <h3>脚部</h3>
          <ul>
            {leg.map((e) => (
              <li key={e.id}>{e.name}</li>
            ))}
          </ul>
          <h3>肩部</h3>
          <ul>
            {shoulder.map((e) => (
              <li key={e.id}>{e.name}</li>
            ))}
          </ul>
          <h3>腕部</h3>
          <ul>
            {arm.map((e) => (
              <li key={e.id}>{e.name}</li>
            ))}
          </ul>
          <h3>腹部</h3>
          <ul>
            {abdominal.map((e) => (
              <li key={e.id}>{e.name}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
});
