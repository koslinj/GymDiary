import axios from "@/config/axiosConfig";

export const fetchGoals = async () => {
  const response = await axios.get("/gym/goal/all");
  const data = response.data.goals as GymGoal[]
  const sorted = data.sort(
    (a, b) => new Date(b.finish_date).getTime() - new Date(a.finish_date).getTime()
  )
  return sorted
};

export const addGoal = async (payload: any) => {
  const response = await axios.post(
    "/gym/goal",
    payload
  );
  return response
};

export const deleteGoal = async (goalId: number) => {
  const response = await axios.delete(`/gym/goal/${goalId}`);
  return response
};