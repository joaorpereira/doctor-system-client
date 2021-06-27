import { dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import pt from "date-fns/locale/pt-BR";

export const locales = {
  "pt-BR": pt,
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const convertHourToMinutes = (date: Date): number => {
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return minutes + hour * 60;
};
