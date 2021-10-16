import { ButtonHTMLAttributes } from "react";
import * as S from "./styled";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
  color?: string;
  width?: string;
  margin?: string;
};

const Button = ({
  children,
  color,
  width,
  margin,
  isOutlined = false,
  ...rest
}: ButtonProps) => {
  return (
    <S.Button
      width={width}
      margin={margin}
      isOutlined={isOutlined}
      color={color}
      {...rest}
    >
      {children}
    </S.Button>
  );
};

export default Button;
