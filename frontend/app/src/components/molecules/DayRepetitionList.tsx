import { FC, memo } from "react";

import { DayRepetitions } from "../../types/api/repetitions";

import styled from "@emotion/styled";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export const DayRepetitionList: FC<{
  dayRepetitions: Array<DayRepetitions>;
}> = memo(({ dayRepetitions }) => {
  return (
    <List>
      {dayRepetitions.map((dayRepetition, index) => (
        <ListItem key={dayRepetition.id} disableGutters>
          <ListItemText>
            <SDiv>
              {index + 1}．{dayRepetition.exercise_type}：
              {dayRepetition.exercise_name}　{dayRepetition.weight}kg　
              {dayRepetition.repetition_num}回
            </SDiv>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
});

const SDiv = styled.div`
  font-size: 14px;
`;
