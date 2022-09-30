import { FC, memo } from "react";

import { DayRepetitions } from "../../types/api/repetitions";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export const DayRepetitionList: FC<{
  dayRepetitions: Array<DayRepetitions>;
}> = memo(({ dayRepetitions }) => {
  return (
    <List>
      {dayRepetitions.map((dayRepetition) => (
        <ListItem key={dayRepetition.id} disableGutters>
          <ListItemText>
            <>
              {dayRepetition.exercise_name}　{dayRepetition.weight}kg　
              {dayRepetition.repetition_num}回
            </>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
});
