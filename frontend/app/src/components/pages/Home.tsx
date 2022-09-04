import { memo, FC, useCallback, useEffect, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";

import { useLoginRequired } from "../../hooks/useLoginUser";
import { useAllRepetitionDates } from "../../hooks/useAllRepetitionDates";
import { useDayRepetitions } from "../../hooks/useDayRepetitions";
import { DayRepetitionList } from "../molecules/DayRepetitionList";
import { RepetitionDateSelect } from "../molecules/RepetitionDateSelect";
import { EventButton } from "../atoms/button/EventButton";

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
      <EventButton event={onClickNewRepetitions}>記録する</EventButton>
      <br />
      <RepetitionDateSelect
        repetitionDates={repetitionDates}
        onChange={onChangeRepetitionDate}
      />
      <DayRepetitionList dayRepetitions={dayRepetitions} />
    </>
  );
});
