import React, { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import "react-big-calendar/lib/css/react-big-calendar.css";

import * as S from "./styled";

import {
  CompaniesSliceState,
  setCompany,
} from "../../store/ducks/companiesSlice";
import { getServices } from "../../store/ducks/servicesSlice";
import { useAppSelector } from "../../hooks";
import ServicesHeader from "../../components/mobile/ServicesHeader";
import ServicesActions from "../../components/mobile/ServicesActions";
import { ServicesList } from "../../components";

const Home: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const companyId = "6158d038b4baee3d0d664b59";

  useEffect(() => {
    dispatch(
      setCompany({
        id: "6158d038b4baee3d0d664b59",
        lat: -19.9434929,
        lon: -43.9433717,
      })
    );
    dispatch(getServices({ id: companyId }));
  }, [dispatch]);

  const { company, distance }: CompaniesSliceState = useAppSelector(
    ({ companiesReducers }) => companiesReducers
  );

  const { services } = useAppSelector(
    ({ servicesReducers }) => servicesReducers
  );

  return (
    <S.ScheduleSection>
      <ServicesHeader company={company} distance={distance} />
      <ServicesActions />
      <ServicesList services={services} />
    </S.ScheduleSection>
  );
};

export default Home;
