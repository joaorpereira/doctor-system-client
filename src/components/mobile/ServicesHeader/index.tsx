import React from "react";
import { Company } from "../../../store/ducks/companiesSlice";
import { BUCKET_URL } from "../../../utils";
import * as S from "./styled";

type Props = {
  company: Company;
  distance: number;
};

const ServicesHeader: React.FC<Props> = ({ company, distance }) => {
  return (
    <S.Wrapper>
      <S.ImageBackground>
        <S.Image
          loading="lazy"
          src={`${BUCKET_URL}${company.background}`}
          alt={company.name}
        />
      </S.ImageBackground>
      <S.ContentContainer>
        <S.Status>Aberto</S.Status>
        <S.Content>
          <h2>{company.name}</h2>
          <p>
            {company.address.city} - {distance}Kms
          </p>
        </S.Content>
      </S.ContentContainer>
    </S.Wrapper>
  );
};

export default ServicesHeader;
