import { useCallback, useState } from "react";
import axios from "axios";

import { DayRepetitions } from "../types/api/repetitions";

export const useDayRepetitions = () => {
  const [dayRepetitions, setDayRepetitions] = useState<Array<DayRepetitions>>(
    []
  );
  const getDayRepetitions = useCallback(
    (user_id: number | undefined, exercise_date: string) => {
      axios
        .get<Array<DayRepetitions>>(
          `http://localhost:3001/api/v1/repetitions?user_id=${user_id}&exercise_date=${exercise_date}`
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
