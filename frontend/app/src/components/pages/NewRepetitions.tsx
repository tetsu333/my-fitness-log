import { memo, FC, useEffect, useState, ChangeEvent } from "react";

import { useLoginRequired } from "../../hooks/useLoginUser";
import { useCreateRepetition } from "../../hooks/useCreateRepetition";
import { useAllExercises } from "../../hooks/useAllExercises";
import { useRepetitions } from "../../hooks/useRepetitions";
import { ExerciseTypeTranslation } from "../../ExerciseTypes";
import { useDeleteRepetition } from "../../hooks/useDeleteRepetition";

export const NewRepetitions: FC = memo(() => {
  const loginUser = useLoginRequired();
  console.log(loginUser);
  const { createRepetition, loading, createMessage } = useCreateRepetition();
  const { getExercises, exercises } = useAllExercises();
  const { getRepetitions, repetitions } = useRepetitions();
  const { deleteRepetition, deleteMessage } = useDeleteRepetition();

  const date = new Date();
  date.setTime(date.getTime() + 1000 * 60 * 60 * 9); // JSTに変換
  const [exerciseDate, setExerciseDate] = useState<Date>(date);
  const [exerciseType, setExerciseType] = useState<number>(0);
  const [repetitionNum, setrepetitionNum] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);

  useEffect(
    () => getRepetitions(loginUser?.id, exerciseType),
    [createMessage, deleteMessage]
  );

  const onChangeExerciseDate = (e: ChangeEvent<HTMLInputElement>) =>
    setExerciseDate(new Date(e.target.value));
  const onChangeExerciseType = (e: ChangeEvent<HTMLSelectElement>) => {
    setExerciseType(Number(e.target.value));
    getRepetitions(loginUser?.id, Number(e.target.value));
  };
  const onChangerepetitionNum = (e: ChangeEvent<HTMLInputElement>) =>
    setrepetitionNum(Number(e.target.value));
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
  };
  const onClickDeleteRepetition = (id: number) => {
    const result = window.confirm("削除しますか？");
    if (result) {
      deleteRepetition(id);
    }
  };

  useEffect(() => getExercises(loginUser?.id), []);

  return (
    <>
      <h2>記録ページ</h2>
      <span>筋トレ日</span>
      <input
        type="date"
        value={`${exerciseDate.getFullYear()}-${(
          "00" +
          (exerciseDate.getMonth() + 1)
        ).slice(-2)}-${("00" + exerciseDate.getDate()).slice(-2)}`}
        onChange={onChangeExerciseDate}
      ></input>
      <br />
      <span>種目</span>
      <select onChange={onChangeExerciseType}>
        <option value="">種目を選択</option>
        {exercises.map((exercise) => (
          <option key={exercise.id} value={exercise.id}>
            <>
              {ExerciseTypeTranslation(exercise.exercise_type)}：{exercise.name}
            </>
          </option>
        ))}
      </select>
      <br />
      <span>回数</span>
      <input
        type="number"
        min="0"
        value={repetitionNum}
        onChange={onChangerepetitionNum}
      ></input>
      <span>rep</span>
      <br />
      <span>重量</span>
      <input
        type="number"
        min="0"
        value={weight}
        onChange={onChangeWeight}
      ></input>
      <span>kg</span>
      <br />
      <button
        onClick={onClickCreateRepetition}
        disabled={exerciseType == 0 || exerciseDate == undefined || loading}
      >
        登録
      </button>
      <p>履歴</p>
      <ul>
        {repetitions.map((repetition) => (
          <div key={repetition.id}>
            <li>
              <>
                {repetition.exercise_date}　{repetition.weight}kg　
                {repetition.repetition_num}回
              </>
              　
              <button
                onClick={() => onClickDeleteRepetition(repetition.id)}
                disabled={loading}
              >
                削除
              </button>
            </li>
          </div>
        ))}
      </ul>
    </>
  );
});
