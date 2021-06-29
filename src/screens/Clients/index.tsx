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
  type,
} from "../../utils/globalTypes";

import useHandleUpdateOrShowClient from "./hooks/useHandleUpdateOrShowClient";
import useHandleShowPassword from "../../hooks/useHandleShowPassword";
import useOnSubmit from "./hooks/useOnSubmit";

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
  { value: "", label: null },
  { value: "MASCULINO", label: "M" },
  { value: "FEMININO", label: "F" },
];
const documentOptions = [
  { value: "", label: null },
  { value: "cpf", label: "CPF" },
  { value: "cnpj", label: "CNPJ" },
];

const Clients: React.FC = (): ReactElement => {
  const ref = useRef();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm({});

  const [showProfile, setShowProfile] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    password2: false,
  });

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { clients, client, isUpdate }: any = useAppSelector(
    ({ clientsReducers }: RootState) => clientsReducers
  );

  // functions
  const handleCloseModal = () => setShowProfile(!showProfile);
  const handleRemoveClient = (id: string) => dispatch(removeClient({ id }));
  const readOnlyAtShowAndUpdate = () => ["show", "update"].includes(isUpdate);

  // handle which type of sideModal should be displayed
  const showContent = (): boolean => isUpdate === "show";
  const showUpdate = (): boolean => isUpdate === "update";
  const showCreate = (): boolean => isUpdate === "create";

  //custom hooks
  useOnClickOutside({ ref, handler: () => setShowProfile(false) });

  const [handleUpdateOrShowClient] = useHandleUpdateOrShowClient({
    handleCloseModal,
    reset,
  });

  const [handleShowPassword] = useHandleShowPassword({
    setShowPassword,
    showPassword,
  });

  const [onSubmit] = useOnSubmit({
    client,
    showUpdate,
    isUpdate,
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
              color={row.original.status === "ATIVO" ? "#87b7ff" : "#2E2E2E70"}
            >
              {row.original.status.toLowerCase()}
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
                    type: type.UPDATE,
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
                    type: type.SHOW,
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
                type: type.CREATE,
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <CloseModalIcon handleCloseModal={handleCloseModal} />
          <S.CardHeader>
            <img
              src={client && client?.picture ? client?.picture : Avatar}
              alt={client?.name ? client?.name : "avatar"}
            />
            {showContent() ? (
              <div>
                <h4>{client?.name}</h4>
                <p>{client?.email}</p>
                <p>{client?.phone_number}</p>
                <p>{client?.birth_date}</p>
              </div>
            ) : (
              <S.Div column>
                <S.Div gap="10px" bottom="10px">
                  <Input
                    width={showCreate() ? "77%" : "100%"}
                    defaultValue={showUpdate() ? client?.name : ""}
                    placeholder="Nome"
                    {...register("name")}
                  />
                  {showCreate() && (
                    <Select
                      width="23%"
                      placeholder="Sexo"
                      {...register("gender")}
                    >
                      {genderOptions.map((item) => (
                        <option
                          key={item.value}
                          selected={item.value === client?.gender}
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
                  defaultValue={showUpdate() ? client?.email : ""}
                  placeholder="Email"
                  {...register("email")}
                />
                <S.Div gap="10px" top="10px">
                  <Input
                    width="50%"
                    defaultValue={showUpdate() ? client?.phone_number : ""}
                    placeholder="Telefone"
                    {...register("phone_number")}
                  />
                  <Input
                    width="50%"
                    defaultValue={showUpdate() ? client?.birth_date : ""}
                    readOnly={showUpdate()}
                    placeholder="Data Nascimento"
                    {...register("birth_date")}
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
                defaultValue={client?.password}
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
                type={showPassword.password2 ? "text" : "password"}
                {...register("password2")}
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
                defaultValue={
                  client?.document?.type ? client?.document?.type : ""
                }
                {...register("document.type")}
              >
                {documentOptions.map((item) => (
                  <option
                    key={item.value}
                    selected={item.value === client?.document?.type}
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
                defaultValue={
                  client?.document?.number ? client?.document?.number : ""
                }
                {...register("document.number")}
              />
            </Box>
          </S.Section>
          <CardTitle>Endereço</CardTitle>
          <S.Section wrap marginBottom="40px">
            <Box>
              <Label htmlFor="address.cep">CEP:</Label>
              <Input
                readOnly={showContent()}
                defaultValue={client?.address?.cep ? client?.address?.cep : ""}
                {...register("address.cep")}
              />
            </Box>
            <Box>
              <Label htmlFor="address.country">País:</Label>
              <Select
                defaultValue={
                  client?.address?.country ? client?.address?.country : ""
                }
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
                defaultValue={
                  client?.address?.state ? client?.address?.state : ""
                }
                {...register("address.state")}
              />
            </Box>
            <Box>
              <Label htmlFor="address.city">Cidade:</Label>
              <Input
                readOnly={showContent()}
                width="250px"
                defaultValue={
                  client?.address?.city ? client?.address?.city : ""
                }
                {...register("address.city")}
              />
            </Box>
            <Box>
              <Label htmlFor="address.number">Número:</Label>
              <Input
                readOnly={showContent()}
                width="90px"
                defaultValue={client?.address?.number}
                {...register("address.number")}
              />
            </Box>
            <Box>
              <Label htmlFor="address.street">Rua:</Label>
              <Input
                readOnly={showContent()}
                defaultValue={
                  client?.address?.street ? client?.address?.street : ""
                }
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
      </Card>
    </S.ClientsSection>
  );
};

export default Clients;
