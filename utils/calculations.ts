import dayjs from "dayjs";

export const getSecondsFromDuration = (duration: string) => {
  const [hours, minutes, seconds] = duration.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

export const getDurationFromSeconds = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

export const calculateDaysPassed = (dateString: string): number => {
  const givenDate = dayjs(dateString)
  const today = dayjs()
  return today.diff(givenDate, 'day')
};