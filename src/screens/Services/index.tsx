import React, { ReactElement } from "react";
import * as S from "./styled";
import { SectionTitle } from "../../styles/global";
import { Button } from "../../components/Button";

const Services: React.FC = (): ReactElement => {
  return (
    <S.ServicesSection>
      <S.HeaderRow>
        <SectionTitle>Serviços</SectionTitle>
        <Button>Adicionar</Button>
      </S.HeaderRow>
    </S.ServicesSection>
  );
};

export default Services;
