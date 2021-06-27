export const convertHourToMinutes = (date: Date): number => {
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return minutes + hour * 60;
};
