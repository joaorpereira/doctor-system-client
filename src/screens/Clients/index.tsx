import React, { ReactElement, useEffect, useMemo } from "react";

import * as S from "./styled";
import { colors } from "../../styles/variables";
import { SectionTitle } from "../../styles/global";
import { MdEdit, MdRemoveRedEye, MdDelete } from "react-icons/md";

import { Button } from "../../components/Button";
import { Table } from "../../components/Table";

import { RootState } from "../../store";
import { getClients } from "../../store/ducks/clientsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import { format } from "date-fns";

import { RowInfo } from "./types";

const Clients: React.FC = (): ReactElement => {
  const dispatch = useAppDispatch();

  const { clients } = useAppSelector<any>(
    ({ clientsReducers }: RootState) => clientsReducers
  );

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

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
          <p style={{ textTransform: "capitalize" }}>
            {row.original.gender.toLowerCase()}
          </p>
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
        Header: "Ações",
        accessor: "actions",
        sortType: "basic",
        show: true,
        Cell: () => (
          <S.ActionsRow>
            <span>
              <MdEdit size={25} />
            </span>

            <span>
              <MdRemoveRedEye size={25} />
            </span>
            <span>
              <MdDelete size={25} />
            </span>
          </S.ActionsRow>
        ),
      },
    ];
  }, []);

  return (
    <S.ClientSection>
      <S.HeaderRow>
        <SectionTitle>Clientes</SectionTitle>
        <S.ButtonContainer>
          <Button color={colors.mediumBlue}>Adicionar</Button>
          <Button color={colors.yel}>Exportar CSV</Button>
        </S.ButtonContainer>
      </S.HeaderRow>
      {clients && clientColumns ? (
        <Table columns={clientColumns} data={clients} />
      ) : null}
    </S.ClientSection>
  );
};

export default Clients;
