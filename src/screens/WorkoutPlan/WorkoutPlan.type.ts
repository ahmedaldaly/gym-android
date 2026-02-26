export type ExerciseType = {
  id: string;
  name: string;
  muscle_id: string;
  video: string;
  level: string;
  isActive: boolean;
  gender: string;
  is_free: boolean;
  createdAt: string;
  updatedAt: string;
};

export type WorkoutExerciseType = {
  id: string;
  plan_id: string;
  exercise_id: string;
  sets: number;
  reps: string;
  calories_target: number;
  calories_completed: number;
  exercise: ExerciseType;
};

export type WorkoutDayType = {
  id: string;
  plan_id: string;
  day_index: number;
  title: string;
  exercises: WorkoutExerciseType[]; // ✅ Array مش Tuple
};

export type WorkoutPlanDataType = {
  id: string;
  userId: string | null;
  goal: string;
  days_per_week: number;
  is_free_plan: boolean;
  createdAt: string;
  updatedAt: string;
  workoutDays: WorkoutDayType[];
};

export type WorkoutPlanResponseType = {
  workoutPlan: WorkoutPlanDataType;
};