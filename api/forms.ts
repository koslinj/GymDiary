import axios from "@/config/axiosConfig";
import dayjs from "dayjs";
import { router } from "expo-router";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const addWorkoutSubmit = async (formState: AddGymWorkout) => {
  const data = {
    date: dayjs(formState.date).utc().format('YYYY-MM-DD HH:mm:ss'),
    duration: formState.duration,
    note: formState.note,
    rating: formState.rating.toString(),
    plan_name: formState.plan_name,
    workout_details: formState.workout_details,
  };

  console.log(data.workout_details[0].sets)

  try {
    const response = await axios.post('/gym/workout', data);
    router.replace("/(app)/(tabs)/")
  } catch (error) {
    console.error('Error adding workout:', error);
  }
}