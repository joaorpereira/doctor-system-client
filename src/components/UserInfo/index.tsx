import React, { memo } from "react";
import format from "date-fns/format";
import * as S from "./styled";

type Props = {
  name: string;
  email: string;
  phone_number: string;
  birth_date: string;
};

const UserInfo: React.FC<Props> = ({
  name,
  email,
  phone_number,
  birth_date,
}: Props) => {
  return (
    <S.Contaienr>
      <h4>{name}</h4>
      <p>E-mail: {email}</p>
      <p>Telefone: {phone_number} </p>
      <p>Data Nascimento: {format(new Date(birth_date), "dd/MM/yyyy")}</p>
    </S.Contaienr>
  );
};

export default memo(UserInfo);
