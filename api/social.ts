import axios from "@/config/axiosConfig";

export const getAllPosts = async () => {
  const response = await axios.get("/shared/post/getAll");
  return response.data
};
