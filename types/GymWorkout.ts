type GymWorkoutSummary = {
  workoutId: number
  planName: string
  duration: string
  note: string
  rating: number
  date: string
  sets: number
  volume: number
}

type GymWorkoutDetail = {
  workoutDetailId: number
  exerciseName: string
  sets: GymSet[]
}

type GymSet = {
  weight: number
  reps: number
}

type GymWorkout = {
  workoutId: number
  duration: string
  date: string
  note: string
  rating: number
  workoutData: GymWorkoutDetail[]
}
