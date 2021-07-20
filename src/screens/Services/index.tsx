import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { format } from "date-fns";
import ReactSelect, { OptionTypeBase } from "react-select";
import { Controller, useForm } from "react-hook-form";
import { ImageListType } from "react-images-uploading";

import * as S from "./styled";
import { colors } from "../../styles";
import {
  Active,
  Paragraph,
  reactSelectedStyle,
  SectionTitle,
} from "../../styles/global";
import { MdEdit, MdRemoveRedEye, MdDelete, MdShare } from "react-icons/md";

import {
  CardTitle,
  Card,
  Table,
  Button,
  CloseModalIcon,
  Input,
  Label,
  Box,
  TextArea,
  ImageUpload,
  ImageItem,
  Spinner,
} from "../../components";

import { RootState } from "../../store";

import { RowInfo, OptionType } from "../../utils/types";
import {
  formatDurationHour,
  operationsTypes,
  timeOptions,
  statusOptions,
} from "../../utils";

import { useAppDispatch, useAppSelector, useOnClickOutside } from "../../hooks";
import { useOnSubmit, useHandleUpdateOrShowService } from "./hooks";
import {
  getFilteredServices,
  getServices,
  removeService,
  Service,
} from "../../store/ducks/servicesSlice";

import {
  CompaniesSliceState,
  getFilteredCompanies,
} from "../../store/ducks/companiesSlice";
import { AuthSliceState } from "../../store/ducks/authSlice";

const maxNumber = 6;

type ServiceReducerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  services: any;
  service: Service;
  type: string;
  loading: boolean;
  loadingFiltered: boolean;
  success: boolean;
  loadingData: boolean;
};

const Services: React.FC = (): ReactElement => {
  const ref = useRef<HTMLInputElement>();
  const dispatch = useAppDispatch();

  const {
    services,
    service,
    type,
    loading,
    loadingFiltered,
    success,
    loadingData,
  }: ServiceReducerProps = useAppSelector(
    ({ servicesReducers }: RootState) => servicesReducers
  );

  const { companiesOptions }: CompaniesSliceState = useAppSelector(
    ({ companiesReducers }: RootState) => companiesReducers
  );

  const { user }: AuthSliceState = useAppSelector(
    ({ authReducers }: RootState) => authReducers
  );

  const {
    service_recurrence,
    service_duration,
    price,
    title,
    description,
    status,
  } = service;

  const { register, handleSubmit, reset, control } = useForm({});

  const [showProfile, setShowProfile] = useState(false);
  const [images, setImages] = useState<never[]>([]);
  const [statusValue, setStatusValue] = useState("");
  const [companyValue, setCompanyValue] = useState("");
  const [durationValue, setDurationValue] = useState("");

  useEffect(() => {
    dispatch(getServices({ id: user._id }));
    dispatch(getFilteredServices({ id: user._id }));
    dispatch(getFilteredCompanies());
  }, [dispatch, user]);

  // set default values for statusValue
  useEffect(() => {
    if (status) setStatusValue(status);
  }, [status]);

  // set default values for durationValue
  useEffect(() => {
    if (service_duration)
      setDurationValue(new Date(service_duration).toISOString());
  }, [service_duration]);

  useEffect(() => {
    if (success) setShowProfile(false);
  }, [success]);

  // functions
  const handleCloseModal = () => setShowProfile(!showProfile);
  const handleRemoveService = (id: string) =>
    dispatch(removeService({ id, status: "INATIVO" }));
  const handleStatusChange = (e: OptionType) => setStatusValue(e.value);
  const handleCompanyChange = (e: OptionType) => setCompanyValue(e.value);
  const handleDurationChange = (e: OptionType) => setDurationValue(e.value);

  // handle which type of sideModal should be displayed
  const showContent = (): boolean => type === "show";
  const showUpdate = (): boolean => type === "update";
  const showCreate = (): boolean => type === "create";

  const handleImagesChange = (imageList: ImageListType) =>
    setImages(imageList as never[]);

  // custom hooks - close modal when clicked outside
  useOnClickOutside({
    ref,
    handler: () => setShowProfile(false),
  });

  // custom hooks - set service data to redux state
  const [handleUpdateOrShowService] = useHandleUpdateOrShowService({
    handleCloseModal,
    reset,
  });

  // custom hooks - submit form to create or update service
  const [onSubmit] = useOnSubmit({
    id: service?._id,
    type,
    statusValue,
    companyValue: user && user.role === "COMPANY" ? user._id : companyValue,
    durationValue,
    images,
  });

  const serviceColumns = useMemo(() => {
    return [
      {
        Header: "Titulo",
        accessor: "title",
        sortType: "basic",
        show: true,
        Cell: ({ row }: RowInfo) => <h4>{row.original.title}</h4>,
      },
      {
        Header: "Preço (R$)",
        accessor: "price",
        sortType: "basic",
        show: true,
      },
      {
        Header: "Recorrência (dias)",
        accessor: "service_recurrence",
        sortType: "basic",
        show: true,
      },
      {
        Header: "Duração",
        accessor: "service_duration",
        sortType: "basic",
        show: true,
        Cell: ({ row }: RowInfo) => {
          return (
            <p>
              {row.original.service_duration
                ? formatDurationHour(row.original.service_duration)
                : ""}
            </p>
          );
        },
      },
      {
        Header: "Data de Cadastro",
        accessor: "created_at",
        sortType: "basic",
        show: true,
        Cell: ({ row }: RowInfo) => (
          <p>
            {row.original.created_at
              ? format(new Date(row.original.created_at), "dd/MM/yyyy")
              : ""}
          </p>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        sortType: "basic",
        show: true,
        Cell: ({ row }: RowInfo) => (
          <Active color={row.original.status}>
            <Paragraph
              color={row.original?.status === "ATIVO" ? "#87b7ff" : "#2E2E2E70"}
            >
              {row.original?.status?.toLowerCase()}
            </Paragraph>
          </Active>
        ),
      },
      {
        Header: "Ações",
        accessor: "actions",
        sortType: "basic",
        show: true,
        Cell: ({ row }: RowInfo) => (
          <S.ActionsRow>
            <button>
              <MdShare size={20} />
            </button>
            <button>
              <MdEdit
                size={20}
                onClick={() =>
                  handleUpdateOrShowService({
                    service: row.original,
                    type: operationsTypes.UPDATE,
                  })
                }
              />
            </button>
            <button>
              <MdRemoveRedEye
                size={20}
                onClick={() => {
                  handleUpdateOrShowService({
                    service: row.original,
                    type: operationsTypes.SHOW,
                  });
                }}
              />
            </button>
            <button onClick={() => handleRemoveService(row.original._id)}>
              <MdDelete size={20} />
            </button>
          </S.ActionsRow>
        ),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.ServicesSection>
      <S.HeaderRow>
        <SectionTitle>Serviços</SectionTitle>
        <S.ButtonContainer>
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
          <Button color={colors.yel}>Exportar CSV</Button>
        </S.ButtonContainer>
      </S.HeaderRow>
      {services && serviceColumns ? (
        <Table
          columns={serviceColumns}
          data={services}
          loading={loading || loadingFiltered}
        />
      ) : null}
      <Card ref={ref} showProfile={showProfile}>
        {service && services && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <CloseModalIcon handleCloseModal={handleCloseModal} />
            <S.Section marginBottom="10px">
              <Box>
                <Label htmlFor="title">Título:</Label>
                <Input
                  width="270px"
                  defaultValue={title ? title : ""}
                  {...register("title")}
                />
              </Box>
              <Box>
                <Label htmlFor="price">Preço (R$):</Label>
                <Input
                  width="120px"
                  defaultValue={price ? price.toString() : ""}
                  {...register("price")}
                />
              </Box>
            </S.Section>
            <S.Section marginBottom="10px">
              <Box>
                <Label htmlFor="service_recurrence">Recorrência (dias):</Label>
                <Input
                  width="195px"
                  defaultValue={
                    service_recurrence ? Number(service_recurrence) : ""
                  }
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
                      value={timeOptions.filter(
                        (option: OptionType) => option.value === durationValue
                      )}
                      options={timeOptions}
                      onChange={(e) => handleDurationChange(e as OptionType)}
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
                      value={statusOptions.filter(
                        (option: OptionType) => option.value === statusValue
                      )}
                      options={statusOptions}
                      onChange={(e) => handleStatusChange(e as OptionType)}
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
                      value={
                        user.role === "COMPANY" &&
                        ({
                          value: user?._id,
                          label: user?.name,
                        } as OptionTypeBase)
                      }
                      options={companiesOptions}
                      onChange={(e) => handleCompanyChange(e as OptionType)}
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
                  defaultValue={description ? description : ""}
                  {...register("description")}
                />
              </Box>
            </S.Section>
            <CardTitle marginBottom="5px">Imagens do Serviço</CardTitle>
            <S.ImageFilesWrapper>
              {service && service?.files?.length > 0 ? (
                <ImageItem
                  showUpdate={showUpdate}
                  images={service?.files}
                  handleRemoveImage={() => {
                    return;
                  }}
                />
              ) : (
                type === "show" && (
                  <S.ParagraphNoneImage>
                    Nenhuma imagem disponível
                  </S.ParagraphNoneImage>
                )
              )}
              {type !== "show" && (
                <ImageUpload
                  onChange={handleImagesChange}
                  maxNumber={maxNumber}
                  images={images}
                />
              )}
            </S.ImageFilesWrapper>
            {!showContent() && (
              <Button
                style={{ marginTop: "20px" }}
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
                  "Criar Cliente"
                ) : (
                  "Atualizar Dados"
                )}
              </Button>
            )}
          </form>
        )}
      </Card>
    </S.ServicesSection>
  );
};

export default Services;
