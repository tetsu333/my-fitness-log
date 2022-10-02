import { useCallback, useState } from "react";
import axios from "axios";

import { CreateExercise } from "../types/api/exercise";
import { RootURL } from "../RequestTypes";

export const useCreateExercise = () => {
  const [createMessage, setCreateMessage] = useState<string>("");
  const createExercise = useCallback((data: CreateExercise) => {
    axios
      .post(`${RootURL}/api/v1/exercises`, data, {
        withCredentials: true,
      })
      .then((res) => {
        setCreateMessage(res.data.message);
      })
      .catch((res) => {
        setCreateMessage(`error: ${new Date()}`);
        alert(res.response.data);
      });
  }, []);
  return { createExercise, createMessage };
};
