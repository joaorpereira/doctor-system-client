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

import "date-fns/locale/pt-BR";
import { SectionTitle } from "../../styles/global";

const locales = {
  "pt-BR": require("date-fns/locale/pt-BR"),
};

type IRange = {
  start: string | Date;
  end: string | Date;
};

export type IScheduleProps = {
  company_id: string;
  range: IRange;
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
        company_id: "60b281095398c39f2a93cd20",
        range: {
          start: newRange.start,
          end: newRange.end,
        },
      };
      dispatch(getSchedules(data));
    },
    [dispatch]
  );

  useEffect(() => {
    const data: IScheduleProps = {
      company_id: "60b281095398c39f2a93cd20",
      range: {
        start: format(startOfMonth(new Date()), "yyyy-MM-dd"),
        end: format(endOfMonth(new Date()), "yyyy-MM-dd"),
      },
    };
    dispatch(getSchedules(data));
  }, [dispatch]);

  useEffect(() => {
    if (schedules) formatScheduleData(schedules);
  }, [schedules, formatScheduleData]);

  const messages = {
    allDay: "Dia Inteiro",
    previous: "<",
    next: ">",
    today: "Hoje",
    month: "Mês",
    week: "Semana",
    day: "Dia",
    agenda: "Agenda",
    date: "Data",
    time: "Hora",
    event: "Evento",
  };

  return (
    <S.ScheduleSection>
      <S.HeaderRow>
        <SectionTitle>Agendamentos</SectionTitle>
      </S.HeaderRow>
      {scheduleData && (
        <Calendar
          messages={messages}
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
