import axios from "@/config/axiosConfig";

export const fetchWorkouts = async (currentPage: number) => {
  const response = await axios.get("/gym/workout/all/pageable", {
    params: {
      page: currentPage,
    },
  });
  return response.data.workouts;
};

export const fetchWorkoutDetails = async (workoutId: number) => {
  const response = await axios.get(`/gym/workout/${workoutId}`)
  return response.data.workout;
};