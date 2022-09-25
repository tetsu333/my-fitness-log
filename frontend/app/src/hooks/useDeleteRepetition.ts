import { useCallback, useState } from "react";
import axios from "axios";

import { RootURL } from "../RequestTypes";

export const useDeleteRepetition = () => {
  const [deleteMessage, setDeleteMessage] = useState<string>("");
  const deleteRepetition = useCallback((id: number) => {
    axios
      .delete(`${RootURL}api/v1/repetitions/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setDeleteMessage(res.data.message);
        alert("削除しました");
      })
      .catch(() => {
        setDeleteMessage(`error: ${new Date()}`);
        alert("削除に失敗しました");
      });
  }, []);
  return { deleteRepetition, deleteMessage };
};
