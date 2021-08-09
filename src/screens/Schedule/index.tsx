import React, { ReactElement, useCallback, useEffect, useState } from "react";
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

import { useAppDispatch, useAppSelector } from "../../hooks";
import { useFormatScheduleData } from "./hooks";

import ptBR from "date-fns/locale/pt-BR";
import { SectionTitle } from "../../styles";
import { IRange, IScheduleProps } from "../../store/sagas/schedulesSaga";
import { calendarOptions } from "../../utils";

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

  const rangeFormat = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (range: any) => {
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

      const data: IScheduleProps = {
        company_id: user._id,
        range: {
          start: newRange.start,
          end: newRange.end,
        },
      };
      dispatch(getSchedules(data));
    },
    [dispatch, user]
  );

  useEffect(() => {
    const data: IScheduleProps = {
      company_id: user._id,
      range: {
        start: format(startOfMonth(new Date()), "yyyy-MM-dd"),
        end: format(endOfMonth(new Date()), "yyyy-MM-dd"),
      },
    };
    dispatch(getSchedules(data));
  }, [dispatch, user]);

  useEffect(() => {
    if (schedules) formatScheduleData(schedules);
  }, [schedules, formatScheduleData]);

  return (
    <S.ScheduleSection>
      <S.HeaderRow>
        <SectionTitle>Agendamentos</SectionTitle>
      </S.HeaderRow>
      {scheduleData && (
        <Calendar
          messages={calendarOptions}
          localizer={localizer}
          culture="pt-BR"
          onRangeChange={(range) => rangeFormat(range)}
          events={scheduleData}
          startAccessor="start"
          endAccessor="end"
          selectable
          style={{ height: 400 }}
        />
      )}
    </S.ScheduleSection>
  );
};

export default HomePage;
