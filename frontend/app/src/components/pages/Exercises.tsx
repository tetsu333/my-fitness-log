import { memo, FC, useEffect, useState, ChangeEvent, useCallback } from "react";

import { useLoginRequired } from "../../hooks/useLoginUser";
import { useAllExercises } from "../../hooks/useAllExercises";
import { Exercise } from "../../types/api/exercise";
import { ExerciseTypes } from "../../ExerciseTypes";
import { useCreateExercise } from "../../hooks/useCreateExercise";
import { useHistory } from "react-router-dom";

export const Exercises: FC = memo(() => {
  const loginUser = useLoginRequired();
  const history = useHistory();
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
  const onClickEdit = useCallback(
    (exercise_id: number, name: string, exercise_type: string | number) =>
      history.push("/home/repetitions/edit", {
        exercise_id: exercise_id,
        name: name,
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
        <>
          <p>種目を登録</p>
          <select onChange={onChangeExerciseType}>
            <option value="">部位を選択</option>
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
            登録
          </button>
          <h3>胸部</h3>
          <ul>
            {chest.map((e) => (
              <div key={e.id}>
                <li>
                  {e.name}{" "}
                  <button
                    onClick={() => onClickEdit(e.id, e.name, e.exercise_type)}
                  >
                    編集
                  </button>
                </li>
              </div>
            ))}
          </ul>
          <h3>背部</h3>
          <ul>
            {back.map((e) => (
              <div key={e.id}>
                <li>
                  {e.name}{" "}
                  <button
                    onClick={() => onClickEdit(e.id, e.name, e.exercise_type)}
                  >
                    編集
                  </button>
                </li>
              </div>
            ))}
          </ul>
          <h3>脚部</h3>
          <ul>
            {leg.map((e) => (
              <div key={e.id}>
                <li>
                  {e.name}{" "}
                  <button
                    onClick={() => onClickEdit(e.id, e.name, e.exercise_type)}
                  >
                    編集
                  </button>
                </li>
              </div>
            ))}
          </ul>
          <h3>肩部</h3>
          <ul>
            {shoulder.map((e) => (
              <div key={e.id}>
                <li>
                  {e.name}{" "}
                  <button
                    onClick={() => onClickEdit(e.id, e.name, e.exercise_type)}
                  >
                    編集
                  </button>
                </li>
              </div>
            ))}
          </ul>
          <h3>腕部</h3>
          <ul>
            {arm.map((e) => (
              <div key={e.id}>
                <li>
                  {e.name}{" "}
                  <button
                    onClick={() => onClickEdit(e.id, e.name, e.exercise_type)}
                  >
                    編集
                  </button>
                </li>
              </div>
            ))}
          </ul>
          <h3>腹部</h3>
          <ul>
            {abdominal.map((e) => (
              <div key={e.id}>
                <li>
                  {e.name}{" "}
                  <button
                    onClick={() => onClickEdit(e.id, e.name, e.exercise_type)}
                  >
                    編集
                  </button>
                </li>
              </div>
            ))}
          </ul>
        </>
      )}
    </>
  );
});
