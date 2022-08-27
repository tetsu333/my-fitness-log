export const ExerciseTypes = [
  {
    en: "chest",
    ja: "胸部",
  },
  {
    en: "back",
    ja: "背部",
  },
  {
    en: "leg",
    ja: "脚部",
  },
  {
    en: "shoulder",
    ja: "肩部",
  },
  {
    en: "arm",
    ja: "腕部",
  },
  {
    en: "abdominal",
    ja: "腹部",
  },
];

export const ExerciseTypeTranslation = (exercise_type: string | number) => {
  for (let i = 0; i < ExerciseTypes.length; i++) {
    if (ExerciseTypes[i].en == exercise_type || i == exercise_type) {
      return ExerciseTypes[i].ja;
    }
  }
};
