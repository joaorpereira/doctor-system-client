import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CSVLink } from "react-csv";
import { differenceInYears, format } from "date-fns";
import ReactSelect, { ValueType } from "react-select";
import { Controller, useForm } from "react-hook-form";

import * as S from "./styled";

import {
  colors,
  Active,
  Paragraph,
  reactSelectedStyle,
  SectionTitle,
  Box,
  Form,
  GlobalButtonContainer,
  Row,
  Column,
} from "../../styles";
import { MdEdit, MdRemoveRedEye, MdDelete, MdShare } from "react-icons/md";

import {
  CardTitle,
  StyledMdRemoveRedEye,
  Card,
  Table,
  Button,
  CloseModalIcon,
  Input,
  Label,
  Spinner,
  UserInfo,
  ImageFileUpload,
  ModalShare,
} from "../../components";

import {
  useAppDispatch,
  useAppSelector,
  useHandleShowPassword,
  useHandleCpfOrCnpjMask,
  useHandleDateMask,
  useHandlePhoneMask,
  useHandleModalShare,
  useUpdatePicture,
  useHandleSelectedServicesValues,
  useOnSubmitWorker,
  useHandleUpdateOrShowWorker,
} from "../../hooks";

import {
  getWorkers,
  removeWorker,
  updateWorkerProfilePicture,
  Worker,
} from "../../store/ducks/workersSlice";

import {
  operationsTypes,
  genderOptions,
  documentOptions,
  accountsTypesOptions,
  formatCPForCNPJ,
  formatPhone,
  actionsTypes,
} from "../../utils";
import { RowInfo, OptionType } from "../../utils/types";
import { getFilteredServices } from "../../store/ducks/servicesSlice";

import DownloadIcon from "../../assets/download.svg";
import PlusIcon from "../../assets/plus-square.svg";

const headers = [
  { label: "Nome", key: "name" },
  { label: "Email", key: "email" },
  { label: "Telefone", key: "phone_number" },
  { label: "Data Nascimento", key: "birth_date" },
  { label: "Status", key: "status" },
  { label: "Cidade", key: "address.city" },
  { label: "Estado", key: "address.state" },
  { label: "Endereço", key: "address.street" },
  { label: "Número", key: "address.number" },
];

const Workers: React.FC = (): ReactElement => {
  const dispatch = useAppDispatch();

  const [showProfile, setShowProfile] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    password2: false,
  });
  const [cpfValue, setCpfValue] = useState("");
  const [cepValue, setCepValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [genderValue, setGenderValue] = useState("");
  const [selectedServices, setSelectedServices] = useState<
    ValueType<OptionType, true>
  >([]);
  const [accountType, setAccountType] = useState("");
  const [showAccountData, setShowaccountData] = useState(false);
  const [image, setImage] = useState<Record<string, unknown> | null>(null);

  const { workers, worker, type, loadingRequest, loadingData, success } =
    useAppSelector(({ workersReducers }) => workersReducers);

  const { servicesOptions } = useAppSelector(
    ({ servicesReducers }) => servicesReducers
  );

  const { user } = useAppSelector(({ authReducers }) => authReducers);

  const {
    _id,
    document,
    bank_account,
    name,
    email,
    password,
    picture,
    phone_number,
    gender,
    birth_date,
  } = worker as Worker;

  useEffect(() => {
    dispatch(getWorkers());
    dispatch(getFilteredServices({ id: user._id }));
  }, [dispatch, user]);

  useEffect(() => {
    if (showProfile) {
      setCpfValue("");
      setCepValue("");
      setPhoneValue("");
      setDateValue("");
    }
  }, [showProfile]);

  useEffect(() => {
    if (success) setShowProfile(false);
  }, [success]);

  // set default values for documentType and genderValue
  useEffect(() => {
    if (document) setDocumentType(document.type);
  }, [document]);

  useEffect(() => {
    if (bank_account) setAccountType(bank_account.acc_type);
  }, [bank_account]);

  // set default values for genderValue
  useEffect(() => {
    if (gender) setGenderValue(gender);
  }, [gender]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm({});

  // functions
  const handleCloseModal = () => setShowProfile(!showProfile);
  const handleRemoveWorker = useCallback(
    (id: string) => dispatch(removeWorker({ id })),
    [dispatch]
  );
  const readOnlyAtShowAndUpdate = () =>
    [actionsTypes.SHOW, actionsTypes.UPDATE].includes(type);

  const handleTypeChange = (e: OptionType) => setDocumentType(e.value);
  const handleGenderChange = (e: OptionType) => setGenderValue(e.value);
  const handleServicesChange = (option: ValueType<OptionType, true>) => {
    setSelectedServices(option);
  };
  const handleAccountType = (e: OptionType) => setAccountType(e.value);

  // handle which type of sideModal should be displayed
  const showContent = (): boolean => type === actionsTypes.SHOW;
  const showUpdate = (): boolean => type === actionsTypes.UPDATE;
  const showCreate = (): boolean => type === actionsTypes.CREATE;

  // custom hooks - set worker data to redux state
  const [handleUpdateOrShowWorker] = useHandleUpdateOrShowWorker({
    handleCloseModal,
    reset,
    setDocumentType,
    setGenderValue,
    setAccountType,
  });

  // custom hooks - normalize input entry
  const [handleCpfOrCnpjMask] = useHandleCpfOrCnpjMask({ setCpfValue });
  const [handlePhoneMask] = useHandlePhoneMask({ setPhoneValue });
  const [handleDateMask] = useHandleDateMask({ setDateValue });

  // custom hooks - handle show or not password
  const [handleShowPassword] = useHandleShowPassword({
    setShowPassword,
    showPassword,
  });

  // custom hooks - submit form to create or update worker
  const [onSubmit] = useOnSubmitWorker({
    id: worker?._id,
    company_id: user && user.role === "COMPANY" && user._id,
    services: selectedServices,
    type,
    documentType,
    genderValue,
    accountType,
    image: picture,
    setImage,
  });

  // custom hooks - set default values for worker services options
  useHandleSelectedServicesValues({
    servicesOptions,
    worker,
    setSelectedServices,
  });

  const { handleShare, rowData, openShareModal, setOpenShareModal } =
    useHandleModalShare();

  // custom hooks - upload image
  const { handleUpdatePicture } = useUpdatePicture();

  useEffect(() => {
    if (type === actionsTypes.UPDATE && _id && image) {
      handleUpdatePicture({
        id: _id,
        role: "Workers",
        image,
        handleUpdate: updateWorkerProfilePicture,
      });
    }
  }, [type, image, handleUpdatePicture, _id]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleProfileImage = (file: any) => {
    setImage(file);
  };

  const workerColumns = useMemo(() => {
    return [
      {
        Header: "",
        accessor: "id",
        sortType: "basic",
        show: true,
        Cell: ({ row }: RowInfo) => <h4>{row.index + 1}</h4>,
      },
      {
        Header: "Nome",
        accessor: "name",
        sortType: "basic",
        show: true,
        Cell: ({ row }: RowInfo) => <h4>{row.original.name}</h4>,
      },
      {
        Header: "Email",
        accessor: "email",
        sortType: "basic",
        show: true,
      },
      {
        Header: "Telefone",
        accessor: "phone_number",
        sortType: "basic",
        show: true,
        Cell: ({ row }: RowInfo) => (
          <>
            {row?.original?.phone_number &&
              formatPhone(row.original.phone_number)}
          </>
        ),
      },
      {
        Header: "Sexo",
        accessor: "gender",
        sortType: "basic",
        show: true,
        Cell: ({ row }: RowInfo) => (
          <Paragraph>{row.original.gender.toLowerCase()}</Paragraph>
        ),
      },
      {
        Header: "Idade",
        accessor: "birth_date",
        sortType: "basic",
        show: true,
        Cell: ({ row }: RowInfo) => (
          <p>
            {differenceInYears(new Date(), new Date(row.original.birth_date))}{" "}
            anos
          </p>
        ),
      },
      {
        Header: "Data de Cadastro",
        accessor: "created_at",
        sortType: "basic",
        show: true,
        Cell: ({ row }: RowInfo) => (
          <p>{format(new Date(row.original.created_at), "dd/MM/yyyy")}</p>
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
            <button onClick={() => handleShare(row.original)}>
              <MdShare size={20} />
            </button>
            <button>
              <MdEdit
                size={20}
                onClick={() =>
                  handleUpdateOrShowWorker({
                    worker: row.original,
                    type: operationsTypes.UPDATE,
                  })
                }
              />
            </button>
            <button>
              <MdRemoveRedEye
                size={20}
                onClick={() => {
                  handleUpdateOrShowWorker({
                    worker: row.original,
                    type: operationsTypes.SHOW,
                  });
                }}
              />
            </button>
            <button onClick={() => handleRemoveWorker(row.original._id)}>
              <MdDelete size={20} color="#b53737" />
            </button>
          </S.ActionsRow>
        ),
      },
    ];
  }, [handleRemoveWorker, handleShare, handleUpdateOrShowWorker]);

  return (
    <S.WorkersSection>
      <S.HeaderRow>
        <SectionTitle>Colaboradores</SectionTitle>
        <S.ButtonContainer>
          <Button
            width="150px"
            color={colors.mediumBlue}
            onClick={() =>
              handleUpdateOrShowWorker({
                type: operationsTypes.CREATE,
              })
            }
          >
            <S.Icon src={PlusIcon} alt="Plus Icon" />
            Adicionar
          </Button>
          <CSVLink
            data={workers}
            headers={headers}
            filename={`colaboradores-${format(
              new Date(),
              "dd-MM-yyyy:HH:mm"
            )}.xlsx`}
            target="_blank"
          >
            <Button width="100px" color={colors.yel}>
              <S.Icon src={DownloadIcon} alt="Download Icon" />
              CSV
            </Button>
          </CSVLink>
          <Button width="100px" color={colors.blu} margin="0px 0px 0px 10px">
            <S.Icon src={DownloadIcon} alt="Download Icon" />
            PDF
          </Button>
        </S.ButtonContainer>
      </S.HeaderRow>
      {workers && workerColumns ? (
        <Table
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          columns={workerColumns as any}
          data={workers}
          loading={loadingData}
        />
      ) : null}
      <Card showProfile={showProfile} setShowProfile={setShowProfile}>
        {worker && servicesOptions && (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <CloseModalIcon handleCloseModal={handleCloseModal} />
            <S.CardHeader>
              <ImageFileUpload
                picture={picture}
                user={worker}
                userName={name}
                show={["update"].includes(type)}
                handleImage={handleProfileImage}
              />
              {showContent() ? (
                <UserInfo
                  name={name}
                  email={email}
                  phone_number={phone_number}
                  birth_date={birth_date}
                />
              ) : (
                <S.UserInfoWrapper>
                  <Row>
                    <Column margin="rigth" width="100%">
                      <Input
                        defaultValue={showUpdate() ? name : ""}
                        placeholder="Nome"
                        {...register("name")}
                      />
                    </Column>
                    {showCreate() && (
                      <Column margin="left" width="40%">
                        <Controller
                          name="gender"
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
                              value={genderOptions.filter(
                                (option: OptionType) =>
                                  option.value === genderValue
                              )}
                              options={genderOptions}
                              onChange={(e) =>
                                handleGenderChange(e as OptionType)
                              }
                            />
                          )}
                        />
                      </Column>
                    )}
                  </Row>
                  <Row>
                    <Input
                      width="100%"
                      defaultValue={showUpdate() ? email : ""}
                      placeholder="Email"
                      {...register("email")}
                    />
                  </Row>
                  <Row>
                    <Column margin="rigth">
                      <Input
                        autoComplete="off"
                        maxLength={12}
                        placeholder="+55 99999-9999"
                        {...register("phone_number")}
                        onChange={(e) => handlePhoneMask(e)}
                        defaultValue={
                          showUpdate() ? formatPhone(phone_number) : phoneValue
                        }
                      />
                    </Column>
                    <Column margin="left">
                      <Input
                        autoComplete="off"
                        maxLength={10}
                        readOnly={showUpdate()}
                        placeholder="Data Nascimento"
                        {...register("birth_date")}
                        onChange={(e) => handleDateMask(e)}
                        defaultValue={
                          showUpdate()
                            ? format(new Date(birth_date), "dd/MM/yyyy")
                            : dateValue
                        }
                      />
                    </Column>
                  </Row>
                </S.UserInfoWrapper>
              )}
            </S.CardHeader>
            {!showAccountData ? (
              <>
                <Box flexBasis="100%">
                  <CardTitle>Alterar Senha</CardTitle>
                </Box>
                <Row>
                  <Column margin="rigth">
                    <Label htmlFor="password">Nova Senha:</Label>
                    <Input
                      autoComplete="new-password"
                      readOnly={showContent()}
                      type={
                        showPassword.password && !showContent()
                          ? "text"
                          : "password"
                      }
                      defaultValue={password}
                      {...register("password")}
                    />
                    <StyledMdRemoveRedEye
                      size={20}
                      onClick={() => handleShowPassword("password")}
                    />
                  </Column>
                  <Column margin="left">
                    <Label htmlFor="newPassword">Repita a Senha:</Label>
                    <Input
                      autoComplete="new-password"
                      readOnly={showContent()}
                      {...register("password2")}
                      defaultValue={password ? password : ""}
                      type={
                        showPassword.password2 && !showContent()
                          ? "text"
                          : "password"
                      }
                    />
                    <StyledMdRemoveRedEye
                      size={20}
                      onClick={() => handleShowPassword("password2")}
                    />
                  </Column>
                </Row>
                <Box flexBasis="100%">
                  <CardTitle>Documento</CardTitle>
                </Box>
                <Row>
                  <Column margin="rigth" width="100%">
                    <Label htmlFor="document.type">Tipo:</Label>
                    <Controller
                      name="document.type"
                      control={control}
                      render={({ field }) => (
                        <ReactSelect
                          isDisabled={readOnlyAtShowAndUpdate()}
                          {...field}
                          styles={{
                            control: (base) => ({
                              ...base,
                              ...reactSelectedStyle,
                            }),
                          }}
                          value={documentOptions.filter(
                            (option: OptionType) =>
                              option.value === documentType
                          )}
                          options={documentOptions}
                          onChange={(e) => handleTypeChange(e as OptionType)}
                        />
                      )}
                    />
                  </Column>
                  <Column margin="left" width="100%">
                    <Label htmlFor="document.number">Número:</Label>
                    <Input
                      readOnly={readOnlyAtShowAndUpdate()}
                      value={
                        document?.number
                          ? formatCPForCNPJ(document?.number)
                          : cpfValue
                      }
                      {...register("document.number")}
                      onChange={(e) => handleCpfOrCnpjMask(e)}
                    />
                  </Column>
                </Row>
                <Box flexBasis="100%">
                  <CardTitle>Serviços</CardTitle>
                </Box>
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
                          value={selectedServices}
                          onChange={(option) => handleServicesChange(option)}
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
              </>
            ) : (
              <>
                <Box flexBasis="100%">
                  <CardTitle>Conta Bancária</CardTitle>
                </Box>
                <Row>
                  <Column width="100%">
                    <Label htmlFor="bank_account.acc_user_name">Titular:</Label>
                    <Input
                      readOnly={readOnlyAtShowAndUpdate()}
                      {...register("bank_account.acc_user_name")}
                      defaultValue={
                        bank_account?.acc_user_name
                          ? bank_account?.acc_user_name
                          : cepValue
                      }
                    />
                  </Column>
                </Row>
                <Row>
                  <Column margin="rigth" width="100%">
                    <Label htmlFor="bank_account.acc_type">Tipo:</Label>
                    <Controller
                      name="bank_account.acc_type"
                      control={control}
                      render={({ field }) => (
                        <ReactSelect
                          isDisabled={readOnlyAtShowAndUpdate()}
                          {...field}
                          styles={{
                            control: (base) => ({
                              ...base,
                              ...reactSelectedStyle,
                            }),
                          }}
                          value={accountsTypesOptions.filter(
                            (option: OptionType) => option.value === accountType
                          )}
                          placeHolder=""
                          options={accountsTypesOptions}
                          onChange={(e) => handleAccountType(e as OptionType)}
                        />
                      )}
                    />
                  </Column>
                  <Column margin="left" width="100%">
                    <Label htmlFor="bank_account.acc_number">
                      Número da Conta:
                    </Label>
                    <Input
                      maxLength={11}
                      readOnly={readOnlyAtShowAndUpdate()}
                      defaultValue={
                        bank_account?.acc_number ? bank_account?.acc_number : ""
                      }
                      {...register("bank_account.acc_number")}
                    />
                  </Column>
                </Row>
                <Row>
                  <Column margin="rigth">
                    <Label htmlFor="bank_account.bank_code">
                      Código do Banco:
                    </Label>
                    <Input
                      maxLength={3}
                      readOnly={readOnlyAtShowAndUpdate()}
                      defaultValue={
                        bank_account?.bank_code ? bank_account?.bank_code : ""
                      }
                      {...register("bank_account.bank_code")}
                    />
                  </Column>
                  <Column margin="left">
                    <Label htmlFor="bank_account.bank_agency">Agência:</Label>
                    <Input
                      maxLength={4}
                      readOnly={readOnlyAtShowAndUpdate()}
                      defaultValue={bank_account?.bank_agency}
                      {...register("bank_account.bank_agency")}
                    />
                  </Column>
                </Row>
                <Box flexBasis="15%">
                  <Label htmlFor="bank_account.verify_digit">Dígito:</Label>
                  <Input
                    maxLength={1}
                    readOnly={readOnlyAtShowAndUpdate()}
                    defaultValue={
                      bank_account?.verify_digit
                        ? bank_account?.verify_digit
                        : ""
                    }
                    {...register("bank_account.verify_digit")}
                  />
                </Box>
              </>
            )}
            <GlobalButtonContainer>
              {showAccountData && !showContent() && (
                <Row>
                  <Column margin="rigth" width="100%">
                    <Button
                      color={colors.gray}
                      onClick={() => setShowaccountData(false)}
                    >
                      Voltar
                    </Button>
                  </Column>
                  <Column margin="left" width="100%">
                    <Button
                      color={colors.mediumBlue}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {loadingRequest && !success ? (
                        <Spinner
                          size="35px"
                          color="#fff"
                          style={{
                            position: "absolute",
                            top: "65%",
                            left: "50%",
                          }}
                        />
                      ) : (
                        "Enviar"
                      )}
                    </Button>
                  </Column>
                </Row>
              )}
              {!showAccountData && (
                <Row>
                  <Button
                    color={colors.yel}
                    width="100%"
                    onClick={() => setShowaccountData(true)}
                  >
                    Pŕoximo
                  </Button>
                </Row>
              )}
            </GlobalButtonContainer>
          </Form>
        )}
      </Card>
      {openShareModal && (
        <ModalShare
          open={openShareModal}
          data={rowData}
          setOpenShareModal={setOpenShareModal}
          loading={false}
          onSubmit={() => console.log("aqui")}
        />
      )}
    </S.WorkersSection>
  );
};

export default Workers;
