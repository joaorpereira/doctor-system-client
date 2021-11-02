import React from "react";
import * as S from "./styled";
import { Company } from "../../../store/ducks/companiesSlice";

type Props = {
  company: Company;
};

const LocationCard: React.FC<Props> = ({ company }) => {
  return (
    <S.Card>
      <S.Paragraph style={{ lineHeight: "35px" }}>
        <strong>Endereço</strong>
      </S.Paragraph>
      <p>
        {company.address.street} - {company.address.number}
      </p>
      <p>
        {company.address.city} - {company.address.state}
      </p>
      <S.Paragraph marginTop="10px">
        <strong>CEP: </strong>
      </S.Paragraph>
      <p>{company.address.cep}</p>
    </S.Card>
  );
};

export default LocationCard;
