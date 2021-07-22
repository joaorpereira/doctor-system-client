import React, { ReactElement, useEffect, useRef, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  CardTitle,
  Card,
  Button,
  CloseModalIcon,
  Input,
  Label,
  Box,
  TextArea,
  Spinner,
} from "../../components";
import { Controller, useForm } from "react-hook-form";
import ReactSelect, { OptionTypeBase } from "react-select";

import * as S from "./styled";
import { colors, reactSelectedStyle, SectionTitle } from "../../styles";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";

import { RootState } from "../../store";
import { getHoursByCompany } from "../../store/ducks/hoursSlice";
import { getServices } from "../../store/ducks/servicesSlice";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { useFormatHourData, useOnSubmit } from "./hooks";
import { ResponseHoursProps } from "./hooks/useFormatHourData";

import ptBR from "date-fns/locale/pt-BR";
import { actionsTypes } from "../../utils";

const locales = {
  "pt-BR": ptBR,
};

const weekDays = [
  new Date(2021, 3, 11, 0, 0, 0, 0),
  new Date(2021, 3, 12, 0, 0, 0, 0),
  new Date(2021, 3, 13, 0, 0, 0, 0),
  new Date(2021, 3, 14, 0, 0, 0, 0),
  new Date(2021, 3, 15, 0, 0, 0, 0),
  new Date(2021, 3, 16, 0, 0, 0, 0),
  new Date(2021, 3, 17, 0, 0, 0, 0),
];

const HomePage: React.FC = (): ReactElement => {
  const ref = useRef<HTMLInputElement>();
  const dispatch = useAppDispatch();
  const [hourData, setHourData] = useState<ResponseHoursProps[]>([]);
  const [showProfile, setShowProfile] = useState(false);

  const { user } = useAppSelector(
    ({ authReducers }: RootState) => authReducers
  );

  const { hours, type, loadingData, success } = useAppSelector(
    ({ hoursReducers }: RootState) => hoursReducers
  );

  const handleCloseModal = () => setShowProfile(!showProfile);
  const showContent = (): boolean => type === actionsTypes.SHOW;
  const showCreate = (): boolean => type === actionsTypes.CREATE;

  useEffect(() => {
    dispatch(getHoursByCompany({ id: user._id }));
    dispatch(getServices({ id: user._id }));
  }, [dispatch, user]);

  const [formatHourData] = useFormatHourData({ setHourData, weekDays });

  useEffect(() => {
    if (hours) formatHourData(hours);
  }, [hours, formatHourData]);

  const { register, handleSubmit, control } = useForm({});

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  // custom hooks - submit form to create or update service
  const [onSubmit] = useOnSubmit({});

  return (
    <S.HoursSection>
      <S.HeaderRow>
        <SectionTitle>Horários de Atendimento</SectionTitle>
      </S.HeaderRow>
      <Calendar
        localizer={localizer}
        views={["week"]}
        defaultView="week"
        toolbar={false}
        culture="ptBR"
        popup
        selectable
        formats={{
          dateFormat: "dd",
          dayFormat: (date, culture) =>
            localizer.format(date, "cccc", culture as string),
        }}
        defaultDate={weekDays[getDay(new Date())]}
        // onRangeChange={(range) => rangeFormat(range)}
        events={hourData}
        style={{ height: 650 }}
      />
      <Card ref={ref} showProfile={showProfile}>
        {hours && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <CloseModalIcon handleCloseModal={handleCloseModal} />
            <S.Section marginBottom="10px">
              <Box>
                <Label htmlFor="title">Título:</Label>
                <Input width="270px" {...register("title")} />
              </Box>
              <Box>
                <Label htmlFor="price">Preço (R$):</Label>
                <Input width="120px" {...register("price")} />
              </Box>
            </S.Section>
            <S.Section marginBottom="10px">
              <Box>
                <Label htmlFor="service_recurrence">Recorrência (dias):</Label>
                <Input
                  width="195px"
                  type="number"
                  {...register("service_recurrence")}
                />
              </Box>
              <Box width="195px">
                <Label htmlFor="service_duration">Duração</Label>
                <Controller
                  name="service_duration"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      {...field}
                      styles={{
                        control: (base) => ({
                          ...base,
                          ...reactSelectedStyle,
                        }),
                      }}
                      options={[]}
                    />
                  )}
                />
              </Box>
            </S.Section>
            <S.Section marginBottom="10px">
              <Box width="195px">
                <Label htmlFor="status">Status:</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      {...field}
                      styles={{
                        control: (base) => ({
                          ...base,
                          ...reactSelectedStyle,
                        }),
                      }}
                      options={[]}
                    />
                  )}
                />
              </Box>
              <Box width="195px">
                <Label htmlFor="company_id">Empresa:</Label>
                <Controller
                  name="company_id"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      {...field}
                      styles={{
                        control: (base) => ({
                          ...base,
                          ...reactSelectedStyle,
                        }),
                      }}
                    />
                  )}
                />
              </Box>
            </S.Section>
            <S.Section>
              <Box>
                <Label htmlFor="description">Descrição:</Label>
                <TextArea
                  width="400px"
                  height="140px"
                  {...register("description")}
                />
              </Box>
            </S.Section>
            <CardTitle marginBottom="5px">Imagens do Serviço</CardTitle>
            {!showContent() && (
              <Button
                style={{ marginTop: "15px" }}
                color={colors.mediumBlue}
                width="100%"
                type="submit"
              >
                {loadingData && !success ? (
                  <Spinner
                    size="35px"
                    color="#fff"
                    style={{ position: "absolute", top: "65%", left: "50%" }}
                  />
                ) : showCreate() ? (
                  "Criar Serviço"
                ) : (
                  "Atualizar Serviço"
                )}
              </Button>
            )}
          </form>
        )}
      </Card>
    </S.HoursSection>
  );
};

export default HomePage;
