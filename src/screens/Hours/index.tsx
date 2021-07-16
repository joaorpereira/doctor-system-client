import React, { ReactElement } from "react";
import { Button } from "../../components";
import { SectionTitle } from "../../styles";
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
