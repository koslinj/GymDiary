import axios from "@/config/axiosConfig";

export const fetchUserSummaryStats = async (range: TimeRangeFilter) => {
  const response = await axios.get("/gym/chart/stats", {
    params: { range: range }
  });
  return response.data.stats;
};

export const fetchMusclesChart = async (range: TimeRangeFilter) => {
  const response = await axios.get("/gym/chart/categories", {
    params: { range: range }
  });
  const data = response.data.categories
  return data
};