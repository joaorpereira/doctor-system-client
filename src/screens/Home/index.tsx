import React, { ReactElement } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import * as S from "./styled";
// import { useAppDispatch } from "../../hooks/hooks";
// import { getCompanies } from "../../store/ducks/companiesSlice";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addMinutes } from "date-fns";
import pt from "date-fns/locale/pt-BR";

const locales = {
  "pt-BR": pt,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const HomePage: React.FC = (): ReactElement => {
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(getCompanies());
  // }, [dispatch]);

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
        style={{ height: 650 }}
      />
    </S.ScheduleSection>
  );
};

export default HomePage;
