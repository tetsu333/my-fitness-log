import { useCallback, useState } from "react";
import axios from "axios";

export const useDeleteRepetition = () => {
  const [deleteMessage, setDeleteMessage] = useState<string>("");
  const deleteRepetition = useCallback((id: number) => {
    axios
      .delete(`http://localhost:3001/api/v1/repetitions/${id}`)
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
