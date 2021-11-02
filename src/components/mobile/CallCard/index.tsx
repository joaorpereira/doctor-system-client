import React from "react";
import * as S from "./styled";
import { Company } from "../../../store/ducks/companiesSlice";

type Props = {
  company: Company;
};
const CallCard: React.FC<Props> = ({ company }) => {
  return (
    <S.Card>
      <S.Paragraph>
        <strong>Telefone de Contato: </strong>
        {company.phone_number}
      </S.Paragraph>
    </S.Card>
  );
};

export default CallCard;
