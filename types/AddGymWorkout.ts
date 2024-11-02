type AddGymWorkoutDetail = {
  name_exercise: string;
  sets: GymSet[];
};

type AddGymWorkout = {
  date: Date;
  duration: string;
  note: string;
  rating: number;
  plan_name: string;
  workout_details: AddGymWorkoutDetail[];
};
