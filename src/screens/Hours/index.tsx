import React, { ReactElement, useEffect, useRef, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { Calendar, dateFnsLocalizer, stringOrDate } from "react-big-calendar";
import {
  format,
  parse,
  startOfWeek,
  getDay,
  addDays,
  subHours,
} from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import {
  CardTitle,
  Card,
  Button,
  CloseModalIcon,
  Label,
  Spinner,
} from "../../components";

import * as S from "./styled";
import {
  colors,
  reactSelectedStyle,
  SectionTitle,
  GlobalButtonContainer,
  Row,
  Column,
} from "../../styles";

import { getHoursByCompany } from "../../store/ducks/hoursSlice";
import {
  getFilteredServices,
  getServices,
} from "../../store/ducks/servicesSlice";

import { useOnClickOutside, useAppDispatch, useAppSelector } from "../../hooks";
import {
  useFormatHourData,
  useOnSubmit,
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
import useWindowSize, { Size } from "../../hooks/useWindowSize";

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

export interface Event {
  allDay?: boolean;
  title?: string;
  start?: Date;
  end?: Date;
  resource?: any;
}

export interface DateRange {
  start: Date;
  end: Date;
}

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

  const handleOnSelectTime = (slotInfo: {
    start: stringOrDate;
    end: stringOrDate;
  }) => {
    const { start, end } = slotInfo;
    handleUpdateOrShowHour({
      hour: {
        ...hour,
        days: [getDay(new Date(start))],
        start_time: subHours(new Date(start), 3).toISOString(),
        end_time: subHours(new Date(end), 3).toISOString(),
      },
      type: "SLOT",
    });
  };

  const handleOnSelectEvent = (e: Event) => {
    handleUpdateOrShowHour({
      hour: e.resource,
      type: operationsTypes.UPDATE,
    });
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
    type,
  });

  // custom hooks
  useEffect(() => {
    if (hours) formatHourData(hours);
  }, [hours, formatHourData]);

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
    workersOptions,
    setDisponibleWorkers,
  });

  const size: Size = useWindowSize();

  return (
    <S.HoursSection>
      <S.HeaderRow>
        <SectionTitle>Horários de Atendimento</SectionTitle>
        <Button
          width="150px"
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
        onSelectEvent={(e: Event) => handleOnSelectEvent(e)}
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
        onSelectSlot={(slotInfo) => handleOnSelectTime(slotInfo)}
        defaultDate={weekDays[getDay(new Date())]}
        events={hourData}
        style={{
          height:
            size.height < 650
              ? 400
              : size.height < 710
              ? 450
              : size.height < 770
              ? 500
              : size.height < 820
              ? 550
              : size.height < 870
              ? 600
              : size.height < 920
              ? 650
              : 700,
        }}
      />
      <Card ref={ref} showProfile={showProfile}>
        {hours && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <CloseModalIcon handleCloseModal={handleCloseModal} />
            <CardTitle margin="0px 0px 5px">Dia da Semana</CardTitle>
            <Row>
              <Column width="100%">
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
              </Column>
            </Row>
            <CardTitle margin="20px 0px 2px">Horário</CardTitle>
            <Row>
              <Column margin="rigth" width="100%">
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
              </Column>
              <Column margin="left" width="100%">
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
              </Column>
            </Row>
            <CardTitle margin="20px 0px 5px">
              Especialidades Disponíveis
            </CardTitle>
            <Row>
              <Column width="100%">
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
              </Column>
            </Row>
            <CardTitle margin="20px 0px 5px">
              Colaboradores Disponíveis
            </CardTitle>
            <Row>
              <Column width="100%">
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
                      options={workersOptions.map(
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
              </Column>
            </Row>
            <GlobalButtonContainer>
              {!showContent() && (
                <Button color={colors.mediumBlue} width="100%" type="submit">
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
            </GlobalButtonContainer>
          </form>
        )}
      </Card>
    </S.HoursSection>
  );
};

export default Hours;
