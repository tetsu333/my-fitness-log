import { useCallback, useState } from "react";
import axios from "axios";

import { CreateRepetition } from "../types/api/repetitions";
import { RootURL } from "../RequestTypes";

export const useCreateRepetition = () => {
  const [createMessage, setCreateMessage] = useState<string>("");
  const [successful, setSuccessful] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const createRepetition = useCallback((data: CreateRepetition) => {
    setLoading(true);
    axios
      .post(`${RootURL}api/v1/repetitions`, data, {
        withCredentials: true,
      })
      .then((res) => {
        setCreateMessage(res.data.message);
        setLoading(false);
        setSuccessful(`successful: ${new Date()}`);
      })
      .catch((res) => {
        setCreateMessage(`error: ${new Date()}`);
        setLoading(false);
        alert(res.response.data);
      });
  }, []);
  return {
    createRepetition,
    loading,
    createMessage,
    successful,
  };
};
