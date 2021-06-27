import React, { ReactElement, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import * as S from "./styled";

import { Calendar } from "react-big-calendar";
import { addMinutes } from "date-fns";

import { localizer } from "../../utils/date";
import { useAppDispatch } from "../../hooks/hooks";
import { getSchedules } from "../../store/ducks/schedulesSlice";

export type IScheduleProps = {
  company_id: string;
  range: {
    start: string;
    end: string;
  };
};

const HomePage: React.FC = (): ReactElement => {
  const dispatch = useAppDispatch();

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

  const date = new Date();

  return (
    <S.ScheduleSection>
      <h1>Agendamentos</h1>
      <Calendar
        localizer={localizer}
        events={[
          {
            title: "Evento teste",
            start: date,
            end: addMinutes(date, 30),
          },
        ]}
        startAccessor="start"
        endAccessor="end"
        selectable
        style={{ height: 650 }}
      />
    </S.ScheduleSection>
  );
};

export default HomePage;
