import React, { ReactElement } from "react";
import { Button } from "../../components/Button";
import { SectionTitle } from "../../styles/global";
import * as S from "./styled";

const Clients: React.FC = (): ReactElement => {
  return (
    <S.ClientSection>
      <S.HeaderRow>
        <SectionTitle>Clientes</SectionTitle>
        <Button>Adicionar</Button>
      </S.HeaderRow>
    </S.ClientSection>
  );
};

export default Clients;
