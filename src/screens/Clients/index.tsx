import React, { ReactElement, useEffect, useState } from "react";

import { Button } from "../../components/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store";
import { getClients } from "../../store/ducks/clientsSlice";
import { Table } from "../../components/Table";
import { SectionTitle } from "../../styles/global";
import { clientColumns } from "./columns";
import * as S from "./styled";
import { colors } from "../../styles/variables";

const Clients: React.FC = (): ReactElement => {
  const dispatch = useAppDispatch();

  const { clients } = useAppSelector<any>(
    ({ clientsReducers }: RootState) => clientsReducers
  );

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

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
