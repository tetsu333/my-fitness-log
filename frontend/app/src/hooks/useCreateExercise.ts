import { useCallback, useState } from "react";
import axios from "axios";

import { CreateExercise } from "../types/api/exercise";

export const useCreateExercise = () => {
  const [createMessage, setCreateMessage] = useState<string>("");
  const createExercise = useCallback((data: CreateExercise) => {
    axios
      .post("http://localhost:3001/api/v1/exercises", data)
      .then((res) => {
        setCreateMessage(res.data.message);
        alert("種目を追加しました");
      })
      .catch((res) => {
        setCreateMessage(`error: ${new Date()}`);
        alert(res.response.data);
      });
  }, []);
  return { createExercise, createMessage };
};
