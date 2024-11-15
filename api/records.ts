import axios from "@/config/axiosConfig";

export const fetchHeaviestWeightChart = async (name_exercise: string) => {
  const response = await axios.get(
    "/gym/chart/heaviestWeight",
    {
      params: { name_exercise: name_exercise, }
    }
  );
  const data = response.data.data
  data.sort((a: { date: string }, b: { date: string }) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return data
};

export const fetchMostRepsChart = async (name_exercise: string) => {
  const response = await axios.get(
    "/gym/chart/mostReps",
    {
      params: { name_exercise: name_exercise, }
    }
  );
  const data = response.data.data
  data.sort((a: { date: string }, b: { date: string }) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return data
};