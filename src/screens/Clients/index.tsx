import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";

import * as S from "./styled";
import { colors } from "../../styles/variables";
import { Paragraph, SectionTitle } from "../../styles/global";
import { MdEdit, MdRemoveRedEye, MdDelete, MdShare } from "react-icons/md";

import {
  CardTitle,
  StyledMdRemoveRedEye,
  Card,
} from "../../components/Card/styled";
import { Table } from "../../components/Table";
import { Button } from "../../components/Button";
import { Input, Label, Box } from "../../components/Input/styled";
import { CloseModalIcon } from "../../components/CloseModalIcon";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

import { RootState } from "../../store";
import {
  getClients,
  removeClient,
  setClientInfo,
  updateClient,
  createClient,
} from "../../store/ducks/clientsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import { format } from "date-fns";

import {
  DocumentProps,
  AddressProps,
  RowInfo,
  type,
} from "../../utils/globalTypes";

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
};

type UpdateShowClientProps = {
  client?: ClientProps;
  type: string;
};

const Clients: React.FC = (): ReactElement => {
  const dispatch = useAppDispatch();
  const ref = useRef();

  const [showProfile, setShowProfile] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    password2: false,
  });

  useOnClickOutside(ref, () => setShowProfile(false));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { clients, client, isUpdate }: any = useAppSelector(
    ({ clientsReducers }: RootState) => clientsReducers
  );

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  const handleCloseModal = () => {
    setShowProfile(!showProfile);
  };

  const handleShowPassword = (type: string) => {
    if (type === "password") {
      setShowPassword({ ...showPassword, password: !showPassword.password });
    } else if (type === "password2") {
      setShowPassword({ ...showPassword, password2: !showPassword.password2 });
    }
  };

  const { register, handleSubmit } = useForm({});

  const onSubmit = (data: ClientProps) => {
    const clientData = { ...client, ...data };
    if (isUpdate === "update") {
      dispatch(updateClient({ clientData, id: client._id }));
    } else if (isUpdate === "create") {
      dispatch(
        createClient({ clientData, company_id: "60b281d55398c39f2a93cd21" })
      );
    }
  };

  const handleRemoveClient = (id: string) => {
    dispatch(removeClient({ id }));
  };

  const handleUpdateOrShowClient = ({
    client,
    type,
  }: UpdateShowClientProps) => {
    handleCloseModal();
    dispatch(setClientInfo({ client, type }));
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
          <Paragraph>{row.original.status.toLowerCase()}</Paragraph>
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
            <img src={client?.picture} alt={client?.name} />
            {isUpdate === "show" ? (
              <div>
                <h4>Eunice Pereira</h4>
                <p>eunicepereira@email.com</p>
                <p>+51977776667</p>
                <p>1967-05-12</p>
              </div>
            ) : (
              <S.Div column>
                <S.Div gap="10px" bottom="10px">
                  <Input width="77%" placeholder="Nome" {...register("name")} />
                  {isUpdate === "create" && (
                    <Input
                      width="23%"
                      placeholder="Sexo"
                      {...register("gender")}
                    />
                  )}
                </S.Div>
                <Input
                  width="100%"
                  placeholder="Email"
                  {...register("email")}
                />
                <S.Div gap="10px" top="10px">
                  <Input
                    width="45%"
                    placeholder="Telefone"
                    {...register("phone_number")}
                  />
                  <Input
                    disabled={isUpdate === "update"}
                    width="55%"
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
                disabled={isUpdate === "show"}
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
                disabled={isUpdate === "show"}
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
              <Input
                disabled={["show", "update"].includes(isUpdate)}
                width="150px"
                defaultValue={client?.document?.type}
                {...register("document.type")}
              />
            </Box>
            <Box>
              <Label htmlFor="document.number">Número:</Label>
              <Input
                disabled={["show", "update"].includes(isUpdate)}
                width="240px"
                defaultValue={client?.document?.number}
                {...register("document.number")}
              />
            </Box>
          </S.Section>
          <CardTitle>Endereço</CardTitle>
          <S.Section wrap marginBottom="40px">
            <Box>
              <Label htmlFor="address.cep">CEP:</Label>
              <Input
                disabled={isUpdate === "show"}
                defaultValue={client?.address?.cep}
                {...register("address.cep")}
              />
            </Box>
            <Box>
              <Label htmlFor="address.country">País:</Label>
              <Input
                disabled={isUpdate === "show"}
                defaultValue={client?.address?.country}
                {...register("address.country")}
              />
            </Box>
            <Box>
              <Label htmlFor="address.state">Estado:</Label>
              <Input
                disabled={isUpdate === "show"}
                width="90px"
                defaultValue={client?.address?.state}
                {...register("address.state")}
              />
            </Box>
            <Box>
              <Label htmlFor="address.city">Cidade:</Label>
              <Input
                disabled={isUpdate === "show"}
                width="300px"
                defaultValue={client?.address?.city}
                {...register("address.city")}
              />
            </Box>
            <Box>
              <Label htmlFor="address.number">Número:</Label>
              <Input
                disabled={isUpdate === "show"}
                width="90px"
                defaultValue={client?.address?.number}
                {...register("address.number")}
              />
            </Box>
            <Box>
              <Label htmlFor="address.street">Rua:</Label>
              <Input
                disabled={isUpdate === "show"}
                defaultValue={client?.address?.street}
                width="300px"
                {...register("address.street")}
              />
            </Box>
          </S.Section>
          {isUpdate === "show" ? null : (
            <Button color={colors.mediumBlue} width="100%" type="submit">
              {isUpdate === "create" ? "Criar Cliente" : "Atualizar Dados"}
            </Button>
          )}
        </form>
      </Card>
    </S.ClientsSection>
  );
};

export default Clients;
