import { useCallback, useState } from "react";

import axios from "../axios";
import { Exercise } from "../types/api/exercise";
import { RootURL } from "../RequestTypes";

export const useAllExercises = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [exercises, setExercises] = useState<Array<Exercise>>([]);
  const getExercises = useCallback((user_id: number | undefined) => {
    setLoading(true);
    axios
      .get<Array<Exercise>>(`${RootURL}api/v1/exercises?user_id=${user_id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setExercises(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("データ取得に失敗しました");
        setLoading(false);
      });
  }, []);
  return { getExercises, loading, exercises };
};
