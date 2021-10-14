import React, { ReactElement, useEffect, useMemo, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";

import * as S from "./styled";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  endOfMonth,
  startOfMonth,
} from "date-fns";

import {
  FormatedSchedule,
  getSchedules,
  Schedule,
} from "../../store/ducks/schedulesSlice";
import { RootState } from "../../store";

import {
  useAppDispatch,
  useAppSelector,
  useFormatScheduleData,
} from "../../hooks";

import ptBR from "date-fns/locale/pt-BR";
import { SectionTitle } from "../../styles";
import { IRange, IScheduleProps } from "../../store/sagas/schedulesSaga";
import { calendarOptions } from "../../utils";
import useWindowSize, { Size } from "../../hooks/useWindowSize";

const locales = {
  "pt-BR": ptBR,
};
type ISelector = {
  schedules?: Schedule[];
};

const HomePage: React.FC = (): ReactElement => {
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });
  const dispatch = useAppDispatch();
  const [scheduleData, setScheduleData] = useState<FormatedSchedule[]>([]);

  const { schedules } = useAppSelector<ISelector>(
    ({ schedulesReducers }: RootState) => schedulesReducers
  );
  const { user } = useAppSelector(
    ({ authReducers }: RootState) => authReducers
  );

  const [formatScheduleData] = useFormatScheduleData({ setScheduleData });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rangeFormat = (range: any) => {
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

    const newSchedule: IScheduleProps = {
      company_id: user?._id,
      range: {
        start: newRange.start,
        end: newRange.end,
      },
    };
    dispatch(getSchedules(newSchedule));
  };

  const data: IScheduleProps = useMemo(() => {
    return {
      company_id: user?._id,
      range: {
        start: format(startOfMonth(new Date()), "yyyy-MM-dd"),
        end: format(endOfMonth(new Date()), "yyyy-MM-dd"),
      },
    };
  }, [user]);

  useEffect(() => {
    if (data) {
      dispatch(getSchedules(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (schedules) formatScheduleData(schedules);
  }, [schedules, formatScheduleData]);

  const size: Size = useWindowSize();

  return (
    <S.ScheduleSection>
      <S.HeaderRow>
        <SectionTitle>Agendamentos</SectionTitle>
      </S.HeaderRow>
      {user && scheduleData && (
        <Calendar
          messages={calendarOptions}
          localizer={localizer}
          culture="pt-BR"
          onRangeChange={(range) => rangeFormat(range)}
          events={scheduleData}
          startAccessor="start"
          endAccessor="end"
          selectable
          style={{
            height:
              size.height < 650
                ? 400
                : size.height < 710
                ? 450
                : size.height < 770
                ? 500
                : size.height < 820
                ? 550
                : size.height < 870
                ? 600
                : size.height < 920
                ? 650
                : 700,
          }}
        />
      )}
    </S.ScheduleSection>
  );
};

export default HomePage;
