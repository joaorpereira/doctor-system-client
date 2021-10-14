import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { differenceInYears, format } from "date-fns";
import ReactSelect from "react-select";

import * as S from "./styled";
import {
  Active,
  Paragraph,
  reactSelectedStyle,
  SectionTitle,
  Box,
  colors,
  Form,
  GlobalButtonContainer,
  Row,
  Column,
} from "../../styles";

import { MdEdit, MdRemoveRedEye, MdDelete, MdShare } from "react-icons/md";
import {
  Table,
  Button,
  CloseModalIcon,
  CardTitle,
  StyledMdRemoveRedEye,
  Card,
  Select,
  Input,
  Label,
  Spinner,
  ImageFileUpload,
  UserInfo,
  ModalShare,
} from "../../components";

import {
  Client,
  getClients,
  removeClient,
  updateClientProfilePicture,
} from "../../store/ducks/clientsSlice";

import { RowInfo, OptionType } from "../../utils/types";
import {
  operationsTypes,
  genderOptions,
  documentOptions,
  formatCPForCNPJ,
  formatPhone,
  actionsTypes,
} from "../../utils";

import {
  useAppDispatch,
  useAppSelector,
  useHandleCepMask,
  useHandleDateMask,
  useHandlePhoneMask,
  useOnClickOutside,
  useHandleShowPassword,
  useHandleCpfOrCnpjMask,
  useHandleModalShare,
  useUpdatePicture,
  useOnSubmitClient,
  useHandleUpdateOrShowClient,
} from "../../hooks";

const Clients: React.FC = (): ReactElement => {
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
  const [image, setImage] = useState<Record<string, unknown> | null>(null);

  const { user } = useAppSelector(({ authReducers }) => authReducers);

  const { clients, client, type, loadingData, loadingRequest, success } =
    useAppSelector(({ clientsReducers }) => clientsReducers);

  const {
    document,
    address,
    name,
    email,
    password,
    picture,
    phone_number,
    gender,
    birth_date,
    _id,
  } = client as Client;

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

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
    if (document) {
      setDocumentType(document.type);
    } else if (gender) {
      setGenderValue(gender);
    }
  }, [document, gender]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm({});

  // functions
  const handleCloseModal = () => setShowProfile(!showProfile);
  const handleRemoveClient = (id: string) => dispatch(removeClient({ id }));
  const readOnlyAtShowAndUpdate = () =>
    [actionsTypes.SHOW, actionsTypes.UPDATE].includes(type);

  const handleTypeChange = (e: OptionType) => setDocumentType(e.value);
  const handleGenderChange = (e: OptionType) => setGenderValue(e.value);

  // handle which type of sideModal should be displayed
  const showContent = (): boolean => type === actionsTypes.SHOW;
  const showUpdate = (): boolean => type === actionsTypes.UPDATE;
  const showCreate = (): boolean => type === actionsTypes.CREATE;

  // custom hooks - close modal when clicked outside
  useOnClickOutside({ ref, handler: () => setShowProfile(false) });

  // custom hooks - set client data to redux state
  const [handleUpdateOrShowClient] = useHandleUpdateOrShowClient({
    handleCloseModal,
    reset,
    setDocumentType,
    setGenderValue,
  });

  // custom hooks - normalize input entry
  const [handleCpfOrCnpjMask] = useHandleCpfOrCnpjMask({ setCpfValue });
  const [handlePhoneMask] = useHandlePhoneMask({ setPhoneValue });
  const [handleCepMask] = useHandleCepMask({ setCepValue });
  const [handleDateMask] = useHandleDateMask({ setDateValue });

  // custom hooks - handle show or not password
  const [handleShowPassword] = useHandleShowPassword({
    setShowPassword,
    showPassword,
  });

  // custom hooks - submit form to create or update client
  const [onSubmit] = useOnSubmitClient({
    id: _id,
    type,
    documentType,
    genderValue,
    company_id: user && user.role === "COMPANY" && user._id,
    image: picture,
    setImage,
  });

  const { handleShare, rowData, openShareModal, setOpenShareModal } =
    useHandleModalShare();

  // custom hooks - upload image
  const { handleUpdatePicture } = useUpdatePicture();

  useEffect(() => {
    if (type === actionsTypes.UPDATE && _id && image) {
      handleUpdatePicture({
        id: _id,
        role: "Clients",
        image,
        handleUpdate: updateClientProfilePicture,
      });
    }
  }, [image, handleUpdatePicture, _id, type]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleProfileImage = (file: any) => {
    setImage(file);
  };

  const clientColumns = useMemo(() => {
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
            <button>
              <MdShare size={20} onClick={() => handleShare(row.original)} />
            </button>
            <button>
              <MdEdit
                size={20}
                onClick={() =>
                  handleUpdateOrShowClient({
                    client: row.original,
                    type: operationsTypes.UPDATE,
                  })
                }
              />
            </button>
            <button>
              <MdRemoveRedEye
                size={20}
                onClick={() => {
                  handleUpdateOrShowClient({
                    client: row.original,
                    type: operationsTypes.SHOW,
                  });
                }}
              />
            </button>
            <button onClick={() => handleRemoveClient(row.original._id)}>
              <MdDelete size={20} />
            </button>
          </S.ActionsRow>
        ),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.ClientsSection>
      <S.HeaderRow>
        <SectionTitle>Clientes</SectionTitle>
        <S.ButtonContainer>
          <Button
            width="150px"
            color={colors.mediumBlue}
            onClick={() =>
              handleUpdateOrShowClient({
                type: operationsTypes.CREATE,
              })
            }
          >
            Adicionar
          </Button>
          <Button width="150px" color={colors.yel}>
            Exportar CSV
          </Button>
        </S.ButtonContainer>
      </S.HeaderRow>
      {clients && clientColumns ? (
        <Table
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          columns={clientColumns as any}
          data={clients}
          loading={loadingData}
        />
      ) : null}
      <Card ref={ref} showProfile={showProfile}>
        {client && (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <CloseModalIcon handleCloseModal={handleCloseModal} />
            <S.CardHeader>
              <ImageFileUpload
                picture={picture}
                user={client}
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
            <Box flexBasis="100%">
              <CardTitle>Alterar Senha</CardTitle>
            </Box>
            <Row>
              <Column margin="rigth">
                <Label htmlFor="password">Nova Senha:</Label>
                <Input
                  readOnly={showContent()}
                  type={showPassword.password ? "text" : "password"}
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
                  readOnly={showContent()}
                  {...register("password2")}
                  defaultValue={password ? password : ""}
                  type={showPassword.password2 ? "text" : "password"}
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
                        (option: OptionType) => option.value === documentType
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
              <CardTitle>Endereço</CardTitle>
            </Box>
            <Row>
              <Column margin="rigth" width="100%">
                <Label htmlFor="address.country">País:</Label>
                <Select
                  defaultValue={address?.country ? address?.country : ""}
                  {...register("address.country")}
                >
                  <option selected value="br">
                    Brasil
                  </option>
                </Select>
              </Column>
              <Column margin="left" width="100%">
                <Label htmlFor="address.cep">CEP:</Label>
                <Input
                  maxLength={9}
                  readOnly={showContent()}
                  {...register("address.cep")}
                  placeholder="99999-999"
                  onChange={(e) => handleCepMask(e)}
                  defaultValue={address?.cep ? address?.cep : cepValue}
                />
              </Column>
            </Row>
            <Row>
              <Column margin="rigth">
                <Label htmlFor="address.state">Estado:</Label>
                <Input
                  readOnly={showContent()}
                  defaultValue={address?.state ? address?.state : ""}
                  {...register("address.state")}
                />
              </Column>
              <Column margin="left">
                <Label htmlFor="address.city">Cidade:</Label>
                <Input
                  readOnly={showContent()}
                  defaultValue={address?.city ? address?.city : ""}
                  {...register("address.city")}
                />
              </Column>
            </Row>
            <Row>
              <Column margin="rigth" width="100%">
                <Label htmlFor="address.street">Rua:</Label>
                <Input
                  readOnly={showContent()}
                  defaultValue={address?.street ? address?.street : ""}
                  {...register("address.street")}
                />
              </Column>
              <Column margin="left" width="20%">
                <Label htmlFor="address.number">Nº:</Label>
                <Input
                  readOnly={showContent()}
                  defaultValue={address?.number}
                  {...register("address.number")}
                />
              </Column>
            </Row>
            <GlobalButtonContainer>
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
    </S.ClientsSection>
  );
};

export default Clients;
