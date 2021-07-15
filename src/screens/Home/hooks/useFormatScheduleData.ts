import { addMinutes } from "date-fns";
import { Dispatch, SetStateAction, useCallback } from "react";
import {
  FormatedSchedule,
  Schedule,
} from "../../../store/ducks/schedulesSlice";
import { convertHourToMinutes } from "../../../utils";

type ISetState = {
  setScheduleData: Dispatch<SetStateAction<FormatedSchedule[]>>;
};

function useFormatScheduleData({ setScheduleData }: ISetState) {
  const formatScheduleData = useCallback((data: Schedule[]) => {
    const response: FormatedSchedule[] = data.map(
      ({ service_id, client_id, worker_id, schedule_date }: Schedule) => ({
        title: `${service_id.title} - ${client_id.name} - ${worker_id.name}`,
        start: new Date(schedule_date),
        end: addMinutes(
          new Date(schedule_date),
          convertHourToMinutes(new Date(service_id.service_duration))
        ),
      })
    );
    setScheduleData(response);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [formatScheduleData];
}

export default useFormatScheduleData;
