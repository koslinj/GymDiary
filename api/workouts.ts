import axios from "@/config/axiosConfig";

export const fetchWorkouts = async (currentPage: number) => {
  const response = await axios.get("/gym/workout/all/pageable", {
    params: {
      page: currentPage,
    },
  });
  return response.data.workouts;
};

export const fetchWorkoutsInfinite = async ({ pageParam = 1 }) => {
  const response = await axios.get("/gym/workout/all/pageable", {
    params: {
      page: pageParam,
    },
  });

  return response.data;
};

export const fetchWorkoutDetails = async (workoutId: number) => {
  const response = await axios.get(`/gym/workout/${workoutId}`)
  return response.data.workout;
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