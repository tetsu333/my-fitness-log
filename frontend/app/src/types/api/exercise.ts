export type Exercise = {
  id: number;
  user_id: number;
  name: string;
  exercise_type: number | string;
  created_at: Date;
  updated_at: Date;
};

export type CreateExercise = {
  user_id: number | undefined;
  name: string;
  exercise_type: number | string;
};

export type UpdateExercise = {
  exercise_id: number;
  name: string;
  exercise_type: string | number;
};
