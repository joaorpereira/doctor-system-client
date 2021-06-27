import React, { ReactElement, useCallback, useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import * as S from "./styled";

import { Calendar } from "react-big-calendar";
import { format } from "date-fns";

import { localizer } from "../../utils/date";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getSchedules } from "../../store/ducks/schedulesSlice";
import { RootState } from "../../store";
import useFormatScheduleData, {
  IFormatedSchedule,
  IScheduleData,
} from "./hooks/useFormatScheduleData";

type IRange = {
  start: string;
  end: string | Date;
};

export type IScheduleProps = {
  company_id: string;
  range: IRange;
};

type ISelector = {
  schedules?: IScheduleData[];
};

const HomePage: React.FC = (): ReactElement => {
  const dispatch = useAppDispatch();
  const [scheduleData, setScheduleData] = useState<IFormatedSchedule[]>([]);
  const { schedules } = useAppSelector<ISelector>(
    ({ schedulesReducers }: RootState) => schedulesReducers
  );

  const [formatScheduleData] = useFormatScheduleData({ setScheduleData });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rangeFormat = useCallback((range: any) => {
    let newRange = {} as IRange;
    if (Array.isArray(range)) {
      newRange = {
        start: format(range[0], "yyyy-MM-dd"),
        end: format(range[range.length - 1], "yyyy-MM-dd"),
      };
    } else {
      newRange = {
        start: format(range?.start, "yyyy-MM-dd"),
        end: format(range?.end, "yyyy-MM-dd"),
      };
    }
    return newRange;
  }, []);

  useEffect(() => {
    const data: IScheduleProps = {
      company_id: "60b281095398c39f2a93cd20",
      range: {
        start: "2021-04-26",
        end: "2021-06-26",
      },
    };
    dispatch(getSchedules(data));
  }, [dispatch]);

  useEffect(() => {
    if (schedules) formatScheduleData(schedules);
  }, [schedules, formatScheduleData]);

  return (
    <S.ScheduleSection>
      <h1>Agendamentos</h1>
      {scheduleData && (
        <Calendar
          localizer={localizer}
          onRangeChange={(range) => rangeFormat(range)}
          events={scheduleData}
          startAccessor="start"
          endAccessor="end"
          selectable
          style={{ height: 650 }}
        />
      )}
    </S.ScheduleSection>
  );
};

export default HomePage;
