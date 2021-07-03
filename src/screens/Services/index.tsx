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
import { colors } from "../../styles/variables";
import {
  Active,
  Paragraph,
  reactSelectedStyle,
  SectionTitle,
} from "../../styles/global";
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

import { RowInfo, operationsTypes } from "../../utils/globalTypes";

import useOnSubmit from "./hooks/useOnSubmit";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import useHandleUpdateOrShowService from "./hooks/useHandleUpdateOrShowService";
import {
  getFilteredServices,
  getServices,
  removeService,
} from "../../store/ducks/servicesSlice";

const Services: React.FC = (): ReactElement => {
  const ref = useRef<HTMLInputElement>();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm({});

  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    dispatch(getServices({ id: "60d4c7762318d1e795aa7f61" }));
    dispatch(getFilteredServices({ id: "60d4c7762318d1e795aa7f61" }));
  }, [dispatch]);

  const { services, service, type, servicesOptions }: any = useAppSelector(
    ({ servicesReducers }: RootState) => servicesReducers
  );

  const { service: serviceData, files }: any = service;

  // functions
  const handleCloseModal = () => setShowProfile(!showProfile);
  const handleRemoveService = (id: string) => dispatch(removeService({ id }));
  const readOnlyAtShowAndUpdate = () => ["show", "update"].includes(type);

  // handle which type of sideModal should be displayed
  const showContent = (): boolean => type === "show";
  const showUpdate = (): boolean => type === "update";
  const showCreate = (): boolean => type === "create";

  // custom hooks - close modal when clicked outside
  useOnClickOutside({ ref, handler: () => setShowProfile(false) });

  // custom hooks - set service data to redux state
  const [handleUpdateOrShowService] = useHandleUpdateOrShowService({
    handleCloseModal,
    reset,
  });

  // custom hooks - submit form to create or update service
  const [onSubmit] = useOnSubmit({
    id: serviceData?._id,
    company_id: "60b281d55398c39f2a93cd21",
    files: files,
    type,
    setShowProfile,
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
        <Table columns={serviceColumns} data={services} />
      ) : null}
      <Card ref={ref} showProfile={showProfile}>
        {/*  {service && services && (
          <form onSubmit={handleSubmit(onSubmit)}>
           <CloseModalIcon handleCloseModal={handleCloseModal} />
            <S.CardHeader>
              {!showContent() && <ButtonEdit size={24} />}
              <img
                src={picture ? picture : Avatar}
                alt={service ? name : "avatar"}
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
                {showCreate() ? "Criar Colaborador" : "Atualizar Dados"}
              </Button>
            )}
          </form>
        )} */}
      </Card>
    </S.ServicesSection>
  );
};

export default Services;
