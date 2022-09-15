import { useCallback, useState } from "react";
import axios from "axios";

import { DayRepetitions } from "../types/api/repetitions";
import { RootURL } from "../RequestTypes";

export const useDayRepetitions = () => {
  const [dayRepetitions, setDayRepetitions] = useState<Array<DayRepetitions>>(
    []
  );
  const getDayRepetitions = useCallback(
    (user_id: number | undefined, exercise_date: string) => {
      axios
        .get<Array<DayRepetitions>>(
          `${RootURL}api/v1/repetitions?user_id=${user_id}&exercise_date=${exercise_date}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setDayRepetitions(res.data);
        })
        .catch(() => {
          alert("データ取得に失敗しました");
        });
    },
    []
  );
  return { getDayRepetitions, dayRepetitions };
};
