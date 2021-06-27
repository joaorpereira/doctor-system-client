import { ButtonHTMLAttributes } from "react";
import * as S from "./styled";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
  color?: string;
};

export const Button = ({
  children,
  color,
  isOutlined = false,
  ...rest
}: ButtonProps) => {
  console.log(color);
  return (
    <S.Button isOutlined={isOutlined} color={color} {...rest}>
      {children}
    </S.Button>
  );
};
