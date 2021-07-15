import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { format } from "date-fns";
import ReactSelect from "react-select";
import { Controller, useForm } from "react-hook-form";
import { ImageListType } from "react-images-uploading";

import * as S from "./styled";
import { colors } from "../../styles/variables";
import {
  Active,
  Paragraph,
  reactSelectedStyle,
  SectionTitle,
} from "../../styles/global";
import { MdEdit, MdRemoveRedEye, MdDelete, MdShare } from "react-icons/md";

import { CardTitle, Card } from "../../components/Card/styled";
import { Table } from "../../components/Table";
import { Button } from "../../components/Button";
import { CloseModalIcon } from "../../components/CloseModalIcon";
import { Input, Label, Box } from "../../components/Input/styled";

import { RootState } from "../../store";
import { useAppDispatch, useAppSelector, useOnClickOutside } from "../../hooks";

import {
  RowInfo,
  operationsTypes,
  OptionType,
  timeOptions,
  statusOptions,
} from "../../utils/globalTypes";

import { useOnSubmit, useHandleUpdateOrShowService } from "./hooks";
import {
  getFilteredServices,
  getServices,
  removeService,
} from "../../store/ducks/servicesSlice";
import { Textarea } from "../../components/TextArea/styled";
import { ImageUpload } from "../../components/ImageUpload";
import { getFilteredCompanies } from "../../store/ducks/companiesSlice";
import { formatDurationHour } from "../../utils/helpers";
import { ImageItem } from "../../components/ImageItem";

const maxNumber = 6;

const Services: React.FC = (): ReactElement => {
  const ref = useRef<HTMLInputElement>();
  const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { services, service, type }: any = useAppSelector(
    ({ servicesReducers }: RootState) => servicesReducers
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { companiesOptions }: any = useAppSelector(
    ({ companiesReducers }: RootState) => companiesReducers
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
    dispatch(getServices({ id: "60d4c7762318d1e795aa7f61" }));
    dispatch(getFilteredServices({ id: "60d4c7762318d1e795aa7f61" }));
    dispatch(getFilteredCompanies());
  }, [dispatch]);

  // set default values for statusValue
  useEffect(() => {
    if (status) setStatusValue(status);
  }, [status]);

  // set default values for durationValue
  useEffect(() => {
    if (service_duration)
      setDurationValue(new Date(service_duration).toISOString());
  }, [service_duration]);

  // functions
  const handleCloseModal = () => setShowProfile(!showProfile);
  const handleRemoveService = (id: string) => dispatch(removeService({ id }));
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
    setShowProfile,
    statusValue,
    companyValue: "60d4c7762318d1e795aa7f61",
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

  // const imagesList = service?.map((item: any) => ({
  //   images: item.files.map((image: any) => ({
  //     folder: image.folder,
  //     reference_id: image.reference_id,
  //     id: image._id,
  //   })),
  // }));

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
        <Table columns={serviceColumns} data={services} />
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
                <Textarea
                  style={{ width: "400px", height: "140px" }}
                  defaultValue={description ? description : ""}
                  {...register("description")}
                />
              </Box>
            </S.Section>
            <CardTitle marginBottom="5px">Imagens do Serviço</CardTitle>
            <S.ImageFilesWrapper>
              {service ? (
                <ImageItem
                  images={service.files}
                  handleRemoveImage={() => {
                    return;
                  }}
                />
              ) : null}
              <ImageUpload
                onChange={handleImagesChange}
                maxNumber={maxNumber}
                images={images}
              />
            </S.ImageFilesWrapper>
            {!showContent() && (
              <Button
                style={{ marginTop: "20px" }}
                color={colors.mediumBlue}
                width="100%"
                type="submit"
              >
                {showCreate() ? "Criar Cliente" : "Atualizar Dados"}
              </Button>
            )}
          </form>
        )}
      </Card>
    </S.ServicesSection>
  );
};

export default Services;
