export const convertHourToMinutes = (date: Date): number => {
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return minutes + hour * 60;
};

export const formatDateToString = (date: string) => {
  const newStartTime = new Date(date);
  const newHour = String(newStartTime.getHours());
  const newMinutes = String(newStartTime.getMinutes());

  const hours = newHour.length === 1 ? `0${newHour}` : `${newHour}`;
  const minutes = newMinutes.length === 1 ? `0${newMinutes}` : `${newMinutes}`;

  return `${hours}:${minutes}`;
};
