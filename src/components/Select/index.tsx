import React from "react";
import * as S from "./styled";

interface Props
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  width?: string;
  children?: React.ReactNode;
}

const Select: React.FC<Props> = ({ children, width }: Props) => {
  return <S.Select width={width}>{children}</S.Select>;
};

export default Select;
