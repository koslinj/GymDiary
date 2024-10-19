import axios from "@/config/axiosConfig";

export const fetchExercises = async (selectedCategory: string) => {
  const response = await axios.get(`gym/exercise/getExercises`, {
    params: selectedCategory === "All" ? {} : { category_name: selectedCategory },
  })
  return response.data.exercises;
};
