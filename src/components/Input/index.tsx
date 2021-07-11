import React from "react";
import * as S from "./styled";

type Props = {
  children: React.ReactNode;
  label: string;
  name: string;
  width?: string;
  secondary?: boolean;
};

const InputComponent = ({ children, label, name, width, secondary }: Props) => {
  return (
    <S.Box width={width}>
      <S.Label secondary={secondary} htmlFor={name}>
        {label}
      </S.Label>
      {children}
    </S.Box>
  );
};

export default InputComponent;
