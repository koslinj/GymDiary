import axios from "@/config/axiosConfig";
import dayjs from "dayjs";

export const fetchWorkouts = async (currentPage: number) => {
  const response = await axios.get("/gym/workout/all/pageable", {
    params: {
      page: currentPage,
    },
  });
  return response.data.workouts;
};

export const fetchWorkoutsInfinite = async (
  pageParam: number = 1,
  startDate: any = undefined,
  endDate: any = undefined
) => {
  const response = await axios.get("/gym/workout/all/pageable", {
    params: {
      page: pageParam,
      startDate: startDate ? dayjs(startDate).startOf('day').format("YYYY-MM-DD HH:mm") : undefined,
      endDate: endDate ? dayjs(endDate).startOf('day').format("YYYY-MM-DD HH:mm") : undefined,
    },
  });

  return response.data;
};

export const fetchWorkoutDetails = async (workoutId: number) => {
  const response = await axios.get(`/gym/workout/${workoutId}`)
  return response.data.workout;
};

export const deleteWorkout = async (id: number) => {
  const response = await axios.delete(`/gym/workout/${id}`);
  return response
};

export const fetchRoutines = async () => {
  const response = await axios.get(`gym/routine/all`)
  return response.data.routines;
}

export const removeRoutine = async (gym_routine_id: number) => {
  const response = await axios.delete(`/gym/routine/${gym_routine_id}`)
}

export const addRoutine = async (routineName: string, exercises: string[]) => {
  const response = await axios.post("/gym/routine",
    { routine_name: routineName, exercises: exercises }
  );
}

export const getRoutineExercises = async (gym_routine_id: number): Promise<Exercise[]> => {
  const response = await axios.get(`gym/routine/exercises`, {
    params: { gym_routine_id: gym_routine_id },
  });

  return response.data.exercises;
}