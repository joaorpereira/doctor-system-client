import { ButtonHTMLAttributes } from "react";
import * as S from "./styled";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export const Button = ({
  children,
  isOutlined = false,
  ...rest
}: ButtonProps) => (
  <S.Button isOutlined={isOutlined} {...rest}>
    {children}
  </S.Button>
);
