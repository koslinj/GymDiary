import axios from "@/config/axiosConfig";

export const fetchGymAchievements = async () => {
  const response = await axios.get(`gym/achievement/getAll`)
  return response.data.achievements;
};

export const fetchSocialAchievements = async () => {
  const response = await axios.get(`shared/achievement/getAll`)
  return response.data.achievements;
};
