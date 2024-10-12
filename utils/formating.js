export const formatTime = (seconds) => {
  const getSeconds = `0${seconds % 60}`.slice(-2);
  const minutes = Math.floor(seconds / 60);
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
  return `${getHours}:${getMinutes}:${getSeconds}`;
};

export const formatDate = (str) => {
  const date = new Date(str)
  const formattedStr = date.toLocaleDateString('pl-PL');
  return formattedStr
}