import { memo, FC, useEffect, useState, ChangeEvent } from "react";

import { useLoginRequired } from "../../hooks/useLoginUser";
import { useCreateRepetition } from "../../hooks/useCreateRepetition";
import { useAllExercises } from "../../hooks/useAllExercises";
import { useRepetitions } from "../../hooks/useRepetitions";
import { ExerciseTypeTranslation } from "../templates/ExerciseTypes";

export const Repetitions: FC = memo(() => {
  const loginUser = useLoginRequired();
  console.log(loginUser);
  const { createRepetition, loading, createMessage } = useCreateRepetition();
  const { getExercises, exercises } = useAllExercises();
  const { getRepetitions, repetitions } = useRepetitions();

  const date = new Date();
  date.setTime(date.getTime() + 1000 * 60 * 60 * 9); // JSTに変換
  const [exerciseDate, setExerciseDate] = useState<Date>(date);
  const [exerciseType, setExerciseType] = useState<number>(0);
  const [repetitionNum, setrepetitionNum] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);

  useEffect(() => getRepetitions(loginUser?.id, exerciseType), [createMessage]);

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

  useEffect(() => getExercises(loginUser?.id), []);

  return (
    <>
      <p>各項目を選択してください</p>
      <span>筋トレ日</span>
      <input
        type="date"
        value={`${exerciseDate.getFullYear()}-${(
          "00" +
          (exerciseDate.getMonth() + 1)
        ).slice(-2)}-${exerciseDate.getDate()}`}
        onChange={onChangeExerciseDate}
      ></input>
      <br />
      <span>種目</span>
      <select onChange={onChangeExerciseType}>
        <option value="">種目を選択</option>
        {exercises.map((e) => (
          <option key={e.id} value={e.id}>
            <>
              （{ExerciseTypeTranslation(e.exercise_type)}）{e.name}
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
        {repetitions.map((e) => (
          <li key={e.id}>
            <>
              {e.exercise_date}　{e.weight}kg　{e.repetition_num}回
            </>
          </li>
        ))}
      </ul>
    </>
  );
});
