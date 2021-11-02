import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "react-big-calendar/lib/css/react-big-calendar.css";
import * as S from "./styled";

import {
  CompaniesSliceState,
  setCompany,
} from "../../store/ducks/companiesSlice";
import { getServices } from "../../store/ducks/servicesSlice";
import { useAppSelector, useGetLocation } from "../../hooks";
import {
  ServicesList,
  ServicesActions,
  ServicesHeader,
  CallCard,
  LocationCard,
} from "../../components";

const Home: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const [action, setAction] = useState("Services");

  const { company, distance }: CompaniesSliceState = useAppSelector(
    ({ companiesReducers }) => companiesReducers
  );

  const { services } = useAppSelector(
    ({ servicesReducers }) => servicesReducers
  );

  const { user } = useAppSelector(({ authReducers }) => authReducers);

  const companyId = user.role === "COMPANY" ? user._id : user.company_id;

  const { lat, lon } = useGetLocation();

  useEffect(() => {
    if (lat && lon) {
      dispatch(
        setCompany({
          id: companyId,
          lat,
          lon,
        })
      );
    }
    dispatch(getServices({ id: companyId }));
  }, [dispatch, companyId, lon, lat]);

  const handleActions = useCallback(
    (str: string) => {
      if (str === action) {
        setAction("Services");
      } else {
        setAction(str);
      }
    },
    [action]
  );

  return (
    <S.ScheduleSection>
      <ServicesHeader company={company} distance={distance} />
      <ServicesActions handleActions={handleActions} action={action} />
      {action === "Services" && <ServicesList services={services} />}
      {action === "Ligar" && <CallCard company={company} />}
      {action === "Visitar" && <LocationCard company={company} />}
    </S.ScheduleSection>
  );
};

export default Home;
