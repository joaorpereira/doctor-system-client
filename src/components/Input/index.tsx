import React from "react";
import { Box } from "../../styles/global";
import * as S from "./styled";

type Props = {
  children: React.ReactNode;
  label?: string;
  name: string;
  width?: string;
  secondary?: boolean;
};

const InputComponent = ({ children, label, name, width, secondary }: Props) => {
  return (
    <Box width={width}>
      <S.Label secondary={secondary} htmlFor={name}>
        {label}
      </S.Label>
      {children}
    </Box>
  );
};

export default InputComponent;
