import React, { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import "react-big-calendar/lib/css/react-big-calendar.css";

import * as S from "./styled";

import {
  CompaniesSliceState,
  setCompany,
} from "../../store/ducks/companiesSlice";
import { getServices } from "../../store/ducks/servicesSlice";
import { useAppSelector, useGetLocation } from "../../hooks";
import ServicesHeader from "../../components/mobile/ServicesHeader";
import ServicesActions from "../../components/mobile/ServicesActions";
import { ServicesList } from "../../components";

const Home: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
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

  return (
    <S.ScheduleSection>
      <ServicesHeader company={company} distance={distance} />
      <ServicesActions />
      <ServicesList services={services} />
    </S.ScheduleSection>
  );
};

export default Home;
