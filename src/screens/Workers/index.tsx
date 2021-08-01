import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { format } from "date-fns";
import ReactSelect, { ValueType } from "react-select";
import { Controller, useForm } from "react-hook-form";

import * as S from "./styled";

import {
  colors,
  Active,
  Paragraph,
  reactSelectedStyle,
  SectionTitle,
} from "../../styles";
import { MdEdit, MdRemoveRedEye, MdDelete, MdShare } from "react-icons/md";
import Avatar from "../../assets/avatar.png";

import {
  CardTitle,
  StyledMdRemoveRedEye,
  Card,
  Table,
  Button,
  ButtonEdit,
  CloseModalIcon,
  Input,
  Label,
  Box,
  Spinner,
} from "../../components";

import {
  useAppDispatch,
  useAppSelector,
  useHandleShowPassword,
  useHandleCpfOrCnpjMask,
  useHandleDateMask,
  useHandlePhoneMask,
  useOnClickOutside,
} from "../../hooks";

import {
  getWorkers,
  removeWorker,
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
import {
  useHandleSelectedServicesValues,
  useOnSubmit,
  useHandleUpdateOrShowWorker,
} from "./hooks";

const Workers: React.FC = (): ReactElement => {
  const ref = useRef<HTMLInputElement>();
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

  const { workers, worker, type, loadingRequest, loadingData, success } =
    useAppSelector(({ workersReducers }) => workersReducers);

  const { servicesOptions } = useAppSelector(
    ({ servicesReducers }) => servicesReducers
  );

  const { user } = useAppSelector(({ authReducers }) => authReducers);

  const {
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
  const handleRemoveWorker = (id: string) => dispatch(removeWorker({ id }));
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

  // custom hooks - close modal when clicked outside
  useOnClickOutside({ ref, handler: () => setShowProfile(false) });

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
  const [onSubmit] = useOnSubmit({
    id: worker?._id,
    company_id: user && user.role === "COMPANY" && user._id,
    services: selectedServices,
    type,
    documentType,
    genderValue,
    accountType,
  });

  // custom hooks - set default values for worker services options
  useHandleSelectedServicesValues({
    servicesOptions,
    worker,
    setSelectedServices,
  });

  const workerColumns = useMemo(() => {
    return [
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
            <button>
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
              <MdDelete size={20} />
            </button>
          </S.ActionsRow>
        ),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.WorkersSection>
      <S.HeaderRow>
        <SectionTitle>Colaboradores</SectionTitle>
        <S.ButtonContainer>
          <Button
            color={colors.mediumBlue}
            onClick={() =>
              handleUpdateOrShowWorker({
                type: operationsTypes.CREATE,
              })
            }
          >
            Adicionar
          </Button>
          <Button color={colors.yel}>Exportar CSV</Button>
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
      <Card ref={ref} showProfile={showProfile}>
        {worker && servicesOptions && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <CloseModalIcon handleCloseModal={handleCloseModal} />
            <S.CardHeader>
              {!showContent() && <ButtonEdit size={24} />}
              <img
                src={picture ? picture : Avatar}
                alt={worker ? name : "avatar"}
              />
              {showContent() ? (
                <div>
                  <h4>{name}</h4>
                  <p>{email}</p>
                  <p>{phone_number}</p>
                  <p>{format(new Date(birth_date), "dd/MM/yyyy")}</p>
                </div>
              ) : (
                <S.Div column>
                  <S.Div gap="10px" bottom="10px">
                    <Input
                      readOnly={readOnlyAtShowAndUpdate()}
                      width={showCreate() ? "77%" : "100%"}
                      defaultValue={showUpdate() ? name : ""}
                      placeholder="Nome"
                      {...register("name")}
                    />
                    {showCreate() && (
                      <Box width="30%">
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
                              placeHolder=""
                              options={genderOptions}
                              onChange={(e) =>
                                handleGenderChange(e as OptionType)
                              }
                            />
                          )}
                        />
                      </Box>
                    )}
                  </S.Div>
                  <Input
                    width="100%"
                    defaultValue={showUpdate() ? email : ""}
                    placeholder="Email"
                    {...register("email")}
                  />
                  <S.Div gap="10px" top="10px">
                    <Input
                      width="51%"
                      maxLength={12}
                      placeholder="+55 99999-9999"
                      {...register("phone_number")}
                      onChange={(e) => handlePhoneMask(e)}
                      defaultValue={
                        showUpdate() ? formatPhone(phone_number) : phoneValue
                      }
                    />
                    <Input
                      width="49%"
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
                  </S.Div>
                </S.Div>
              )}
            </S.CardHeader>
            <CardTitle>Alterar Senha</CardTitle>
            <S.Section>
              <Box>
                <Label htmlFor="password">Nova Senha:</Label>
                <Input
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
              </Box>
              <Box>
                <Label htmlFor="newPassword">Repita a Senha:</Label>
                <Input
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
              </Box>
            </S.Section>
            <CardTitle>Documento</CardTitle>
            <S.Section>
              <Box width="100%">
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
                        (option: OptionType) => option.value === documentType
                      )}
                      options={documentOptions}
                      onChange={(e) => handleTypeChange(e as OptionType)}
                    />
                  )}
                />
              </Box>
              <Box>
                <Label htmlFor="document.number">Número:</Label>
                <Input
                  readOnly={readOnlyAtShowAndUpdate()}
                  width="240px"
                  value={
                    document?.number
                      ? formatCPForCNPJ(document?.number)
                      : cpfValue
                  }
                  {...register("document.number")}
                  onChange={(e) => handleCpfOrCnpjMask(e)}
                />
              </Box>
            </S.Section>
            <CardTitle>Serviços</CardTitle>
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
              </Box>
            </S.Section>
            <CardTitle>Conta Bancária</CardTitle>
            <S.Section wrap marginBottom="28px">
              <Box>
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
              </Box>
              <Box>
                <Label htmlFor="bank_account.acc_type">Tipo:</Label>
                <Box width="195px">
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
                </Box>
              </Box>
              <Box>
                <Label htmlFor="bank_account.acc_number">
                  Número da Conta:
                </Label>
                <Input
                  maxLength={11}
                  width="140px"
                  readOnly={readOnlyAtShowAndUpdate()}
                  defaultValue={
                    bank_account?.acc_number ? bank_account?.acc_number : ""
                  }
                  {...register("bank_account.acc_number")}
                />
              </Box>
              <Box>
                <Label htmlFor="bank_account.bank_code">Código do Banco:</Label>
                <Input
                  maxLength={3}
                  readOnly={readOnlyAtShowAndUpdate()}
                  width="110px"
                  defaultValue={
                    bank_account?.bank_code ? bank_account?.bank_code : ""
                  }
                  {...register("bank_account.bank_code")}
                />
              </Box>
              <Box>
                <Label htmlFor="bank_account.bank_agency">Agência:</Label>
                <Input
                  maxLength={4}
                  readOnly={readOnlyAtShowAndUpdate()}
                  width="80px"
                  defaultValue={bank_account?.bank_agency}
                  {...register("bank_account.bank_agency")}
                />
              </Box>
              <Box>
                <Label htmlFor="bank_account.verify_digit">Dígito:</Label>
                <Input
                  maxLength={1}
                  readOnly={readOnlyAtShowAndUpdate()}
                  defaultValue={
                    bank_account?.verify_digit ? bank_account?.verify_digit : ""
                  }
                  width="40px"
                  {...register("bank_account.verify_digit")}
                />
              </Box>
            </S.Section>
            {!showContent() && (
              <Button
                color={colors.mediumBlue}
                width="100%"
                type="submit"
                disabled={isSubmitting}
              >
                {loadingRequest && !success ? (
                  <Spinner
                    size="35px"
                    color="#fff"
                    style={{ position: "absolute", top: "65%", left: "50%" }}
                  />
                ) : showCreate() ? (
                  "Criar Colaborador"
                ) : (
                  "Atualizar Colaborador"
                )}
              </Button>
            )}
          </form>
        )}
      </Card>
    </S.WorkersSection>
  );
};

export default Workers;
