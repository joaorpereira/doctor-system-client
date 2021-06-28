import { ButtonHTMLAttributes } from "react";
import * as S from "./styled";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
  color?: string;
  width?: string;
};

export const Button = ({
  children,
  color,
  width,
  isOutlined = false,
  ...rest
}: ButtonProps) => {
  return (
    <S.Button width={width} isOutlined={isOutlined} color={color} {...rest}>
      {children}
    </S.Button>
  );
};
