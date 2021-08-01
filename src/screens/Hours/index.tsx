import React, { ReactElement, useEffect, useRef, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addDays } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import {
  CardTitle,
  Card,
  Button,
  CloseModalIcon,
  Label,
  Box,
  Spinner,
} from "../../components";

import * as S from "./styled";
import { colors, reactSelectedStyle, SectionTitle } from "../../styles";

import { getHoursByCompany } from "../../store/ducks/hoursSlice";
import {
  getFilteredServices,
  getServices,
} from "../../store/ducks/servicesSlice";

import { useOnClickOutside, useAppDispatch, useAppSelector } from "../../hooks";
import {
  useFormatHourData,
  useOnSubmit,
  useHandleWorkersOptions,
  useHandleUpdateOrShowHour,
  useSetDefaultServicesOptions,
  useSetDefaultWorkersOptions,
  useSetDefaultEndTime,
  useSetDefaultStartTime,
  useSetDefaultDays,
} from "./hooks";
import { ResponseHoursProps } from "./hooks/useFormatHourData";

import {
  actionsTypes,
  operationsTypes,
  weekDaysOptions,
  calendarOptions,
  timeDayOptions,
} from "../../utils";

import { OptionType } from "../../utils/types";

import { getWorkersByCompany } from "../../store/ducks/workersSlice";

const locales = {
  "pt-BR": ptBR,
};

const startDayOfWeek = startOfWeek(new Date());

const weekDays = [
  startDayOfWeek,
  addDays(startDayOfWeek, 1),
  addDays(startDayOfWeek, 2),
  addDays(startDayOfWeek, 3),
  addDays(startDayOfWeek, 4),
  addDays(startDayOfWeek, 5),
  addDays(startDayOfWeek, 6),
];

const Hours: React.FC = (): ReactElement => {
  const ref = useRef<HTMLInputElement>();
  const dispatch = useAppDispatch();

  const [hourData, setHourData] = useState<ResponseHoursProps[]>([]);
  const [showProfile, setShowProfile] = useState(false);
  const [disponibleServices, setDisponibleServices] = useState<OptionType[]>(
    []
  );
  const [startTime, setStartDay] = useState<OptionType | null>(null);
  const [endTime, setEndDay] = useState<OptionType | null>(null);
  const [disponibleDays, setDisponibleDays] = useState<OptionType[]>([]);
  const [disponibleWorkers, setDisponibleWorkers] = useState<OptionType[]>([]);
  const [workersOptionsList, setWorkersOptionsList] = useState<OptionType[]>(
    []
  );

  const { user } = useAppSelector(({ authReducers }) => authReducers);

  const { hours, hour, type, loadingData, success } = useAppSelector(
    ({ hoursReducers }) => hoursReducers
  );

  const { servicesOptions } = useAppSelector(
    ({ servicesReducers }) => servicesReducers
  );

  const { workersOptions } = useAppSelector(
    ({ workersReducers }) => workersReducers
  );

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const handleCloseModal = () => setShowProfile(!showProfile);
  const showContent = (): boolean => type === actionsTypes.SHOW;
  const showCreate = (): boolean => type === actionsTypes.CREATE;
  const handleDisponibleServicesChange = (option: OptionType[]) =>
    setDisponibleServices(option);
  const handleStartDayChange = (option: OptionType) => setStartDay(option);
  const handleEndDayChange = (option: OptionType) => setEndDay(option);
  const handleDisponibleDaysChange = (option: OptionType[]) =>
    setDisponibleDays(option);
  const handleDisponibleWorkersChange = (option: OptionType[]) =>
    setDisponibleWorkers(option);

  const { handleSubmit, control } = useForm({});

  const resetForm = () => {
    setDisponibleDays([]);
    setDisponibleWorkers([]);
    setDisponibleServices([]);
    setStartDay(null);
    setEndDay(null);
  };

  useEffect(() => {
    dispatch(getHoursByCompany({ id: user._id }));
    dispatch(getServices({ id: user._id }));
    dispatch(getFilteredServices({ id: user._id }));
    dispatch(getWorkersByCompany({ id: user._id }));
  }, [dispatch, user]);

  // custom-hook
  const [formatHourData] = useFormatHourData({ setHourData, weekDays });

  // custom hooks - close modal when clicked outside
  useOnClickOutside({ ref, handler: () => setShowProfile(false) });

  // custom hooks - set service data to redux state
  const [handleUpdateOrShowHour] = useHandleUpdateOrShowHour({
    handleCloseModal,
    resetForm,
  });

  // custom hooks - submit form to create or update service
  const [onSubmit] = useOnSubmit({
    id: hour?._id,
    disponibleDays,
    company_id: user._id,
    disponibleWorkers,
    disponibleServices,
    startTime,
    endTime,
  });

  // custom hooks
  const [handleWorkersOptions] = useHandleWorkersOptions({
    setWorkersOptionsList,
    workersOptions,
  });

  useEffect(() => {
    if (hours) formatHourData(hours);
  }, [hours, formatHourData]);

  useEffect(() => {
    if (disponibleServices?.length > 0)
      handleWorkersOptions(disponibleServices);
  }, [workersOptions, disponibleServices, handleWorkersOptions]);

  useSetDefaultDays({
    hour,
    setDisponibleDays,
  });

  useSetDefaultStartTime({
    hour,
    setStartDay,
  });

  useSetDefaultEndTime({
    hour,
    setEndDay,
  });

  useSetDefaultServicesOptions({
    hour,
    servicesOptions,
    setDisponibleServices,
  });

  useSetDefaultWorkersOptions({
    hour,
    workersOptionsList,
    setDisponibleWorkers,
  });

  return (
    <S.HoursSection>
      <S.HeaderRow>
        <SectionTitle>Horários de Atendimento</SectionTitle>
        <Button
          color={colors.mediumBlue}
          onClick={() =>
            handleUpdateOrShowHour({
              type: operationsTypes.CREATE,
            })
          }
        >
          Adicionar
        </Button>
      </S.HeaderRow>
      <Calendar
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSelectEvent={(e: any) => {
          handleUpdateOrShowHour({
            hour: e.resource,
            type: operationsTypes.UPDATE,
          });
        }}
        localizer={localizer}
        views={["week"]}
        defaultView="week"
        messages={calendarOptions}
        culture="pt-BR"
        toolbar={false}
        popup
        selectable
        formats={{
          dateFormat: "dd",
          dayFormat: (date, culture) =>
            localizer.format(date, "cccc", culture as string),
        }}
        defaultDate={weekDays[getDay(new Date())]}
        events={hourData}
        style={{ height: 650 }}
      />
      <Card ref={ref} showProfile={showProfile}>
        {hours && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <CloseModalIcon handleCloseModal={handleCloseModal} />
            <CardTitle marginBottom="5px">Dia da Semana</CardTitle>
            <S.Section marginBottom="10px">
              <Box width="100%">
                <Controller
                  name="document.services"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      {...field}
                      isMulti
                      onChange={(option) =>
                        handleDisponibleDaysChange(option as OptionType[])
                      }
                      options={weekDaysOptions as unknown as OptionType[]}
                      value={disponibleDays}
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
            <CardTitle marginBottom="5px">Horário</CardTitle>
            <S.Section marginBottom="10px">
              <Box width="100%">
                <Label htmlFor="start">Inicial:</Label>
                <Controller
                  name="start"
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
                      value={startTime}
                      options={timeDayOptions}
                      onChange={(e) => handleStartDayChange(e as OptionType)}
                    />
                  )}
                />
              </Box>
              <Box width="100%">
                <Label htmlFor="end">Final:</Label>
                <Controller
                  name="end"
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
                      value={endTime}
                      options={timeDayOptions}
                      onChange={(e) => handleEndDayChange(e as OptionType)}
                    />
                  )}
                />
              </Box>
            </S.Section>
            <CardTitle marginBottom="5px">Especialidades Disponíveis</CardTitle>
            <S.Section marginBottom="10px">
              <Box width="100%">
                <Controller
                  name="document.services"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      {...field}
                      isMulti
                      isDisabled={showContent()}
                      onChange={(option) =>
                        handleDisponibleServicesChange(option as OptionType[])
                      }
                      value={disponibleServices}
                      options={servicesOptions}
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
            <CardTitle marginBottom="5px">Colaboradores Disponíveis</CardTitle>
            <S.Section>
              <Box width="100%">
                <Controller
                  name="document.services"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      {...field}
                      isMulti
                      isDisabled={showContent()}
                      onChange={(option) =>
                        handleDisponibleWorkersChange(option as OptionType[])
                      }
                      value={disponibleWorkers}
                      options={workersOptionsList.map(
                        ({ label, value }: OptionType) => ({
                          label,
                          value,
                        })
                      )}
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
                  "Criar Horário"
                ) : (
                  "Atualizar Horário"
                )}
              </Button>
            )}
          </form>
        )}
      </Card>
    </S.HoursSection>
  );
};

export default Hours;
