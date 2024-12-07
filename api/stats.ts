import axios from "@/config/axiosConfig";
import dayjs from "dayjs";

export const fetchUserSummaryStats = async (
  range: TimeRangeFilter,
  startDate: any = undefined,
  endDate: any = undefined
) => {
  const response = await axios.get("/gym/chart/stats", {
    params: {
      range: range,
      startDate: startDate ? dayjs(startDate).startOf('day').format("YYYY-MM-DD HH:mm") : undefined,
      endDate: endDate ? dayjs(endDate).startOf('day').format("YYYY-MM-DD HH:mm") : undefined,
    }
  });
  return response.data.stats;
};

export const fetchMusclesChart = async (
  range: TimeRangeFilter,
  startDate: any = undefined,
  endDate: any = undefined
) => {
  const response = await axios.get("/gym/chart/categories", {
    params: {
      range: range,
      startDate: startDate ? dayjs(startDate).startOf('day').format("YYYY-MM-DD HH:mm") : undefined,
      endDate: endDate ? dayjs(endDate).startOf('day').format("YYYY-MM-DD HH:mm") : undefined,
    }
  });
  const data = response.data.categories
  return data
};

export const fetchUserInfo = async () => {
  const response = await axios.get("/shared/userInfo");
  return response.data.data;
};