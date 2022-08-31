import { memo, FC, useCallback, useEffect, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";

import { useLoginRequired } from "../../hooks/useLoginUser";
import { useAllRepetitionDates } from "../../hooks/useAllRepetitionDates";
import { useDayRepetitions } from "../../hooks/useDayRepetitions";

export const Home: FC = memo(() => {
  const loginUser = useLoginRequired();
  console.log(loginUser);
  const history = useHistory();
  const { getRepetitionDates, repetitionDates } = useAllRepetitionDates();
  const { getDayRepetitions, dayRepetitions } = useDayRepetitions();
  const onChangeRepetitionDate = (e: ChangeEvent<HTMLSelectElement>) => {
    getDayRepetitions(loginUser?.id, e.target.value);
  };
  const onClickNewRepetitions = useCallback(
    () => history.push("/home/repetitions/new"),
    [history]
  );

  useEffect(() => getRepetitionDates(loginUser?.id), []);

  return (
    <>
      <p>{loginUser?.name}の筋トレノート</p>
      <button onClick={onClickNewRepetitions}>記録する</button>
      <br />
      <span>記録表示</span>
      <br />
      <select onChange={onChangeRepetitionDate}>
        <option value="">筋トレ日を選択</option>
        {repetitionDates.map((date, index) => (
          <option key={index} value={String(date)}>
            {String(date)}
          </option>
        ))}
      </select>
      <ul>
        {dayRepetitions.map((dayRepetition) => (
          <>
            <li key={dayRepetition.id}>
              <>
                {dayRepetition.exercise_name}　{dayRepetition.weight}kg　
                {dayRepetition.repetition_num}回
              </>
            </li>
          </>
        ))}
      </ul>
    </>
  );
});
