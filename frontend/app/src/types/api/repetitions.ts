export type Repetition = {
  id: number;
  user_id: number | undefined;
  exercise_id: number;
  repetition_num: number;
  weight: number;
  exercise_date: Date;
  created_at: Date;
  updated_at: Date;
};

export type CreateRepetition = {
  user_id: number | undefined;
  exercise_id: number;
  repetition_num: number;
  weight: number;
  exercise_date: Date;
};
