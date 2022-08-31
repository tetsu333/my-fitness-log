import { useCallback, useState } from "react";
import axios from "axios";

import { CreateRepetition } from "../types/api/repetitions";

export const useCreateRepetition = () => {
  const [createMessage, setCreateMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const createRepetition = useCallback((data: CreateRepetition) => {
    setLoading(true);
    axios
      .post("http://localhost:3001/api/v1/repetitions", data)
      .then((res) => {
        setCreateMessage(res.data.message);
        alert("登録しました");
        setLoading(false);
      })
      .catch((res) => {
        setCreateMessage(`error: ${new Date()}`);
        alert(res.response.data);
        setLoading(false);
      });
  }, []);
  return { createRepetition, loading, createMessage };
};