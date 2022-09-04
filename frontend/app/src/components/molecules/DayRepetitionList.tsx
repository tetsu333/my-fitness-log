import { FC, memo } from "react";
import { DayRepetitions } from "../../types/api/repetitions";

export const DayRepetitionList: FC<{
  dayRepetitions: Array<DayRepetitions>;
}> = memo(({ dayRepetitions }) => {
  return (
    <ul>
      {dayRepetitions.map((dayRepetition) => (
        <div key={dayRepetition.id}>
          <li>
            <>
              {dayRepetition.exercise_name}　{dayRepetition.weight}kg　
              {dayRepetition.repetition_num}回
            </>
          </li>
        </div>
      ))}
    </ul>
  );
});
