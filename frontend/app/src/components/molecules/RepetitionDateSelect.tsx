import { FC, memo } from "react";

export const RepetitionDateSelect: FC<{
  repetitionDates: Array<Date>;
  onChangeRepetitionDate: React.ChangeEventHandler<HTMLSelectElement>;
}> = memo(({ repetitionDates, onChangeRepetitionDate }) => {
  return (
    <>
      <span>記録表示</span>
      <br />
      <select onChange={onChangeRepetitionDate}>
        <option value="">筋トレ日を選択</option>
        {repetitionDates.map((date, index) => (
          <option key={index} value={String(date)}>
            {String(date)}
          </option>
        ))}
      </select>
    </>
  );
});
