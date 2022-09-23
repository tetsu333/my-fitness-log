import { useCallback, useState } from "react";
import axios from "axios";

import { CreateRepetition } from "../types/api/repetitions";
import { RootURL } from "../RequestTypes";

export const useCreateRepetition = () => {
  const [createMessage, setCreateMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const createRepetition = useCallback((data: CreateRepetition) => {
    setLoading(true);
    axios
      .post(`${RootURL}api/v1/repetitions`, data, {
        withCredentials: true,
      })
      .then((res) => {
        axios.defaults.headers.common["X-CSRF-Token"] =
          res.headers["x-csrf-token"];
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
