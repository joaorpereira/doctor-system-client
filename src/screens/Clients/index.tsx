import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

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
import { Select } from "../../components/Select/styled";
import { Input, Label, Box } from "../../components/Input/styled";
import { CloseModalIcon } from "../../components/CloseModalIcon";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

import { RootState } from "../../store";
import { getClients, removeClient } from "../../store/ducks/clientsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import {
  DocumentProps,
  AddressProps,
  RowInfo,
  operationsTypes,
} from "../../utils/globalTypes";
import { formatCPForCNPJ, formatPhone } from "../../utils/helpers";

import useHandleUpdateOrShowClient from "./hooks/useHandleUpdateOrShowClient";
import useHandleShowPassword from "../../hooks/useHandleShowPassword";
import useOnSubmit from "./hooks/useOnSubmit";
import useHandleCpfOrCnpjMask from "../../hooks/useHandleCpfOrCnpjMask";
import useHandlePhoneMask from "../../hooks/useHandlePhoneMask";
import useHandleCepMask from "../../hooks/useHandleCepMask";
import useHandleDateMask from "../../hooks/useHandleDateMask";

export type ClientProps = {
  document: DocumentProps;
  address: AddressProps;
  name: string;
  email: string;
  password: string;
  picture: string;
  phone_number: string;
  gender: string;
  birth_date: string;
  _id?: string;
};

const genderOptions = [
  { value: "", label: "Sexo" },
  { value: "MASCULINO", label: "M" },
  { value: "FEMININO", label: "F" },
];
const documentOptions = [
  { value: "", label: null },
  { value: "cpf", label: "CPF" },
  { value: "cnpj", label: "CNPJ" },
];

const Clients: React.FC = (): ReactElement => {
  const ref = useRef<HTMLInputElement>();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm({});

  const [showProfile, setShowProfile] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    password2: false,
  });
  const [cpfValue, setCpfValue] = useState("");
  const [cepValue, setCepValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [dateValue, setDateValue] = useState("");

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { clients, client, type }: any = useAppSelector(
    ({ clientsReducers }: RootState) => clientsReducers
  );

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
  }: ClientProps = client;

  // functions
  const handleCloseModal = () => setShowProfile(!showProfile);
  const handleRemoveClient = (id: string) => dispatch(removeClient({ id }));
  const readOnlyAtShowAndUpdate = () => ["show", "update"].includes(type);

  // handle which type of sideModal should be displayed
  const showContent = (): boolean => type === "show";
  const showUpdate = (): boolean => type === "update";
  const showCreate = (): boolean => type === "create";

  // custom hooks - close modal when clicked outside
  useOnClickOutside({ ref, handler: () => setShowProfile(false) });

  // custom hooks - set client data to redux state
  const [handleUpdateOrShowClient] = useHandleUpdateOrShowClient({
    handleCloseModal,
    reset,
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
  const [onSubmit] = useOnSubmit({
    id: client._id,
    type,
  });

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
            color={colors.mediumBlue}
            onClick={() =>
              handleUpdateOrShowClient({
                type: operationsTypes.CREATE,
              })
            }
          >
            Adicionar
          </Button>
          <Button color={colors.yel}>Exportar CSV</Button>
        </S.ButtonContainer>
      </S.HeaderRow>
      {clients && clientColumns ? (
        <Table columns={clientColumns} data={clients} />
      ) : null}
      <Card ref={ref} showProfile={showProfile}>
        {client && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <CloseModalIcon handleCloseModal={handleCloseModal} />
            <S.CardHeader>
              <img
                src={picture ? picture : Avatar}
                alt={client ? name : "avatar"}
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
                      <Select
                        width="25%"
                        placeholder="Sexo"
                        {...register("gender")}
                      >
                        {genderOptions.map((item) => (
                          <option
                            key={item.value}
                            selected={item.value === gender}
                            value={item.value}
                          >
                            {item.label}
                          </option>
                        ))}
                      </Select>
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
                      maxLength={11}
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
                  type={showPassword.password ? "text" : "password"}
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
                  type={showPassword.password2 ? "text" : "password"}
                />
                <StyledMdRemoveRedEye
                  size={20}
                  onClick={() => handleShowPassword("password2")}
                />
              </Box>
            </S.Section>
            <CardTitle>Documento</CardTitle>
            <S.Section>
              <Box>
                <Label htmlFor="document.type">Tipo:</Label>
                <Select
                  width="150px"
                  {...register("document.type")}
                  defaultValue={document ? document?.type : ""}
                >
                  {documentOptions.map((item) => (
                    <option
                      key={item.value}
                      selected={item.value === document?.type}
                      value={item.value}
                    >
                      {item.label}
                    </option>
                  ))}
                </Select>
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
            <CardTitle>Endereço</CardTitle>
            <S.Section wrap marginBottom="40px">
              <Box>
                <Label htmlFor="address.cep">CEP:</Label>
                <Input
                  maxLength={9}
                  readOnly={showContent()}
                  {...register("address.cep")}
                  placeholder="99999-999"
                  onChange={(e) => handleCepMask(e)}
                  defaultValue={address?.cep ? address?.cep : cepValue}
                />
              </Box>
              <Box>
                <Label htmlFor="address.country">País:</Label>
                <Select
                  defaultValue={address?.country ? address?.country : ""}
                  {...register("address.country")}
                >
                  <option selected value="br">
                    Brasil
                  </option>
                </Select>
              </Box>
              <Box>
                <Label htmlFor="address.state">Estado:</Label>
                <Input
                  readOnly={showContent()}
                  width="140px"
                  defaultValue={address?.state ? address?.state : ""}
                  {...register("address.state")}
                />
              </Box>
              <Box>
                <Label htmlFor="address.city">Cidade:</Label>
                <Input
                  readOnly={showContent()}
                  width="250px"
                  defaultValue={address?.city ? address?.city : ""}
                  {...register("address.city")}
                />
              </Box>
              <Box>
                <Label htmlFor="address.number">Número:</Label>
                <Input
                  readOnly={showContent()}
                  width="90px"
                  defaultValue={address?.number}
                  {...register("address.number")}
                />
              </Box>
              <Box>
                <Label htmlFor="address.street">Rua:</Label>
                <Input
                  readOnly={showContent()}
                  defaultValue={address?.street ? address?.street : ""}
                  width="300px"
                  {...register("address.street")}
                />
              </Box>
            </S.Section>
            {!showContent() && (
              <Button color={colors.mediumBlue} width="100%" type="submit">
                {showCreate() ? "Criar Cliente" : "Atualizar Dados"}
              </Button>
            )}
          </form>
        )}
      </Card>
    </S.ClientsSection>
  );
};

export default Clients;
