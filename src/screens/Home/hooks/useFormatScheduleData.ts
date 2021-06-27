import { addMinutes } from "date-fns";
import { Dispatch, SetStateAction, useCallback } from "react";
import { convertHourToMinutes } from "../../../utils/date";

export type IScheduleData = {
  client_id: { _id: string; name: string };
  schedule_date: string;
  service_id: { _id: string; title: string; service_duration: string };
  worker_id: { _id: string; name: string };
  company_id: string;
  created_at: string;
  transaction_id: string;
  updated_at: string;
  __v: string;
  _id: string;
};

export type IFormatedSchedule = {
  title: string;
  start: Date;
  end: Date;
};

type ISetState = {
  setScheduleData: Dispatch<SetStateAction<IFormatedSchedule[]>>;
};

function useFormatScheduleData({ setScheduleData }: ISetState) {
  const formatScheduleData = useCallback((data: IScheduleData[]) => {
    const response: IFormatedSchedule[] = data.map(
      ({ service_id, client_id, worker_id, schedule_date }: IScheduleData) => ({
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
