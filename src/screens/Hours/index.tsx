import React, { ReactElement } from "react";
import { Button } from "../../components/Button";
import { SectionTitle } from "../../styles/global";
import * as S from "./styled";

const Hours: React.FC = (): ReactElement => {
  return (
    <S.HoursSection>
      <S.HeaderRow>
        <SectionTitle>Horários</SectionTitle>
        <Button>Adicionar</Button>
      </S.HeaderRow>
    </S.HoursSection>
  );
};

export default Hours;
