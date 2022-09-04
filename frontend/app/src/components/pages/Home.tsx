import { memo, FC, useCallback, useEffect, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";

import { useLoginRequired } from "../../hooks/useLoginUser";
import { useAllRepetitionDates } from "../../hooks/useAllRepetitionDates";
import { useDayRepetitions } from "../../hooks/useDayRepetitions";
import { DayRepetitionList } from "../molecules/DayRepetitionList";
import { RepetitionDateSelect } from "../molecules/RepetitionDateSelect";

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
      <RepetitionDateSelect
        repetitionDates={repetitionDates}
        onChangeRepetitionDate={onChangeRepetitionDate}
      />
      <DayRepetitionList dayRepetitions={dayRepetitions} />
    </>
  );
});
