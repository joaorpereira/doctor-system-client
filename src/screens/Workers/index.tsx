import React, { ReactElement } from "react";
import { Button } from "../../components/Button";
import { SectionTitle } from "../../styles/global";
import * as S from "./styled";

const Workers: React.FC = (): ReactElement => {
  return (
    <S.WorkersSection>
      <S.HeaderRow>
        <SectionTitle>Colaboradores</SectionTitle>
        <Button>Adicionar</Button>
      </S.HeaderRow>
    </S.WorkersSection>
  );
};

export default Workers;
