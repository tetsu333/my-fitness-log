import { useCallback } from "react";

import axios from "../axios";
import { UpdateExercise } from "../types/api/exercise";
import { useHistory } from "react-router-dom";
import { RootURL } from "../RequestTypes";

export const useUpdateExercise = () => {
  const history = useHistory();
  const goBack = useCallback(() => history.push("/home/exercises"), [history]);
  const updateExercise = useCallback((data: UpdateExercise) => {
    axios.get(`${RootURL}api/v1/sessions`);
    axios
      .put(`${RootURL}api/v1/exercises/${data.exercise_id}`, data, {
        withCredentials: true,
      })
      .then(() => {
        alert("更新しました");
        goBack();
      })
      .catch((res) => {
        alert(res.response.data);
      });
  }, []);
  return { updateExercise };
};
