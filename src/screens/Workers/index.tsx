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

import * as S from "./styled";
import { colors } from "../../styles/variables";
import { Active, Paragraph, SectionTitle } from "../../styles/global";
import { MdEdit, MdRemoveRedEye, MdDelete, MdShare } from "react-icons/md";
import Avatar from "../../assets/avatar.png";

import {
  CardTitle,
  StyledMdRemoveRedEye,
  Card,
} from "../../components/Card/styled";
import { Table } from "../../components/Table";
import { Button } from "../../components/Button";
import { ButtonEdit } from "../../components/ButtonEdit/styled";
import { CloseModalIcon } from "../../components/CloseModalIcon";
import { Input, Label, Box } from "../../components/Input/styled";

import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  getWorkers,
  removeWorker,
  Worker,
} from "../../store/ducks/workersSlice";

import {
  RowInfo,
  operationsTypes,
  genderOptions,
  documentOptions,
} from "../../utils/globalTypes";
import { formatCPForCNPJ, formatPhone } from "../../utils/helpers";

import useOnSubmit from "./hooks/useOnSubmit";
import useHandleDateMask from "../../hooks/useHandleDateMask";
import useHandlePhoneMask from "../../hooks/useHandlePhoneMask";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import useHandleShowPassword from "../../hooks/useHandleShowPassword";
import useHandleCpfOrCnpjMask from "../../hooks/useHandleCpfOrCnpjMask";
import useHandleUpdateOrShowWorker from "./hooks/useHandleUpdateOrShowWorker";

type InputProps = {
  label: string;
  value: string;
};

const Workers: React.FC = (): ReactElement => {
  const ref = useRef<HTMLInputElement>();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset, control } = useForm({});

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

  useEffect(() => {
    dispatch(getWorkers());
  }, [dispatch]);

  useEffect(() => {
    if (showProfile) {
      setCpfValue("");
      setCepValue("");
      setPhoneValue("");
      setDateValue("");
    }
  }, [showProfile]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { workers, worker, type }: any = useAppSelector(
    ({ workersReducers }: RootState) => workersReducers
  );

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
  }: Worker = worker;

  // functions
  const handleCloseModal = () => setShowProfile(!showProfile);
  const handleRemoveWorker = (id: string) => dispatch(removeWorker({ id }));
  const readOnlyAtShowAndUpdate = () => ["show", "update"].includes(type);

  // handle which type of sideModal should be displayed
  const showContent = (): boolean => type === "show";
  const showUpdate = (): boolean => type === "update";
  const showCreate = (): boolean => type === "create";

  // custom hooks - close modal when clicked outside
  useOnClickOutside({ ref, handler: () => setShowProfile(false) });

  // custom hooks - set worker data to redux state
  const [handleUpdateOrShowWorker] = useHandleUpdateOrShowWorker({
    handleCloseModal,
    reset,
    setDocumentType,
    setGenderValue,
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
    id: worker._id,
    type,
    setShowProfile,
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
          <p>{format(new Date(row.original.created_at), "dd/MM/yyy")}</p>
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

  useEffect(() => {
    if (document) {
      setDocumentType(document.type);
    } else if (gender) {
      setGenderValue(gender);
    }
  }, [document, gender]);

  const handleTypeChange = (e: InputProps) => setDocumentType(e.value);
  const handleGenderChange = (e: InputProps) => setGenderValue(e.value);

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
        <Table columns={workerColumns} data={workers} />
      ) : null}
      <Card ref={ref} showProfile={showProfile}>
        {worker && (
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
                                  border: `1px solid ${colors.primary}`,
                                  height: "35px !important",
                                  minHeight: "35px !important",
                                  boxShadow: "none",
                                  "&:hover": {
                                    border: `1px solid ${colors.primary} !important`,
                                  },
                                  fontSize: "0.8rem",
                                  fontFamily: "Lato !important",
                                  fontWeight: 500,
                                  color: `${colors.text}`,
                                }),
                              }}
                              value={genderOptions.filter(
                                (option: InputProps) =>
                                  option.value === genderValue
                              )}
                              placeHolder=""
                              options={genderOptions}
                              onChange={(e) =>
                                handleGenderChange(e as InputProps)
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
                      {...field}
                      styles={{
                        control: (base) => ({
                          ...base,
                          border: `1px solid ${colors.primary}`,
                          height: "35px !important",
                          minHeight: "35px !important",
                          boxShadow: "none",
                          "&:hover": {
                            border: `1px solid ${colors.primary} !important`,
                          },
                          fontSize: "0.8rem",
                          fontFamily: "Lato !important",
                          fontWeight: 500,
                          color: `${colors.text}`,
                        }),
                      }}
                      value={documentOptions.filter(
                        (option: InputProps) => option.value === documentType
                      )}
                      options={documentOptions}
                      onChange={(e) => handleTypeChange(e as InputProps)}
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
            <CardTitle>Conta Bancária</CardTitle>
            <S.Section wrap marginBottom="40px">
              <Box>
                <Label htmlFor="bank_account.acc_user_name">Titular:</Label>
                <Input
                  maxLength={9}
                  readOnly={showContent()}
                  {...register("bank_account.acc_user_name")}
                  defaultValue={
                    bank_account?.acc_user_name
                      ? bank_account?.acc_user_name
                      : cepValue
                  }
                />
              </Box>
              <Box>
                <Label htmlFor="bank_account.acc_number">Número:</Label>
                <Input
                  defaultValue={
                    bank_account?.acc_number ? bank_account?.acc_number : ""
                  }
                  {...register("bank_account.acc_number")}
                />
              </Box>
              <Box>
                <Label htmlFor="bank_account.acc_type">Tipo:</Label>
                <Input
                  readOnly={showContent()}
                  width="140px"
                  defaultValue={
                    bank_account?.acc_type ? bank_account?.acc_type : ""
                  }
                  {...register("bank_account.acc_type")}
                />
              </Box>
              <Box>
                <Label htmlFor="bank_account.bank_code">Código:</Label>
                <Input
                  readOnly={showContent()}
                  width="250px"
                  defaultValue={
                    bank_account?.bank_code ? bank_account?.bank_code : ""
                  }
                  {...register("bank_account.bank_code")}
                />
              </Box>
              <Box>
                <Label htmlFor="bank_account.bank_agency">Agência:</Label>
                <Input
                  readOnly={showContent()}
                  width="90px"
                  defaultValue={bank_account?.bank_agency}
                  {...register("bank_account.bank_agency")}
                />
              </Box>
              <Box>
                <Label htmlFor="bank_account.verify_digit">Dígito:</Label>
                <Input
                  readOnly={showContent()}
                  defaultValue={
                    bank_account?.verify_digit ? bank_account?.verify_digit : ""
                  }
                  width="300px"
                  {...register("bank_account.verify_digit")}
                />
              </Box>
            </S.Section>
            {!showContent() && (
              <Button color={colors.mediumBlue} width="100%" type="submit">
                {showCreate() ? "Criar Colaborador" : "Atualizar Dados"}
              </Button>
            )}
          </form>
        )}
      </Card>
    </S.WorkersSection>
  );
};

export default Workers;
