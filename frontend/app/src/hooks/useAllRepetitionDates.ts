import { useCallback, useState } from "react";
import axios from "axios";

import { RootURL } from "../RequestTypes";

export const useAllRepetitionDates = () => {
  const [repetitionDates, setRepetitionDates] = useState<Array<Date>>([]);
  const getRepetitionDates = useCallback((user_id: number | undefined) => {
    axios
      .get<Array<Date>>(`${RootURL}api/v1/homes?user_id=${user_id}`, {
        withCredentials: true,
      })
      .then((res) => {
        axios.defaults.headers.common["X-CSRF-Token"] =
          res.headers["x-csrf-token"];
        setRepetitionDates(res.data);
      })
      .catch((res) => {
        console.log(res.header);
        alert("データ取得に失敗しました!");
      });
  }, []);
  return { getRepetitionDates, repetitionDates };
};
