import { addHours, format } from "date-fns";
import { Dispatch, SetStateAction, useCallback } from "react";
import { Hour } from "../../../store/ducks/hoursSlice";

type ISetState = {
  setHourData: any;
  weekDays: Date[];
};

export type ResponseHoursProps = {
  title: string;
  start: Date;
  end: Date;
};

function useFormatHourData({ setHourData, weekDays }: ISetState) {
  const formatHourData = useCallback((hours: Hour[]) => {
    const response: ResponseHoursProps[] = hours
      .map((hour) =>
        hour.days.map((day) => ({
          resource: hour,
          title: `${hour.services?.length || 0} ${
            hour.services?.length === 1 ? "serviço" : "serviços"
          } e ${hour.services?.length || 0} ${
            hour.services?.length === 1 ? "colaborador" : "colaboradores"
          }`,
          start: addHours(
            new Date(
              weekDays[day].setHours(
                parseInt(format(new Date(hour.start_time), "HH")),
                parseInt(format(new Date(hour.start_time), "mm"))
              )
            ),
            3
          ),
          end: addHours(
            new Date(
              weekDays[day].setHours(
                parseInt(format(new Date(hour.end_time), "HH")),
                parseInt(format(new Date(hour.end_time), "mm"))
              )
            ),
            3
          ),
        }))
      )
      .flat();
    setHourData(response);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [formatHourData];
}

export default useFormatHourData;
