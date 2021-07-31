import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
import ReactSelect from "react-select";

import * as S from "./styled";
import { colors, reactSelectedStyle, SectionTitle } from "../../styles";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addDays } from "date-fns";

import { RootState } from "../../store";
import { getHoursByCompany } from "../../store/ducks/hoursSlice";
import {
  getFilteredServices,
  getServices,
} from "../../store/ducks/servicesSlice";

import { useOnClickOutside, useAppDispatch, useAppSelector } from "../../hooks";
import {
  useFormatHourData,
  useHandleUpdateOrShowService,
  useOnSubmit,
} from "./hooks";
import { ResponseHoursProps } from "./hooks/useFormatHourData";

import ptBR from "date-fns/locale/pt-BR";
import {
  actionsTypes,
  operationsTypes,
  timeOptions,
  weekDaysOptions,
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
  const [disponibleWorkers, setDisponibleWorkers] = useState<OptionType[]>([]);
  const [disponibleDays, setDisponibleDays] = useState();
  const [startDays, setStartDay] = useState<OptionType>();
  const [endDays, setEndDay] = useState<OptionType>();
  const [workersOptionsList, setWorkersOptionsList] = useState<OptionType[]>(
    []
  );
  const { user } = useAppSelector(
    ({ authReducers }: RootState) => authReducers
  );

  const { hours, type, loadingData, success } = useAppSelector(
    ({ hoursReducers }: RootState) => hoursReducers
  );

  const { servicesOptions } = useAppSelector(
    ({ servicesReducers }: RootState) => servicesReducers
  );

  const { workersOptions } = useAppSelector(
    ({ workersReducers }: RootState) => workersReducers
  );

  const handleCloseModal = () => setShowProfile(!showProfile);
  const showContent = (): boolean => type === actionsTypes.SHOW;
  const showCreate = (): boolean => type === actionsTypes.CREATE;
  const handleDisponibleServicesChange = (option: OptionType[]) =>
    setDisponibleServices(option);
  const handleStartDayChange = (option: any) => setStartDay(option);
  const handleEndDayChange = (option: any) => setEndDay(option);
  const handleDisponibleDaysChange = (option: any) => setDisponibleDays(option);
  const handleDisponibleWorkersChange = (option: any) =>
    setDisponibleWorkers(option);

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
  const [handleUpdateOrShowService] = useHandleUpdateOrShowService({
    handleCloseModal,
  });

  // custom hooks - submit form to create or update service
  const [onSubmit] = useOnSubmit({});

  const handleWorkersOptions = useCallback(
    <T extends OptionType[]>(services: T) => {
      const servicesIdArray = services?.map((item: OptionType) => item.value);
      const list = workersOptions
        .filter((worker: any) =>
          worker.services.map((service: string) =>
            servicesIdArray?.includes(service)
          )
        )
        ?.map(({ label, value }: OptionType) => ({ label, value }));
      setWorkersOptionsList(list);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (hours) formatHourData(hours);
  }, [hours, formatHourData]);

  useEffect(() => {
    if (disponibleServices?.length > 0) {
      handleWorkersOptions(disponibleServices);
    }
  }, [workersOptions, disponibleServices, handleWorkersOptions]);

  const { register, handleSubmit, control } = useForm({});

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  return (
    <S.HoursSection>
      <S.HeaderRow>
        <SectionTitle>Horários de Atendimento</SectionTitle>
        <Button
          color={colors.mediumBlue}
          onClick={() =>
            handleUpdateOrShowService({
              type: operationsTypes.CREATE,
            })
          }
        >
          Adicionar
        </Button>
      </S.HeaderRow>
      <Calendar
        localizer={localizer}
        views={["week"]}
        defaultView="week"
        toolbar={false}
        culture="pt-BR"
        popup
        selectable
        formats={{
          dateFormat: "dd",
          dayFormat: (date, culture) =>
            localizer.format(date, "cccc", culture as string),
        }}
        defaultDate={weekDays[getDay(new Date())]}
        // onRangeChange={(range) => setDisponibleDays(range)}
        events={hourData}
        style={{ height: 650 }}
      />
      <Card ref={ref} showProfile={showProfile}>
        {hours && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <CloseModalIcon handleCloseModal={handleCloseModal} />
            <CardTitle marginBottom="5px">Dia:</CardTitle>
            <S.Section marginBottom="10px">
              <Box width="100%">
                <Label htmlFor="title">Dia(s) da Semana:</Label>
                <Controller
                  name="document.services"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      {...field}
                      isMulti
                      onChange={(option) => handleDisponibleDaysChange(option)}
                      options={weekDaysOptions}
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
            <CardTitle marginBottom="5px">Horário:</CardTitle>
            <S.Section marginBottom="10px">
              <Box width="100%">
                <Label htmlFor="start">Horario Inicial:</Label>
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
                      value={startDays}
                      options={timeOptions}
                      onChange={(e) => handleStartDayChange(e as OptionType)}
                    />
                  )}
                />
              </Box>
              <Box width="100%">
                <Label htmlFor="end">Horario Final:</Label>
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
                      value={endDays}
                      options={timeOptions}
                      onChange={(e) => handleEndDayChange(e as OptionType)}
                    />
                  )}
                />
              </Box>
            </S.Section>
            <CardTitle marginBottom="5px">
              Especialidades Disponíveis:
            </CardTitle>
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
            <CardTitle marginBottom="5px">Colaboradores Disponíveis:</CardTitle>
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
                        handleDisponibleWorkersChange(option)
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

export default Hours;
