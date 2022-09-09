import { useCallback, useState } from "react";
import axios from "axios";

import { Repetition } from "../types/api/repetitions";

export const useRepetitions = () => {
  const [repetitions, setRepetitions] = useState<Array<Repetition>>([]);
  const getRepetitions = useCallback(
    (user_id: number | undefined, exercise_id: number) => {
      axios
        .get<Array<Repetition>>(
          `http://localhost:3001/api/v1/repetitions/new?user_id=${user_id}&exercise_id=${exercise_id}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setRepetitions(res.data);
        })
        .catch(() => {
          alert("データ取得に失敗しました");
        });
    },
    []
  );
  return { getRepetitions, repetitions };
};
