import { useCallback, useState } from "react";
import axios from "axios";

export const useAllRepetitionDates = () => {
  const [repetitionDates, setRepetitionDates] = useState<Array<Date>>([]);
  const getRepetitionDates = useCallback((user_id: number | undefined) => {
    axios
      .get<Array<Date>>(
        `http://localhost:3001/api/v1/homes?user_id=${user_id}`,
        { withCredentials: true }
      )
      .then((res) => {
        setRepetitionDates(res.data);
      })
      .catch(() => {
        alert("データ取得に失敗しました");
      });
  }, []);
  return { getRepetitionDates, repetitionDates };
};
