type Post = {
  post_id: number;
  user_id: number;
  gym_workout_id: number | null;
  run_workout_id: number | null;
  description: string;
  creation_time: string;
  workout: GymWorkout;
  type: "gym" | "run";
  nickname: string;
  profile_photo: string;
  likesCount: number;
  isLike: boolean;
  commentsCount: number;
};